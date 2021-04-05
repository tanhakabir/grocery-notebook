import * as vscode from 'vscode';
import { groceryList, addToGroceryList, removeFromGroceryList } from './extension';

export class GroceryListNotebookKernelProvider implements vscode.NotebookKernelProvider {
	provideKernels(): vscode.ProviderResult<vscode.NotebookKernel[]> {
		return [new GroceryListNotebookExecutionKernel()];
	}
}

export class GroceryListNotebookExecutionKernel implements vscode.NotebookKernel {
	readonly id = 'grocery-list-notebook-kernel';
	public readonly label = 'Grocery List Notebook Kernel';
	readonly supportedLanguages = ['json'];

	private _executionOrder = 0;

	async executeCellsRequest(document: vscode.NotebookDocument, ranges: vscode.NotebookCellRange[]): Promise<void> {
        // find the cells that are being asked to run
		for (let range of ranges) {
			for (let cell of document.getCells(range)) {
				
                // create an execution task that handles events like cancellation and perform actions from completing the run execution
				const execution = vscode.notebook.createNotebookCellExecutionTask(cell.notebook.uri, cell.index, this.id)!;
				await this._doExecution(execution);
			}
		}
	}

	private async _doExecution(execution: vscode.NotebookCellExecutionTask): Promise<void> {
		const cell = await vscode.workspace.openTextDocument(execution.cell.document.uri);   // find cell in notebook to get code from

		// start a timer
		execution.executionOrder = ++this._executionOrder;
		execution.start({ startTime: Date.now() });

		const metadata = {
			startTime: Date.now()
		};

		// do the work
		try {
			// this is where we'd do our "compiling" before outputting results
			const outputData = JSON.parse(cell.getText());

            // update the outputs of the cell with options for a simple JSON output or a stylized JSON output
			execution.replaceOutput([new vscode.NotebookCellOutput([
				// new vscode.NotebookCellOutputItem('x-application/grocery-list-notebook', outputData),
				new vscode.NotebookCellOutputItem('application/json', outputData),
			], metadata)]);

			execution.end({ success: true });
		} catch (err) {

            // something went wrong and we need to update the output of the cell to be showing an error
			execution.replaceOutput([new vscode.NotebookCellOutput([
				new vscode.NotebookCellOutputItem('application/x.notebook.error-traceback', {
					ename: err instanceof Error && err.name || 'error',
					evalue: err instanceof Error && err.message || JSON.stringify(err, undefined, 4),
					traceback: []
				})
			])]);
			execution.end({ success: false });
		}
	}
}