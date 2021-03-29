// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { GroceryListNotebookContentSerializer } from './notebookContentSerializer';
import { GroceryListNotebookKernelProvider } from './notebookExecutionKernel';
import { GroceryNotebookCompletionProvider } from './languageCompletionProvider';

export var groceryList: string[] = [];

// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.notebook.registerNotebookSerializer(
			'grocery-list-notebook', new GroceryListNotebookContentSerializer()
		),
		vscode.notebook.registerNotebookKernelProvider(
			{ viewType: 'grocery-list-notebook' },
			new GroceryListNotebookKernelProvider(),
		), 
		
		// register our Todo language
		vscode.languages.registerCompletionItemProvider({ language: 'grocery-list' }, new GroceryNotebookCompletionProvider())
	);

}

// This method is called when your extension is deactivated
export function deactivate() { }


export function setGroceryList(list: string[]) {
	groceryList = list;
}