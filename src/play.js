/*
 * Create a M3U playlist file, paste the passed URL into it and download it.
 */
function download(request, sender, sendResponse) {
  var filename = "stream.m3u";
  var content = "#EXTM3U\n" + request.url;
  var element = document.createElement('a');
  // TODO: correct MIME type is important for FF to decide which app to use the file
  // found "audio/x-mpequrl" for m3u but seems weird for xdg
  // video/mpeg seems to work (for now?)
  var mime = 'video/mpeg';
  element.setAttribute('download', filename);
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
