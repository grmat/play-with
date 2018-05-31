/*
 * Workaround for issue #1/upstream bug 1465458
 */
var firstRunElapsed;

function onError(error) {
  console.log(`Error: ${error}`);
  firstRunElapsed = false;
}

function onGot(item) {
  firstRunElapsed = item.firstRunElapsed || false;
}

var getting = browser.storage.local.get(["firstRunElapsed"]);
getting.then(onGot, onError);

/*
 * Create a M3U playlist file, paste the passed URL into it and download it.
 */
function download(request, sender, sendResponse) {
  var content = "#EXTM3U\n" + request.url;
  var element = document.createElement('a');
  var mime = 'video/x-mpegurl';

  if (!firstRunElapsed) {
    // this prevents FF from remembering to "always open with..."
    var filename = "stream.m3u";
    element.setAttribute('download', filename);
    browser.storage.local.set({
      firstRunElapsed: true
    });
  }

  element.setAttribute('href', 'data:' + mime + ';charset=utf-8,' + encodeURIComponent(content));
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/*
 * Register listener for message from background script.
 */
browser.runtime.onMessage.addListener(download);
