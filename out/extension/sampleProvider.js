"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleKernel = exports.SampleKernelProvider = exports.SampleContentSerializer = void 0;
const vscode = require("vscode");
const util_1 = require("util");
class SampleContentSerializer {
    constructor() {
        this.label = 'My Sample Content Serializer';
    }
    /**
     * @inheritdoc
     */
    async dataToNotebook(data) {
        var contents = new util_1.TextDecoder().decode(data);
        let raw = { cells: [] };
        try {
            raw = JSON.parse(contents);
        }
        catch {
            raw = { cells: [] };
        }
        if (raw.cells === undefined) {
            raw.cells = [];
        }
        const cells = raw.cells.map(item => {
            var _a;
            return new vscode.NotebookCellData(item.kind, item.value, item.language, item.outputs ? [new vscode.NotebookCellOutput(item.outputs.map(raw => new vscode.NotebookCellOutputItem(raw.mime, raw.value)))] : [], new vscode.NotebookCellMetadata().with({ editable: (_a = item.editable) !== null && _a !== void 0 ? _a : true }));
        });
        return new vscode.NotebookData(cells, new vscode.NotebookDocumentMetadata().with({ cellHasExecutionOrder: true, }));
    }
    /**
     * @inheritdoc
     */
    async notebookToData(data) {
        var _a;
        function asRawOutput(cell) {
            var _a;
            let result = [];
            for (let output of (_a = cell.outputs) !== null && _a !== void 0 ? _a : []) {
                for (let item of output.outputs) {
                    result.push({ mime: item.mime, value: item.value });
                }
            }
            return result;
        }
        let contents = { cells: [] };
        for (const cell of data.cells) {
            contents.cells.push({
                kind: cell.kind,
                language: cell.language,
                value: cell.source,
                editable: (_a = cell.metadata) === null || _a === void 0 ? void 0 : _a.editable,
                outputs: asRawOutput(cell)
            });
        }
        return new util_1.TextEncoder().encode(JSON.stringify(contents));
    }
}
exports.SampleContentSerializer = SampleContentSerializer;
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
            execution.replaceOutput([new vscode.NotebookCellOutput([
                    new vscode.NotebookCellOutputItem('application/json', JSON.parse(doc.getText())),
                ], metadata)]);
            execution.end({ success: true });
        }
        catch (err) {
            execution.replaceOutput([new vscode.NotebookCellOutput([
                    new vscode.NotebookCellOutputItem('application/x.notebook.error-traceback', {
                        ename: err instanceof Error && err.name || 'error',
                        evalue: err instanceof Error && err.message || JSON.stringify(err, undefined, 4),
                        traceback: []
                    })
                ])]);
            execution.end({ success: false });
        }
    }
}
exports.SampleKernel = SampleKernel;
//# sourceMappingURL=sampleProvider.js.map