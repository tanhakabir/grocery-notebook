"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroceryListNotebookContentSerializer = void 0;
const vscode = require("vscode");
const util_1 = require("util");
class GroceryListNotebookContentSerializer {
    // contents from file to VS Code Notebook data
    async dataToNotebook(data) {
        var contents = new util_1.TextDecoder().decode(data); // convert to String to make JSON object
        // Read file contents
        let raw;
        try {
            raw = JSON.parse(contents);
        }
        catch {
            raw = { cells: [] };
        }
        if (raw.cells === undefined) {
            raw.cells = [];
        }
        // Create array of Notebook cells for the VS Code API from file contents
        const cells = raw.cells.map(item => new vscode.NotebookCellData(item.kind, item.value, item.language, item.outputs ? [new vscode.NotebookCellOutput(item.outputs.map(raw => new vscode.NotebookCellOutputItem(raw.mime, raw.value)))] : [], new vscode.NotebookCellMetadata()));
        // Pass read and formatted Notebook Data to VS Code to display Notebook with saved cells
        return new vscode.NotebookData(cells, new vscode.NotebookDocumentMetadata().with({ cellHasExecutionOrder: true, }));
    }
    // VS Code Notebook data to a string to save to the Notebook file
    async notebookToData(data) {
        // function to take output renderer data to a format to save to the file
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
        // Map the Notebook data into the format we want to save the Notebook data as
        let contents = { cells: [] };
        for (const cell of data.cells) {
            contents.cells.push({
                kind: cell.kind,
                language: cell.language,
                value: cell.source,
                outputs: asRawOutput(cell)
            });
        }
        // Give a string of all the data to save and VS Code will handle the rest 
        return new util_1.TextEncoder().encode(JSON.stringify(contents));
    }
}
exports.GroceryListNotebookContentSerializer = GroceryListNotebookContentSerializer;
//# sourceMappingURL=notebookContentSerializer.js.map