"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoCompletionProvider = void 0;
const vscode = require("vscode");
class TodoCompletionProvider {
    provideCompletionItems(document, position, token, context) {
        let keywords = ['ADD', 'DELETE', 'LIST'];
        const result = [];
        for (const word of keywords) {
            result.push({
                label: word,
                insertText: `${word} `,
                detail: 'TODO method',
                kind: vscode.CompletionItemKind.Method
            });
        }
        return result;
    }
}
exports.TodoCompletionProvider = TodoCompletionProvider;
//# sourceMappingURL=languageProvider.js.map