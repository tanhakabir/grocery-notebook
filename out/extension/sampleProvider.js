"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleKernel = exports.SampleKernelProvider = exports.SampleContentProvider = void 0;
const vscode = require("vscode");
/**
 * An ultra-minimal sample provider that lets the user type in JSON, and then
 * outputs JSON cells. Doesn't read files or save anything.
 */
class SampleContentProvider {
    constructor() {
        this.label = 'My Sample Content Provider';
    }
    /**
     * @inheritdoc
     */
    resolveNotebook() {
        return Promise.resolve();
    }
    /**
     * @inheritdoc
     */
    async backupNotebook() {
        return { id: '', delete: () => undefined };
    }
    /**
     * @inheritdoc
     */
    async openNotebook() {
        return {
            metadata: new vscode.NotebookDocumentMetadata().with({
                editable: true,
                cellEditable: true,
            }),
            cells: [new vscode.NotebookCellData(vscode.NotebookCellKind.Code, `{ "hello": "world!" }`, 'json', [])]
        };
    }
    /**
     * @inheritdoc
     */
    async saveNotebook() {
        return Promise.resolve(); // not implemented
    }
    /**
     * @inheritdoc
     */
    async saveNotebookAs() {
        return Promise.resolve(); // not implemented
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
        this.label = 'Sample Notebook Kernel';
        this.supportedLanguages = ['json'];
    }
    executeCellsRequest(document, ranges) {
        throw new Error('Method not implemented.');
    }
    cancelCellExecution() { }
    cancelAllCellsExecution() { }
    executeAllCells(doc) {
        doc.cells.forEach((cell) => this.executeCell(doc, cell));
    }
    executeCell(_doc, cell) {
        const edit = new vscode.WorkspaceEdit();
        try {
            const output = [new vscode.NotebookCellOutput([
                    new vscode.NotebookCellOutputItem('x-application/notebook-demo-todo-list', JSON.parse(cell.document.getText()))
                ])];
            edit.replaceNotebookCellOutput(cell.notebook.uri, cell.index, output);
        }
        catch (e) {
            const errorOutput = [new vscode.NotebookCellOutput([
                    new vscode.NotebookCellOutputItem('application/x.notebook.error-traceback', {
                        ename: e instanceof Error && e.name || 'error',
                        evalue: e instanceof Error && e.message || JSON.stringify(e, undefined, 4),
                        traceback: []
                    })
                ])];
            edit.replaceNotebookCellOutput(cell.notebook.uri, cell.index, errorOutput);
        }
        return vscode.workspace.applyEdit(edit);
    }
}
exports.SampleKernel = SampleKernel;
//# sourceMappingURL=sampleProvider.js.map