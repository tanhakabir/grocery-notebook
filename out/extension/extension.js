"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.todoItems = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const notebookContentSerializer_1 = require("./notebookContentSerializer");
const notebookExecutionKernel_1 = require("./notebookExecutionKernel");
const todoLanguageProvider_1 = require("./todoLanguageProvider");
exports.todoItems = [];
// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    context.subscriptions.push(vscode.notebook.registerNotebookSerializer('todo-notebook', new notebookContentSerializer_1.TodoNotebookContentSerializer()), vscode.notebook.registerNotebookKernelProvider({ viewType: 'todo-notebook' }, new notebookExecutionKernel_1.TodoNotebookKernelProvider()), 
    // register our Todo language
    vscode.languages.registerCompletionItemProvider({ language: 'todo-book' }, new todoLanguageProvider_1.TodoNotebookCompletionProvider()));
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map