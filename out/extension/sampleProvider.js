"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleKernel = exports.SampleKernelProvider = exports.SampleContentProvider = void 0;
const vscode = require("vscode");
const util_1 = require("util");
var todoItems = [];
/**
 * An ultra-minimal sample provider that lets the user type in JSON, and then
 * outputs JSON cells. Doesn't read files or save anything.
 */
class SampleContentProvider {
    constructor() {
        this.label = 'My Sample Content Provider';
    }
    resolveNotebook() {
        return Promise.resolve();
    }
    async backupNotebook(document, context, _cancellation) {
        await this._save(document, context.destination);
        return {
            id: context.destination.toString(),
            delete: () => vscode.workspace.fs.delete(context.destination)
        };
    }
    async openNotebook(uri, context) {
        let actualUri = context.backupId ? vscode.Uri.parse(context.backupId) : uri;
        let contents = '';
        try {
            contents = new util_1.TextDecoder().decode(await vscode.workspace.fs.readFile(actualUri));
        }
        catch {
        }
        let raw = { items: [], cells: [] };
        try {
            raw = JSON.parse(contents);
        }
        catch {
            raw = { items: [], cells: [] };
        }
        if (raw.cells === undefined) {
            raw.cells = [];
        }
        if (raw.items === undefined) {
            raw.items = [];
        }
        const cells = raw.cells.map(item => {
            var _a;
            return new vscode.NotebookCellData(item.kind, item.value, item.language, item.outputs ? [new vscode.NotebookCellOutput(item.outputs.map(raw => new vscode.NotebookCellOutputItem(raw.mime, raw.value)))] : [], new vscode.NotebookCellMetadata().with({ editable: (_a = item.editable) !== null && _a !== void 0 ? _a : true }));
        });
        todoItems = raw.items;
        return new vscode.NotebookData(cells, new vscode.NotebookDocumentMetadata().with({ cellHasExecutionOrder: true, }));
    }
    async saveNotebook(document, _cancellation) {
        return this._save(document, document.uri);
    }
    async saveNotebookAs(targetResource, document, _cancellation) {
        return this._save(document, targetResource);
    }
    async _save(document, targetResource) {
        function asRawOutput(cell) {
            let result = [];
            for (let output of cell.outputs) {
                for (let item of output.outputs) {
                    result.push({ mime: item.mime, value: item.value });
                }
            }
            return result;
        }
        let contents = { items: [], cells: [] };
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
exports.SampleContentProvider = SampleContentProvider;
class SampleKernelProvider {
    constructor() {
        this.label = 'My Sample Kernel Provider';
    }
    provideKernels() {
        return [new SampleKernel()];
    }
    resolveKernel() {
        return Promise.resolve(); // not implemented
    }
}
exports.SampleKernelProvider = SampleKernelProvider;
class SampleKernel {
    constructor() {
        this.id = 'sample-kernel';
        this.label = 'Sample Notebook Kernel';
        this.supportedLanguages = ['todo-book'];
        this._executionOrder = 0;
    }
    async executeCellsRequest(document, ranges) {
        for (let range of ranges) {
            for (let i = range.start; i < range.end; i++) {
                let cell = document.cells[i];
                const execution = vscode.notebook.createNotebookCellExecutionTask(cell.notebook.uri, cell.index, this.id);
                await this._doExecution(execution);
            }
        }
    }
    async _doExecution(execution) {
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
        }
        catch (e) {
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
    async _processCell(text) {
        const tokens = text.split(' ');
        if (tokens.length > 2) {
            throw new Error('');
        }
        switch (tokens[0]) {
            case 'ADD':
                todoItems.push(tokens[1]);
                break;
            case 'DELETE':
                const index = parseInt(tokens[1]);
                if (index === NaN) {
                    throw new Error('');
                }
                todoItems.splice(index - 1, 1);
                break;
            case 'LIST':
                if (tokens.length > 1) {
                    throw new Error('');
                }
                break;
            default:
                throw new Error('');
        }
    }
}
exports.SampleKernel = SampleKernel;
//# sourceMappingURL=sampleProvider.js.map