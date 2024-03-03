/** @typedef {import("./common")} */

document.addEventListener('DOMContentLoaded', async () => {
    // Localize page
    document.querySelectorAll('[data-i18n]').forEach(elem => {
      const translated = browser.i18n.getMessage(elem.dataset.i18n);
      if (translated) {
        elem.innerText = translated;
      }
    })
  
    // Load existing settings
    const options = await loadOptions();
    document.forms[0].syncSettings.checked = options.syncSettings;
    document.forms[0].thumbnailMode.value = options.thumbnailMode;
});
  
// Save on change
document.forms[0].addEventListener('change', async () => {
	const status = document.getElementById('status');
	status.textContent = `⏳ ${browser.i18n.getMessage('options_saving')}`

	await saveOptions({
	syncSettings: document.forms[0].syncSettings.checked,
	thumbnailMode: document.forms[0].thumbnailMode.value,
})

// Artificial delay, so the 'saving' message actually appears
await new Promise(resolve => setTimeout(resolve, 200))

status.textContent = `✅ ${browser.i18n.getMessage('options_saved')}`;
});

/**
 * @param {Options} options
 * @returns {Promise<void>}
 */
const saveOptions = async (options) => new Promise((resolve) => {
	browser.storage.local.set(options, resolve);
	if (options.syncSettings) {
		browser.storage.sync.set(options, resolve);
	}
})