export default async function paste(tab: chrome.tabs.Tab) {
  if (!tab.url || !tab.id) return;
  const items = await chrome.storage.local.get(["pauseAllVideo"]);
  if (items["pauseAllVideo"] === "true")
    await chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: pauseAllVideo,
    });
  chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    func: urlSchemePaste,
    args: [tab.url],
  });
}

function urlSchemePaste(text: string) {
  const u = `p2vrc://paste?text=${encodeURIComponent(text)}`;
  window.open(u);
}

function pauseAllVideo() {
  document.querySelectorAll("video").forEach((v: any) => v.pause());
}
