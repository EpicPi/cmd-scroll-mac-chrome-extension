"use strict";
const cmdScroll = () => {
  let keyDown = false;
  let keyDownTime = 0;

  window.addEventListener(
    "keydown",
    (e) => {
      if ("Meta" === e.key) {
        keyDownTime = 0;
        keyDown = true;
      }
    },
    false
  );

  window.addEventListener(
    "keyup",
    (e) => {
      if ("Meta" === e.key) {
        keyDownTime = 0;
        keyDown = false;
      }
    },
    false
  );

  chrome.runtime.onMessage.addListener(function (e) {
    if ("tabChanged" === e) {
      keyDown = false;
    }
  });

  window.addEventListener(
    "mousewheel",
    (e) => {
      keyDownTime = 0;
      if (e.deltaY < 0 && keyDown) {
        chrome.runtime.sendMessage({ zoom: "zoomin" }, function () {});
        e.stopPropagation();
        e.preventDefault();
        return false;
      } else if (e.deltaY > 0 && keyDown) {
        chrome.runtime.sendMessage({ zoom: "zoomout" }, function () {});
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
    },
    { capture: false, passive: false }
  );

  setInterval(() => {
    keyDownTime++;
    if (keyDownTime > 20) {
      keyDownTime = 0;
      keyDown = false;
    }
  }, 1000);
};
window.addEventListener("DOMContentLoaded", (event) => {
  cmdScroll();
  console.log("--------------------------------DOM fully loaded and parsed");
});
