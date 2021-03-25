import * as vscode from 'vscode';

export class TodoCompletionProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
        let keywords = ['ADD', 'DELETE', 'LIST'];
        const result: vscode.CompletionItem[] = [];

        for(const word of keywords) {
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