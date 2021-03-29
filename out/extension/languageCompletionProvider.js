"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroceryNotebookCompletionProvider = void 0;
const vscode = require("vscode");
// use the VS Code language API to add IntelliSense
class GroceryNotebookCompletionProvider {
    provideCompletionItems(document, position, token, context) {
        const result = [];
        // create IntelliSense (autocompletes) for 'BUY', 'REMOVE', and 'LIST'
        result.push({
            label: 'BUY',
            insertText: `BUY `,
            detail: 'Add grocery item to list',
            kind: vscode.CompletionItemKind.Method
        });
        result.push({
            label: 'REMOVE',
            insertText: `REMOVE `,
            detail: 'Remove grocery item from list',
            kind: vscode.CompletionItemKind.Method
        });
        result.push({
            label: 'LIST',
            insertText: `LIST`,
            detail: 'List grocery items to buy',
            kind: vscode.CompletionItemKind.Method
        });
        return result;
    }
}
exports.GroceryNotebookCompletionProvider = GroceryNotebookCompletionProvider;
//# sourceMappingURL=languageCompletionProvider.js.map