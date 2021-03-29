/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

// We've set up this sample using CSS modules, which lets you import class
// names into JavaScript: https://github.com/css-modules/css-modules
// You can configure or change this in the webpack.config.js file.
import * as style from './style.css';
import type { NotebookRendererApi } from 'vscode-notebook-renderer';

interface IRenderInfo {
	container: HTMLElement;
	data: any;
	notebookApi: NotebookRendererApi<unknown>;
}

// This function is called to render your contents.
export function render({ container, data }: IRenderInfo) {
	const pre = document.createElement('pre');
	pre.classList.add(style.json);

	// do rendering for output here

	container.appendChild(pre);
}
