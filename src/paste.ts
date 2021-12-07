export default function paste(tab: chrome.tabs.Tab) {
  if (!tab.url || !tab.id) return;
  chrome.storage.local.get(["pauseAllVideo"], (res) => {
    if (res["pauseAllVideo"] === "true")
      chrome.tabs.executeScript(tab.id!, {
        code: `document.querySelectorAll("video").forEach(v => v.pause());`,
      });
  });
  urlSchemePaste(tab.url);
}

function urlSchemePaste(text: string) {
  const u = `p2vrc://paste?text=${encodeURIComponent(text)}`;
  if (window.open(u) === null)
    chrome.windows.create({ url: u }, (win) => {
      setTimeout(() => {
        win?.id && chrome.windows.remove(win.id);
      }, 5000);
    });
}
