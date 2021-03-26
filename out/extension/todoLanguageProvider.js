"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoNotebookCompletionProvider = void 0;
const vscode = require("vscode");
// use the VS Code language API to add IntelliSense
class TodoNotebookCompletionProvider {
    provideCompletionItems(document, position, token, context) {
        const result = [];
        // create IntelliSense (autocompletes) for 'ADD', 'DELETE', and 'LIST'
        result.push({
            label: 'ADD',
            insertText: `ADD `,
            detail: 'Add todo item to list',
            kind: vscode.CompletionItemKind.Method
        });
        result.push({
            label: 'DELETE',
            insertText: `DELETE `,
            detail: 'Delete todo item from list',
            kind: vscode.CompletionItemKind.Method
        });
        result.push({
            label: 'LIST',
            insertText: `LIST`,
            detail: 'List todo items',
            kind: vscode.CompletionItemKind.Method
        });
        return result;
    }
}
exports.TodoNotebookCompletionProvider = TodoNotebookCompletionProvider;
//# sourceMappingURL=todoLanguageProvider.js.map