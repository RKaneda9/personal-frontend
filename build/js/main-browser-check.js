/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';
	
	// Opera 8.0+
	
	var isOpera = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	
	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';
	
	// Safari 3.0+ "[object HTMLElementConstructor]" 
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || function (p) {
		return p.toString() === "[object SafariRemoteNotification]";
	}(!window['safari'] || safari.pushNotification);
	
	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	
	// Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;
	
	// Blink engine detection
	var isBlink = (isChrome || isOpera) && !!window.CSS;
	
	var parseIntIgnoresLeadingZeros = function () {
		return parseInt('010', 10) === 10;
	}();
	
	var strictMode = function () {
		return !this;
	}();
	
	var DateISOString = function () {
		return !!(Date && Date.prototype && Date.prototype.toISOString);
	}();
	
	var isES5 = !!(parseIntIgnoresLeadingZeros && strictMode && DateISOString);
	
	if (!isES5 || isIE) {
		window.location = '/index-old.html';
	}

/***/ })
/******/ ]);