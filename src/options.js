// ----------------- Internationalization ------------------
for (let node of document.querySelectorAll('[data-i18n]')) {
  let [text, attr] = node.dataset.i18n.split('|');
  text = chrome.i18n.getMessage(text);
  attr ? node[attr] = text : node.appendChild(document.createTextNode(text));
}
// ----------------- /Internationalization -----------------
// from https://github.com/erosman/HTML-Internationalization

function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    modifier: document.querySelector("#modifier").value,
    keyBinding: document.querySelector("#keyBinding").value
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#modifier").value = result.modifier || "";
    document.querySelector("#keyBinding").value = result.keyBinding || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("keyBinding");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
