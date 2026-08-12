chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "pahruli-open",
    title: "Open Pahruli Arsenal",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "pahruli-open") {
    openPahruli();
  }
});

chrome.action.onClicked.addListener(() => {
  openPahruli();
});

function openPahruli() {
  const url = chrome.runtime.getURL("index.html");
  chrome.tabs.create({ url });
}
