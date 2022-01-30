import paste from "./paste";

chrome.runtime.onInstalled.addListener(() =>
  chrome.storage.local.set({ pauseAllVideo: "true" })
);

chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => paste(tab));
