"use strict";
var L02;
(function (L02) {
    console.log("hallo");
    window.addEventListener("load", hdlLoad);
    function hdlLoad() {
        document.addEventListener("mousemove", setInfoBox);
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        document.querySelector("body")?.addEventListener("click", logInfo);
        document.querySelector("body")?.addEventListener("keyup", logInfo);
    }
    function setInfoBox(_event) {
        let span = document.querySelector("span");
        span.style.top = (_event.clientY * 5).toString() + "px";
        span.style.left = (_event.clientX * 5).toString() + "px";
        span.innerText = "x-position:" + (_event.clientX * 5) + ", y-position:" + (_event.clientY * 5);
        span.innerText += ", target:" + _event.target.tagName;
    }
    function logInfo(_event) {
        console.log(_event.type);
    }
})(L02 || (L02 = {}));
//# sourceMappingURL=event.js.map