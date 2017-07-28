'use strict';

// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

var parseIntIgnoresLeadingZeros = (function () {
    return parseInt('010', 10) === 10;
}());

var strictMode = (function () {
    return !this;
}());

var DateISOString = (function () {
    return !!(Date && Date.prototype && Date.prototype.toISOString);
}());

var isES5 = !!(
    parseIntIgnoresLeadingZeros &&
    strictMode &&
    DateISOString
);

if (!isES5 || isIE) { window.location = '/index-old.html'; }