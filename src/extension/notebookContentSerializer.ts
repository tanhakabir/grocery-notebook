import * as vscode from 'vscode';
import { TextDecoder, TextEncoder } from "util";
import { groceryList, setGroceryList } from './extension';


// Interfaces for the data we're saving to the Notebook file

interface RawNotebookData {
	groceryList: string[],
	cells: RawNotebookCell[]
}

interface RawNotebookCell {
	language: string;               //  language code of cell
	value: string;                  //  code in cell
	kind: vscode.NotebookCellKind;  //  code cell or markdown
	outputs: RawCellOutput[];       //  saved outputs from cell
}

interface RawCellOutput {
	mime: string;                   //  kind of output, which renderer
	value: any;                     //  data for output
}

export class GroceryListNotebookContentSerializer implements vscode.NotebookSerializer {
	
	// contents from file to VS Code Notebook data
	deserializeNotebook(content: Uint8Array, token: vscode.CancellationToken): vscode.NotebookData | Thenable<vscode.NotebookData> {
		var contents = new TextDecoder().decode(content);    // convert to String to make JSON object
	
		// Read file contents
		let raw: RawNotebookData = { groceryList: [], cells: [] };
		try {
			raw = <RawNotebookData>JSON.parse(contents);
		} catch {
			raw = { groceryList: [], cells: [] };
		}

		if (raw.cells === undefined) {
			raw.cells = [];
		}

		setGroceryList(raw.groceryList);

		function convertRawOutputToBytes(raw: RawNotebookCell) {
            let result: vscode.NotebookCellOutputItem[] = [];

            for(let output of raw.outputs) {
                let data = new TextEncoder().encode(JSON.stringify(output.value));
                result.push(new vscode.NotebookCellOutputItem(data, output.mime));
            }

            return result;
        }

		// Create array of Notebook cells for the VS Code API from file contents
		const cells = raw.cells.map(item => new vscode.NotebookCellData(
			item.kind,
			item.value,
			item.language
		));

		for(let i = 0; i < cells.length; i++) {
			let cell = cells[i];
			cell.outputs = raw.cells[i].outputs ? [new vscode.NotebookCellOutput(convertRawOutputToBytes(raw.cells[i]))] : [];
		}

		return new vscode.NotebookData(
			cells
		);

	}
	serializeNotebook(data: vscode.NotebookData, token: vscode.CancellationToken): Uint8Array | Thenable<Uint8Array> {
		// function to take output renderer data to a format to save to the file
		function asRawOutput(cell: vscode.NotebookCellData): RawCellOutput[] {
			let result: RawCellOutput[] = [];
			for (let output of cell.outputs ?? []) {
				for (let item of output.items) {
                    let outputContents = '';
                    try {
                        outputContents = new TextDecoder().decode(item.data);
                    } catch {
                        
                    }

                    try {
                        let outputData = JSON.parse(outputContents);
                        result.push({ mime: item.mime, value: outputData });
                    } catch {
                        result.push({ mime: item.mime, value: outputContents });
                    }
				}
			}
			return result;
		}

		// Map the Notebook data into the format we want to save the Notebook data as

		let contents: RawNotebookData = { groceryList: [], cells: [] };

		contents.groceryList = groceryList;

		for (const cell of data.cells) {
			contents.cells.push({
				kind: cell.kind,
				language: cell.languageId,
				value: cell.value,
				outputs: asRawOutput(cell)
			});
		}

		// Give a string of all the data to save and VS Code will handle the rest 
		return new TextEncoder().encode(JSON.stringify(contents));		
	}

}