/*
 * Hand the URL of the current tab over to the content script.
 * TODO: user feedback for 'bad' URLs
 */
function invoke(info, tab) {
  var url = tab.url;
  if (info) {
    url = info.linkUrl || info.srcUrl;
  }
  console.log("play-with attempting to play url " + url);
  browser.tabs.sendMessage(tab.id, {url: url});
}

/*
 * Create the context menu for links.
 */
browser.contextMenus.create({
  id: "play-with",
  title: browser.i18n.getMessage("actionName"),
  contexts: ["link", "video"]
});

/*
 * Register listener for the button.
 */
browser.browserAction.onClicked.addListener((tab) => {
  invoke(null, tab);
});

/*
 * Register listener for the context menu.
 */
browser.contextMenus.onClicked.addListener((info, tab) => {
  invoke(info, tab);
});
