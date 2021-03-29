"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGroceryList = exports.deactivate = exports.activate = exports.groceryList = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const notebookContentSerializer_1 = require("./notebookContentSerializer");
const notebookExecutionKernel_1 = require("./notebookExecutionKernel");
const languageCompletionProvider_1 = require("./languageCompletionProvider");
exports.groceryList = [];
// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    context.subscriptions.push(vscode.notebook.registerNotebookSerializer('grocery-list-notebook', new notebookContentSerializer_1.GroceryListNotebookContentSerializer()), vscode.notebook.registerNotebookKernelProvider({ viewType: 'grocery-list-notebook' }, new notebookExecutionKernel_1.GroceryListNotebookKernelProvider()), 
    // register our Todo language
    vscode.languages.registerCompletionItemProvider({ language: 'grocery-list' }, new languageCompletionProvider_1.GroceryNotebookCompletionProvider()));
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
function setGroceryList(list) {
    exports.groceryList = list;
}
exports.setGroceryList = setGroceryList;
//# sourceMappingURL=extension.js.map