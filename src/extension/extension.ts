// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { TodoNotebookContentSerializer } from './notebookContentSerializer';
import { TodoNotebookKernelProvider } from './notebookExecutionKernel';
import { TodoNotebookCompletionProvider } from './todoLanguageProvider';

export var todoItems: string[] = [];

// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.notebook.registerNotebookSerializer(
			'todo-notebook', new TodoNotebookContentSerializer()
		),
		vscode.notebook.registerNotebookKernelProvider(
			{ viewType: 'todo-notebook' },
			new TodoNotebookKernelProvider(),
		), 
		
		// register our Todo language
		vscode.languages.registerCompletionItemProvider({ language: 'todo-book' }, new TodoNotebookCompletionProvider())
	);

}

// This method is called when your extension is deactivated
export function deactivate() { }