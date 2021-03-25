"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const sampleProvider_1 = require("./sampleProvider");
const languageProvider_1 = require("./languageProvider");
// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    context.subscriptions.push(vscode.notebook.registerNotebookSerializer('test-notebook-renderer', new sampleProvider_1.SampleContentSerializer()), vscode.notebook.registerNotebookKernelProvider({ viewType: 'test-notebook-renderer' }, new sampleProvider_1.SampleKernelProvider()), vscode.languages.registerCompletionItemProvider({ language: 'todo-book' }, new languageProvider_1.TodoCompletionProvider()));
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map