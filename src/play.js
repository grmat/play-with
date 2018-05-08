/*
 * Create a M3U playlist file, paste the passed URL into it and download it.
 */
function download(request, sender, sendResponse) {
  var filename = "stream.m3u";
  var content = "#EXTM3U\n" + request.url;
  var element = document.createElement('a');
  var mime = 'video/x-mpegurl';
  // this prevents FF from remembering to "always open with..."
  //element.setAttribute('download', filename);
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
