
var helper = {
    getElement: function (id) {
        return document.getElementById(id);
    },

    getBounds: function (el) {
        return helper.isElement(el) 
             ? el.getBoundingClientRect()
             : null;
    },

    isElement: function (el) {
        return el instanceof Element;
    },

    addListener: function (el, type, func) {
        if (!helper.isElement(el)) { return; }

        if (el.addEventListener) {
            el.addEventListener(type, func);
        }
        else if (el.attachEvent) {
            el.attachEvent(type, func);
        }
    },

    removeListener: function (el, type, func) {
        if (!helper.isElement(el)) { return; }
        
        if (el.removeEventListener) {
            el.removeEventListener(type, func);
        }
        else if (el.detachEvent) {
            el.detachEvent(type, func);
        }
    },

    addClass: function (el, _class) {
        if (!helper.isElement(el)) { return; }

        // TODO:
        el.classList.add(_class);
    },

    removeClass: function (el, _class) {
        if (!helper.isElement(el)) { return; }

        // TODO:
        el.classList.remove(_class);
    },

    setClass: function (el, bool, _class) {
        if (bool) {
            helper.addClass(el, _class);
        }
        else {
            helper.removeClass(el, _class);
        }
    },

    setText: function (el, text) {
        if (!helper.isElement(el)) { return; }

        if (el.innerText != undefined) {
            el.innerText = text;
        }
        else if (el.innerHTML) {
            el.innerHTML = text;
        }
    }
};

module.exports = helper;