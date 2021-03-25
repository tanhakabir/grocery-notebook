// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { SampleContentSerializer, SampleKernelProvider } from './sampleProvider';
import { TodoCompletionProvider } from './languageProvider';

// This method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  
  context.subscriptions.push(
    vscode.notebook.registerNotebookSerializer('test-notebook-renderer', new SampleContentSerializer()),
    vscode.notebook.registerNotebookKernelProvider(
      { viewType: 'test-notebook-renderer'},
      new SampleKernelProvider(),
    ),
    vscode.languages.registerCompletionItemProvider({ language: 'todo-book' }, new TodoCompletionProvider() )
  );
  
}

// This method is called when your extension is deactivated
export function deactivate() { }
