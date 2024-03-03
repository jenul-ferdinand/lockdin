// Define chrome browser in error/bug case
if (typeof globalThis.browser === "undefined") {
	globalThis.browser = globalThis.chrome;
}

/**
* @typedef {{
*   syncSettings: boolean,
*   thumbnailMode: 'blurred' | 'normal',
* }} Options
*/

/** @type {Options} */
const defaultOptions = {
    syncSettings: true,
    thumbnailMode: 'blurred',
}

/**
* @returns {Promise<Options>}
*/
const loadOptions = async () => {
	/** @type {boolean} */
	const syncSettings = (await new Promise((resolve) => {
		browser.storage.local.get(defaultOptions, resolve);
	})).syncSettings ?? defaultOptions.syncSettings;

	const options = await new Promise((resolve) => {
		browser.storage[syncSettings ? 'sync' : 'local'].get(defaultOptions, resolve);
	})

	return { ...defaultOptions, ...options }
}
  