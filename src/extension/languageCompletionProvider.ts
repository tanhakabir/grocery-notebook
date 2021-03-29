import * as vscode from 'vscode';

// use the VS Code language API to add IntelliSense
export class GroceryNotebookCompletionProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
        const result: vscode.CompletionItem[] = [];

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