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
        this.id = 'sample-kernel';
        this.label = 'Sample Notebook Kernel';
        this.supportedLanguages = ['json'];
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
        execution.start({ startTime: Date.now() });
        const metadata = {
            startTime: Date.now()
        };
        try {
            execution.replaceOutput([new vscode.NotebookCellOutput([
                    new vscode.NotebookCellOutputItem('x-application/notebook-demo-todo-list', JSON.parse(doc.getText())),
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
}
exports.SampleKernel = SampleKernel;
//# sourceMappingURL=sampleProvider.js.map