"use strict";
["Activated", "Moved", "Highlighted", "Detached", "Attached"].forEach((act) => {
  chrome.tabs["on" + act].addListener(() => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      tabs.forEach((tab) => chrome.tabs.sendMessage(tab.id, "tabChanged"));
    });
  });
});
chrome.runtime.onMessage.addListener((req) => {
  if (req.zoom === "zoomin") {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      changeZoom(tabs, 0.1);
    });
  } else if (req.zoom === "zoomout") {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      changeZoom(tabs, -0.1);
    });
  }
  return true;
});

const changeZoom = (tabs, amnt) => {
  tabs.forEach((tab) => {
    if (tab.highlighted) {
      chrome.tabs.getZoom(tab.id, (zoom) => {
        chrome.tabs.setZoom(tab.id, zoom + amnt, () => {});
      });
    }
  });
};
