
/*
 * Hand the URL of the current tab over to the content script.
 */
function onSuccess(tabs) {
  var tab = tabs[0];
//   console.log(tab.url);
  browser.tabs.sendMessage(tab.id, {url: tab.url});
}

/*
 * We didn't get the URL of the current tab.
 * TODO user feedback
 */
function onError(error) {
  console.log(`Error: ${error}`);
}

/*
 * Try to get the URL of the current tab.
 */
function checkTab() {
  browser.tabs.query({currentWindow: true, active: true}).then(onSuccess, onError);
}

/*
 * Register listener for the button.
 */
browser.browserAction.onClicked.addListener(checkTab);
