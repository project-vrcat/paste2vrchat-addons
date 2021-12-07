import paste from "./paste";

chrome.runtime.onInstalled.addListener((): void => {
  chrome.storage.local.set({ pauseAllVideo: "true" });
});

chrome.browserAction.onClicked.addListener(async (tab: chrome.tabs.Tab) => {
  paste(tab);
});
