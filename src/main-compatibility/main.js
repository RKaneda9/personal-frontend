            require('./support/polyfill');
var data  = require('data');
var Pages = {
    Contact  : require('./pages/contact'),
    Portfolio: require('./pages/portfolio')
};

(function (callback) {

    // browser event has already occurred.
    if (document.readyState === "complete") {
        return setTimeout(callback);
    }

    // Mozilla, Opera and webkit style
    if (window.addEventListener) {
        return window.addEventListener("load", callback, false);
    }

    // If IE event model is used
    if (window.attachEvent) {
        return window.attachEvent("onload", callback);
    }

}(function () {

    // application start
    var pages = {
        contact  : new Pages.Contact  (data.contact), 
        portfolio: new Pages.Portfolio(data.portfolio)
    };
}));
