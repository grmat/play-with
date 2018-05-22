/*
 * Hand the URL of the current tab over to the content script.
 * TODO: user feedback for 'bad' URLs
 */
function invoke(tab) {
  // console.log(tab.url);
  browser.tabs.sendMessage(tab.id, {url: tab.url});
}

/*
 * Register listener for the button.
 */
browser.browserAction.onClicked.addListener(invoke);
