/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

// We've set up this sample using CSS modules, which lets you import class
// names into JavaScript: https://github.com/css-modules/css-modules
// You can configure or change this in the webpack.config.js file.
import * as style from './style.css';

interface IRenderInfo {
	container: HTMLElement;
	data: any;
}

// This function is called to render your contents.
export function render({ container, data }: IRenderInfo) {
	const pre = document.createElement('pre');
	pre.classList.add(style.json);

	// do rendering for output here
	const list = document.createElement('ol');

	const groceryList: string[] = Array.isArray(data) ? data : [];

	for(const item of groceryList) {
		const listItem = document.createElement('li');
		listItem.textContent = item;
		list.appendChild(listItem);
	}

	pre.appendChild(list);


	container.appendChild(pre);
}
