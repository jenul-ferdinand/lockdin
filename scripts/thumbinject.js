/** @typedef {import("./thumbcommon")} */

const css = {
    "normal": "/* default */",    
    "blurred": `ytd-thumbnail img, ytd-playlist-thumbnail img, .video-thumbnail-img, .ytp-videowall-still-image {
    filter: blur(16px); 
  }`,
};    


const elem = document.createElement("style");
document.documentElement.appendChild(elem);

const updateElem = async () => {
	const options = await loadOptions()

	const isDisabled = false;

	elem.innerHTML = `/* You have been LOCKDIN */
	${css[isDisabled ? 'normal' : options.thumbnailMode]}`
}

// Update when settings are changed
browser.storage.onChanged.addListener(updateElem)
let lastPathname = window.location.pathname;
setInterval(() => {
	if (lastPathname !== window.location.pathname) {
	lastPathname = window.location.pathname
	updateElem();
	}
}, 200);

// Initialize on load
updateElem()
    