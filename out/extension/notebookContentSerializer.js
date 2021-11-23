"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroceryListNotebookContentSerializer = void 0;
const vscode = require("vscode");
const util_1 = require("util");
const extension_1 = require("./extension");
class GroceryListNotebookContentSerializer {
    // contents from file to VS Code Notebook data
    deserializeNotebook(content, token) {
        var contents = new util_1.TextDecoder().decode(content); // convert to String to make JSON object
        // Read file contents
        let raw = { groceryList: [], cells: [] };
        try {
            raw = JSON.parse(contents);
        }
        catch {
            raw = { groceryList: [], cells: [] };
        }
        if (raw.cells === undefined) {
            raw.cells = [];
        }
        extension_1.setGroceryList(raw.groceryList);
        function convertRawOutputToBytes(raw) {
            let result = [];
            for (let output of raw.outputs) {
                let data = new util_1.TextEncoder().encode(JSON.stringify(output.value));
                result.push(new vscode.NotebookCellOutputItem(data, output.mime));
            }
            return result;
        }
        // Create array of Notebook cells for the VS Code API from file contents
        const cells = raw.cells.map(item => new vscode.NotebookCellData(item.kind, item.value, item.language));
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i];
            cell.outputs = raw.cells[i].outputs ? [new vscode.NotebookCellOutput(convertRawOutputToBytes(raw.cells[i]))] : [];
        }
        return new vscode.NotebookData(cells);
    }
    serializeNotebook(data, token) {
        // function to take output renderer data to a format to save to the file
        function asRawOutput(cell) {
            var _a;
            let result = [];
            for (let output of (_a = cell.outputs) !== null && _a !== void 0 ? _a : []) {
                for (let item of output.items) {
                    let outputContents = '';
                    try {
                        outputContents = new util_1.TextDecoder().decode(item.data);
                    }
                    catch {
                    }
                    try {
                        let outputData = JSON.parse(outputContents);
                        result.push({ mime: item.mime, value: outputData });
                    }
                    catch {
                        result.push({ mime: item.mime, value: outputContents });
                    }
                }
            }
            return result;
        }
        // Map the Notebook data into the format we want to save the Notebook data as
        let contents = { groceryList: [], cells: [] };
        contents.groceryList = extension_1.groceryList;
        for (const cell of data.cells) {
            contents.cells.push({
                kind: cell.kind,
                language: cell.languageId,
                value: cell.value,
                outputs: asRawOutput(cell)
            });
        }
        // Give a string of all the data to save and VS Code will handle the rest 
        return new util_1.TextEncoder().encode(JSON.stringify(contents));
    }
}
exports.GroceryListNotebookContentSerializer = GroceryListNotebookContentSerializer;
//# sourceMappingURL=notebookContentSerializer.js.map