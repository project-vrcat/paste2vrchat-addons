import paste from "./paste";

chrome.runtime.onInstalled.addListener(() =>
  chrome.storage.local.set({
    pauseAllVideo: "true",
    pressEnter: "true",
  })
);

chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => paste(tab));
