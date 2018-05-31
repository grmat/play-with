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
function download(url) {
  var content = "#EXTM3U\n" + url;
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
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  download(request.url);
});

var keyBinding;
var modifier;

function keyListener(e) {
  var evtobj = window.event ? event : e;
  switch (modifier) {
    case "ctrl":
      modifierMatch = evtobj.ctrlKey;
      break;
    case "alt":
      modifierMatch = evtobj.altKey;
      break;
    case "shift":
      modifierMatch = evtobj.shiftKey;
      break;
    default:
      break;
  }
  if (evtobj.key == keyBinding && modifierMatch) download("TODO: insert url");
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  keyBinding = item.keyBinding;
  modifier = item.modifier;
  /*
   * Register listener for KeyboardEvent
   */
  document.onkeydown = keyListener;
  // document.body.style.border = "10px solid " + color;
}

var getting = browser.storage.local.get(["keyBinding", "modifier"]);
getting.then(onGot, onError);
