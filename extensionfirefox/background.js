const tabStates = {};

browser.browserAction.onClicked.addListener(async tab => {
	const state = !tabStates[tab.id];
	tabStates[tab.id] = state;
	const icons = {
		"16":  state ?  "icondisabled16.png" :  "icon16.png" ,
		"32":  state ?  "icondisabled32.png" :  "icon32.png" ,
		"64":  state ?  "icondisabled64.png" :  "icon64.png" ,
		"128": state ? "icondisabled128.png" : "icon128.png" ,
	}
	browser.browserAction.setIcon({ path: icons, tabId: tab.id });
	browser.browserAction.setTitle({ title: state ? "Enable Meow" : "Disable Meow" });
	browser.tabs.executeScript(tab.id, {
		file: state ? "catdel.js" : "catadd.js",
	});
});