const el = document.createElement("script");
el.type = "text/javascript";
el.src = chrome.runtime.getURL("cat.js");
document.body.setAttribute("meowsrc", chrome.runtime.getURL("cat.png"));
document.body.appendChild(el);