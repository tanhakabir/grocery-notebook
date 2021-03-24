import * as vscode from 'vscode';
import { TextDecoder } from "util";

interface RawNotebookData {
  items: string[],
  cells: RawNotebookCell[]
}

interface RawNotebookCell {
  language: string;
  value: string;
  kind: vscode.NotebookCellKind;
  editable?: boolean;
  outputs: RawCellOutput[];
}

interface RawCellOutput {
  mime: string;
  value: any;
}

var todoItems: string[] = [];

/**
 * An ultra-minimal sample provider that lets the user type in JSON, and then
 * outputs JSON cells. Doesn't read files or save anything.
 */
export class SampleContentProvider implements vscode.NotebookContentProvider {
  public readonly label: string = 'My Sample Content Provider';

  public resolveNotebook() {
    return Promise.resolve();
  }

  public async backupNotebook(document: vscode.NotebookDocument, context: vscode.NotebookDocumentBackupContext, _cancellation: vscode.CancellationToken): Promise<vscode.NotebookDocumentBackup> {
    await this._save(document, context.destination);
    return {
      id: context.destination.toString(),
      delete: () => vscode.workspace.fs.delete(context.destination)
    };
  }

  public async openNotebook(uri: vscode.Uri, context: vscode.NotebookDocumentOpenContext): Promise<vscode.NotebookData> {
    let actualUri = context.backupId ? vscode.Uri.parse(context.backupId) : uri;
    let contents = '';
    try {
      contents = new TextDecoder().decode(await vscode.workspace.fs.readFile(actualUri));
    } catch {
    }

    let raw: RawNotebookData = { items: [], cells: [] };
    try {
      raw = <RawNotebookData>JSON.parse(contents);
    } catch {
      raw = {items: [], cells: []};
    }

    if(raw.cells === undefined) {raw.cells = [];}
    if(raw.items === undefined) {raw.items = [];}

    const cells = raw.cells.map(item => new vscode.NotebookCellData(
      item.kind,
      item.value,
      item.language,
      item.outputs ? [new vscode.NotebookCellOutput(item.outputs.map(raw => new vscode.NotebookCellOutputItem(raw.mime, raw.value)))] : [],
      new vscode.NotebookCellMetadata().with({ editable: item.editable ?? true })
    ));

    todoItems = raw.items;

    return new vscode.NotebookData(
      cells,
      new vscode.NotebookDocumentMetadata().with({ cellHasExecutionOrder: true, })
    );
  }

  public async saveNotebook(document: vscode.NotebookDocument, _cancellation: vscode.CancellationToken): Promise<void> {
    return this._save(document, document.uri);
  }

  public async saveNotebookAs(targetResource: vscode.Uri, document: vscode.NotebookDocument, _cancellation: vscode.CancellationToken): Promise<void> {
    return this._save(document, targetResource);
  }

  async _save(document: vscode.NotebookDocument, targetResource: vscode.Uri): Promise<void> {
    function asRawOutput(cell: vscode.NotebookCell): RawCellOutput[] {
      let result: RawCellOutput[] = [];
      for (let output of cell.outputs) {
        for (let item of output.outputs) {
          result.push({ mime: item.mime, value: item.value });
        }
      }
      return result;
    }

    let contents: RawNotebookData = {items: [], cells: []};

    for (const cell of document.cells) {
      contents.cells.push({
        kind: cell.kind,
        language: cell.document.languageId,
        value: cell.document.getText(),
        editable: cell.metadata.editable,
        outputs: asRawOutput(cell)
      });
    }

    contents.items = todoItems;

    await vscode.workspace.fs.writeFile(targetResource, Buffer.from(JSON.stringify(contents, undefined, 2)));
  }
}

export class SampleKernelProvider implements vscode.NotebookKernelProvider {
  public readonly label = 'My Sample Kernel Provider';

  provideKernels(): vscode.ProviderResult<vscode.NotebookKernel[]> {
    return [new SampleKernel()];
  }

  resolveKernel(): vscode.ProviderResult<void> {
    return Promise.resolve(); // not implemented
  }
}

export class SampleKernel implements vscode.NotebookKernel {
  readonly id = 'sample-kernel';
  public readonly label = 'Sample Notebook Kernel';
  readonly supportedLanguages = ['json'];

  private _executionOrder = 0;

  async executeCellsRequest(document: vscode.NotebookDocument, ranges: vscode.NotebookCellRange[]): Promise<void> {

    for (let range of ranges) {
      for (let i = range.start; i < range.end; i++) {
        let cell = document.cells[i];
        const execution = vscode.notebook.createNotebookCellExecutionTask(cell.notebook.uri, cell.index, this.id)!;
        await this._doExecution(execution);
      }
    }
  }

  private async _doExecution(execution: vscode.NotebookCellExecutionTask): Promise<void> {
    const doc = await vscode.workspace.openTextDocument(execution.cell.document.uri);

    execution.executionOrder = ++this._executionOrder;
    execution.start({ startTime: Date.now() });

    const metadata = {
      startTime: Date.now()
    };

    try {
      this._processCell(doc.getText());

      execution.replaceOutput([new vscode.NotebookCellOutput([
        new vscode.NotebookCellOutputItem('x-application/notebook-demo-todo-list', todoItems),
      ], metadata)]);

      execution.end({ success: true });
    } catch (e) {
      execution.replaceOutput([new vscode.NotebookCellOutput([
        new vscode.NotebookCellOutputItem('application/x.notebook.error-traceback', {
          ename: e instanceof Error && e.name || 'error',
          evalue: e instanceof Error && e.message || JSON.stringify(e, undefined, 4),
          traceback: []
        })
      ])]);
      execution.end({ success: false });
    }
  }

  private async _processCell(text: string) {
    const tokens = text.split(' ');

    if(tokens.length > 2) {
      throw new Error('');
    }

    switch (tokens[0]) {
      case 'ADD':
        todoItems.push(tokens[1]);
        break;
      case 'DELETE':
        const index = parseInt(tokens[1]);
        if(index === NaN) { throw new Error(''); }
        todoItems.splice(index - 1, 1);
        break;
      case 'LIST':
        if(tokens.length > 1) { throw new Error(''); }
        break;
      default:
        throw new Error('');
    }
  }
}
