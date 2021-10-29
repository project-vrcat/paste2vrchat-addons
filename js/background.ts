chrome.runtime.onMessage.addListener(() => {
  paste();
});

chrome.action.onClicked.addListener(() => {
  paste();
});

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function paste() {
  let tab = await getCurrentTab();
  if (!tab) return;
  let urlStr = tab.url;
  if (!urlStr) return;
  let url = new URL(urlStr);
  let f = (text: string) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: pasteText,
      args: [text],
    });
  };
  switch (url.host) {
    case "www.youtube.com":
      let vid = url.searchParams.get("v");
      if (vid) f(`https://youtu.be/${vid}`);
      break;
    case "vimeo.com":
      if (url.pathname === "/") return;
      f(`https://vimeo.com${url.pathname}`);
      break;
    default:
      break;
  }
}

function pasteText(text: string) {
  open(`p2vrc://paste?text=${text}`);
}
