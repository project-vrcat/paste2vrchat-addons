export default async function paste(tab: chrome.tabs.Tab) {
  if (!tab.url || !tab.id) return;
  const items = await chrome.storage.local.get(["pauseAllVideo", "pressEnter"]);
  if (items["pauseAllVideo"] === "true")
    await chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () =>
        document.querySelectorAll("video").forEach((v: any) => v.pause()),
    });
  chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    func: Paste,
    args: [tab.url, items["pressEnter"] === "true"],
  });
}

function Paste(text: string, enter: boolean = false) {
  const u = `p2vrc://paste?text=${
    encodeURIComponent(text) + (enter ? "&enter=true" : "")
  }`;
  window.open(u);
}
