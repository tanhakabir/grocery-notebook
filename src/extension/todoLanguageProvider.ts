import * as vscode from 'vscode';

// use the VS Code language API to add IntelliSense
export class TodoNotebookCompletionProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
        const result: vscode.CompletionItem[] = [];

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