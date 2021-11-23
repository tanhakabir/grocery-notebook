"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroceryListNotebookExecutionKernel = void 0;
const vscode = require("vscode");
const extension_1 = require("./extension");
class GroceryListNotebookExecutionKernel {
    constructor() {
        this.id = 'grocery-list-notebook-kernel';
        this.notebookType = 'grocery-list-notebook';
        this.label = 'Grocery List Notebook Kernel';
        this.supportedLanguages = ['grocery-list'];
        this._executionOrder = 0;
        this._controller = vscode.notebooks.createNotebookController(this.id, this.notebookType, this.label);
        this._controller.supportedLanguages = this.supportedLanguages;
        this._controller.supportsExecutionOrder = true;
        this._controller.description = 'A notebook for managing a grocery list.';
        this._controller.executeHandler = this._executeAll.bind(this);
    }
    dispose() {
        this._controller.dispose();
    }
    _executeAll(cells, _notebook, _controller) {
        for (let cell of cells) {
            this._doExecution(cell);
        }
    }
    async _doExecution(cell) {
        const execution = this._controller.createNotebookCellExecution(cell);
        // update metadata
        execution.executionOrder = ++this._executionOrder;
        execution.start(Date.now());
        // do the work
        try {
            // this is where we'd do our "compiling" before outputting results
            this._processCell(cell.document.getText());
            // update the outputs of the cell with options for a simple JSON output or a stylized JSON output
            execution.replaceOutput([new vscode.NotebookCellOutput([
                    vscode.NotebookCellOutputItem.json(extension_1.groceryList, 'x-application/grocery-list-notebook'),
                    vscode.NotebookCellOutputItem.json(extension_1.groceryList)
                ])]);
            execution.end(true, Date.now());
        }
        catch (err) {
            // something went wrong and we need to update the output of the cell to be showing an error
            execution.replaceOutput([
                new vscode.NotebookCellOutput([
                    vscode.NotebookCellOutputItem.error({
                        name: err instanceof Error && err.name || 'error',
                        message: err instanceof Error && err.message || JSON.stringify(err, undefined, 4)
                    })
                ])
            ]);
            execution.end(false, Date.now());
        }
    }
    // my "compiler"
    _processCell(text) {
        // my language consists of the action followed by a space and then the parameter
        // example input:
        // BUY milk
        // REMOVE 2
        // LIST
        switch (text.substring(0, text.indexOf(' '))) {
            case 'BUY':
                extension_1.addToGroceryList(text.substring(text.indexOf(' ') + 1));
                return;
            case 'REMOVE':
                const index = parseInt(text.substring(text.indexOf(' ') + 1));
                if (index === NaN) {
                    throw new Error('Cannot remove item from grocery list at index that does not exist!');
                }
                extension_1.removeFromGroceryList(index);
                return;
            case 'LIST':
                return;
            default:
                throw new Error('Unexpected action! Please use BUY, REMOVE, or LIST');
        }
    }
}
exports.GroceryListNotebookExecutionKernel = GroceryListNotebookExecutionKernel;
//# sourceMappingURL=notebookExecutionKernel.js.map