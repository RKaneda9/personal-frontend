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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _app = __webpack_require__(3);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _data = __webpack_require__(33);
	
	var data = _interopRequireWildcard(_data);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode;
	
	
	_inferno2.default.render(createVNode(16, _app2.default, _extends({}, data)), document.getElementById('app'));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);
	module.exports.default = module.exports;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * inferno v1.0.7
	 * (c) 2017 Dominic Gannaway
	 * Released under the MIT License.
	 */
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.Inferno = global.Inferno || {})));
	}(this, (function (exports) { 'use strict';
	
	var NO_OP = '$NO_OP';
	var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
	var isBrowser = typeof window !== 'undefined' && window.document;
	
	// this is MUCH faster than .constructor === Array and instanceof Array
	// in Node 7 and the later versions of V8, slower in older versions though
	var isArray = Array.isArray;
	function isStatefulComponent(o) {
	    return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
	}
	function isStringOrNumber(obj) {
	    return isString(obj) || isNumber(obj);
	}
	function isNullOrUndef(obj) {
	    return isUndefined(obj) || isNull(obj);
	}
	function isInvalid(obj) {
	    return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
	}
	function isFunction(obj) {
	    return typeof obj === 'function';
	}
	function isAttrAnEvent(attr) {
	    return attr[0] === 'o' && attr[1] === 'n' && attr.length > 3;
	}
	function isString(obj) {
	    return typeof obj === 'string';
	}
	function isNumber(obj) {
	    return typeof obj === 'number';
	}
	function isNull(obj) {
	    return obj === null;
	}
	function isTrue(obj) {
	    return obj === true;
	}
	function isUndefined(obj) {
	    return obj === undefined;
	}
	function isObject(o) {
	    return typeof o === 'object';
	}
	function throwError(message) {
	    if (!message) {
	        message = ERROR_MSG;
	    }
	    throw new Error(("Inferno Error: " + message));
	}
	function warning(condition, message) {
	    if (!condition) {
	        console.error(message);
	    }
	}
	var EMPTY_OBJ = {};
	
	function applyKeyIfMissing(index, vNode) {
	    if (isNull(vNode.key)) {
	        vNode.key = "." + index;
	    }
	    return vNode;
	}
	function _normalizeVNodes(nodes, result, index, keyCounter) {
	    for (; index < nodes.length; index++) {
	        var n = nodes[index];
	        if (!isInvalid(n)) {
	            if (isArray(n)) {
	                keyCounter = _normalizeVNodes(n, result, 0, keyCounter);
	            }
	            else {
	                if (isStringOrNumber(n)) {
	                    n = createTextVNode(n);
	                }
	                else if (isVNode(n) && n.dom) {
	                    n = cloneVNode(n);
	                }
	                result.push((applyKeyIfMissing(keyCounter++, n)));
	            }
	        }
	        else {
	            // Support for nulls
	            keyCounter++;
	        }
	    }
	    return keyCounter;
	}
	function normalizeVNodes(nodes) {
	    var newNodes, keyCounter = 0;
	    // we assign $ which basically means we've flagged this array for future note
	    // if it comes back again, we need to clone it, as people are using it
	    // in an immutable way
	    // tslint:disable
	    if (nodes['$']) {
	        nodes = nodes.slice();
	    }
	    else {
	        nodes['$'] = true;
	    }
	    // tslint:enable
	    for (var i = 0; i < nodes.length; i++) {
	        var n = nodes[i];
	        keyCounter++;
	        if (isInvalid(n) || isArray(n)) {
	            var result = (newNodes || nodes).slice(0, i);
	            keyCounter = _normalizeVNodes(nodes, result, i, keyCounter);
	            return result;
	        }
	        else if (isStringOrNumber(n)) {
	            if (!newNodes) {
	                newNodes = nodes.slice(0, i);
	            }
	            newNodes.push(applyKeyIfMissing(keyCounter, createTextVNode(n)));
	        }
	        else if ((isVNode(n) && n.dom) || (isNull(n.key) && !(n.flags & 64 /* HasNonKeyedChildren */))) {
	            if (!newNodes) {
	                newNodes = nodes.slice(0, i);
	            }
	            newNodes.push(applyKeyIfMissing(keyCounter, cloneVNode(n)));
	        }
	        else if (newNodes) {
	            newNodes.push(applyKeyIfMissing(keyCounter, cloneVNode(n)));
	        }
	    }
	    return newNodes || nodes;
	}
	function normalizeChildren(children) {
	    if (isArray(children)) {
	        return normalizeVNodes(children);
	    }
	    else if (isVNode(children) && children.dom) {
	        return cloneVNode(children);
	    }
	    return children;
	}
	function normalizeProps(vNode, props, children) {
	    if (!(vNode.flags & 28 /* Component */) && isNullOrUndef(children) && !isNullOrUndef(props.children)) {
	        vNode.children = props.children;
	    }
	    if (props.ref) {
	        vNode.ref = props.ref;
	        delete props.ref;
	    }
	    if (props.events) {
	        vNode.events = props.events;
	    }
	    if (!isNullOrUndef(props.key)) {
	        vNode.key = props.key;
	        delete props.key;
	    }
	}
	function copyPropsTo(copyFrom, copyTo) {
	    for (var prop in copyFrom) {
	        if (isUndefined(copyTo[prop])) {
	            copyTo[prop] = copyFrom[prop];
	        }
	    }
	}
	function normalizeElement(type, vNode) {
	    if (type === 'svg') {
	        vNode.flags = 128 /* SvgElement */;
	    }
	    else if (type === 'input') {
	        vNode.flags = 512 /* InputElement */;
	    }
	    else if (type === 'select') {
	        vNode.flags = 2048 /* SelectElement */;
	    }
	    else if (type === 'textarea') {
	        vNode.flags = 1024 /* TextareaElement */;
	    }
	    else if (type === 'media') {
	        vNode.flags = 256 /* MediaElement */;
	    }
	    else {
	        vNode.flags = 2 /* HtmlElement */;
	    }
	}
	function normalize(vNode) {
	    var props = vNode.props;
	    var hasProps = !isNull(props);
	    var type = vNode.type;
	    var children = vNode.children;
	    // convert a wrongly created type back to element
	    if (isString(type) && (vNode.flags & 28 /* Component */)) {
	        normalizeElement(type, vNode);
	        if (hasProps && props.children) {
	            vNode.children = props.children;
	            children = props.children;
	        }
	    }
	    if (hasProps) {
	        normalizeProps(vNode, props, children);
	    }
	    if (!isInvalid(children)) {
	        vNode.children = normalizeChildren(children);
	    }
	    if (hasProps && !isInvalid(props.children)) {
	        props.children = normalizeChildren(props.children);
	    }
	}
	
	var options = {
	    recyclingEnabled: true,
	    findDOMNodeEnabled: false,
	    roots: null,
	    createVNode: null,
	    beforeRender: null,
	    afterRender: null,
	    afterMount: null,
	    afterUpdate: null,
	    beforeUnmount: null
	};
	
	function createVNode(flags, type, props, children, events, key, ref, noNormalise) {
	    if (flags & 16 /* ComponentUnknown */) {
	        flags = isStatefulComponent(type) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
	    }
	    var vNode = {
	        children: isUndefined(children) ? null : children,
	        dom: null,
	        events: events || null,
	        flags: flags,
	        key: isUndefined(key) ? null : key,
	        props: props || null,
	        ref: ref || null,
	        type: type
	    };
	    if (!noNormalise) {
	        normalize(vNode);
	    }
	    if (options.createVNode) {
	        options.createVNode(vNode);
	    }
	    return vNode;
	}
	function cloneVNode(vNodeToClone, props) {
	    var _children = [], len = arguments.length - 2;
	    while ( len-- > 0 ) _children[ len ] = arguments[ len + 2 ];
	
	    var children = _children;
	    if (_children.length > 0 && !isNull(_children[0])) {
	        if (!props) {
	            props = {};
	        }
	        if (_children.length === 1) {
	            children = _children[0];
	        }
	        if (isUndefined(props.children)) {
	            props.children = children;
	        }
	        else {
	            if (isArray(children)) {
	                if (isArray(props.children)) {
	                    props.children = props.children.concat(children);
	                }
	                else {
	                    props.children = [props.children].concat(children);
	                }
	            }
	            else {
	                if (isArray(props.children)) {
	                    props.children.push(children);
	                }
	                else {
	                    props.children = [props.children];
	                    props.children.push(children);
	                }
	            }
	        }
	    }
	    children = null;
	    var newVNode;
	    if (isArray(vNodeToClone)) {
	        var tmpArray = [];
	        for (var i = 0; i < vNodeToClone.length; i++) {
	            tmpArray.push(cloneVNode(vNodeToClone[i]));
	        }
	        newVNode = tmpArray;
	    }
	    else {
	        var flags = vNodeToClone.flags;
	        var events = vNodeToClone.events || (props && props.events) || null;
	        var key = !isNullOrUndef(vNodeToClone.key) ? vNodeToClone.key : (props ? props.key : null);
	        var ref = vNodeToClone.ref || (props ? props.ref : null);
	        if (flags & 28 /* Component */) {
	            newVNode = createVNode(flags, vNodeToClone.type, Object.assign({}, vNodeToClone.props, props), null, events, key, ref, true);
	            var newProps = newVNode.props;
	            if (newProps) {
	                var newChildren = newProps.children;
	                // we need to also clone component children that are in props
	                // as the children may also have been hoisted
	                if (newChildren) {
	                    if (isArray(newChildren)) {
	                        for (var i$1 = 0; i$1 < newChildren.length; i$1++) {
	                            var child = newChildren[i$1];
	                            if (!isInvalid(child) && isVNode(child)) {
	                                newProps.children[i$1] = cloneVNode(child);
	                            }
	                        }
	                    }
	                    else if (isVNode(newChildren)) {
	                        newProps.children = cloneVNode(newChildren);
	                    }
	                }
	            }
	            newVNode.children = null;
	        }
	        else if (flags & 3970 /* Element */) {
	            children = (props && props.children) || vNodeToClone.children;
	            newVNode = createVNode(flags, vNodeToClone.type, Object.assign({}, vNodeToClone.props, props), children, events, key, ref, !children);
	        }
	        else if (flags & 1 /* Text */) {
	            newVNode = createTextVNode(vNodeToClone.children);
	        }
	    }
	    return newVNode;
	}
	function createVoidVNode() {
	    return createVNode(4096 /* Void */);
	}
	function createTextVNode(text) {
	    return createVNode(1 /* Text */, null, null, text, null, null, null, true);
	}
	function isVNode(o) {
	    return !!o.flags;
	}
	
	var Lifecycle = function Lifecycle() {
	    this.listeners = [];
	    this.fastUnmount = true;
	};
	Lifecycle.prototype.addListener = function addListener (callback) {
	    this.listeners.push(callback);
	};
	Lifecycle.prototype.trigger = function trigger () {
	        var this$1 = this;
	
	    for (var i = 0; i < this.listeners.length; i++) {
	        this$1.listeners[i]();
	    }
	};
	
	function constructDefaults(string, object, value) {
	    /* eslint no-return-assign: 0 */
	    string.split(',').forEach(function (i) { return object[i] = value; });
	}
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xmlNS = 'http://www.w3.org/XML/1998/namespace';
	var svgNS = 'http://www.w3.org/2000/svg';
	var strictProps = {};
	var booleanProps = {};
	var namespaces = {};
	var isUnitlessNumber = {};
	var skipProps = {};
	var dehyphenProps = {
	    httpEquiv: 'http-equiv',
	    acceptCharset: 'accept-charset'
	};
	var probablyKebabProps = /^(accentH|arabicF|capH|font[FSVW]|glyph[NO]|horiz[AO]|panose1|renderingI|strikethrough[PT]|underline[PT]|v[AHIM]|vert[AO]|xH|alignmentB|baselineS|clip[PR]|color[IPR]|dominantB|enableB|fill[OR]|flood[COF]|imageR|letterS|lightingC|marker[EMS]|pointerE|shapeR|stop[CO]|stroke[DLMOW]|text[ADR]|unicodeB|wordS|writingM).*/;
	function kebabize(str, smallLetter, largeLetter) {
	    return (smallLetter + "-" + (largeLetter.toLowerCase()));
	}
	var delegatedProps = {};
	constructDefaults('xlink:href,xlink:arcrole,xlink:actuate,xlink:role,xlink:titlef,xlink:type', namespaces, xlinkNS);
	constructDefaults('xml:base,xml:lang,xml:space', namespaces, xmlNS);
	constructDefaults('volume,defaultValue,defaultChecked', strictProps, true);
	constructDefaults('children,ref,key,selected,checked,value,multiple', skipProps, true);
	constructDefaults('onClick,onMouseDown,onMouseUp,onMouseMove,onSubmit,onDblClick,onKeyDown,onKeyUp,onKeyPress', delegatedProps, true);
	constructDefaults('muted,scoped,loop,open,checked,default,capture,disabled,readOnly,required,autoplay,controls,seamless,reversed,allowfullscreen,novalidate', booleanProps, true);
	constructDefaults('animationIterationCount,borderImageOutset,borderImageSlice,borderImageWidth,boxFlex,boxFlexGroup,boxOrdinalGroup,columnCount,flex,flexGrow,flexPositive,flexShrink,flexNegative,flexOrder,gridRow,gridColumn,fontWeight,lineClamp,lineHeight,opacity,order,orphans,tabSize,widows,zIndex,zoom,fillOpacity,floodOpacity,stopOpacity,strokeDasharray,strokeDashoffset,strokeMiterlimit,strokeOpacity,strokeWidth,', isUnitlessNumber, true);
	
	var delegatedEvents = new Map();
	function handleEvent(name, lastEvent, nextEvent, dom) {
	    var delegatedRoots = delegatedEvents.get(name);
	    if (nextEvent) {
	        if (!delegatedRoots) {
	            delegatedRoots = { items: new Map(), count: 0, docEvent: null };
	            var docEvent = attachEventToDocument(name, delegatedRoots);
	            delegatedRoots.docEvent = docEvent;
	            delegatedEvents.set(name, delegatedRoots);
	        }
	        if (!lastEvent) {
	            delegatedRoots.count++;
	        }
	        delegatedRoots.items.set(dom, nextEvent);
	    }
	    else if (delegatedRoots) {
	        if (delegatedRoots.items.has(dom)) {
	            delegatedRoots.count--;
	            delegatedRoots.items.delete(dom);
	            if (delegatedRoots.count === 0) {
	                document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
	                delegatedEvents.delete(name);
	            }
	        }
	    }
	}
	function dispatchEvent(event, dom, items, count, eventData) {
	    var eventsToTrigger = items.get(dom);
	    if (eventsToTrigger) {
	        count--;
	        // linkEvent object
	        eventData.dom = dom;
	        if (eventsToTrigger.event) {
	            eventsToTrigger.event(eventsToTrigger.data, event);
	        }
	        else {
	            eventsToTrigger(event);
	        }
	        if (eventData.stopPropagation) {
	            return;
	        }
	    }
	    var parentDom = dom.parentNode;
	    if (count > 0 && (parentDom || parentDom === document.body)) {
	        dispatchEvent(event, parentDom, items, count, eventData);
	    }
	}
	function normalizeEventName(name) {
	    return name.substr(2).toLowerCase();
	}
	function attachEventToDocument(name, delegatedRoots) {
	    var docEvent = function (event) {
	        var eventData = {
	            stopPropagation: false,
	            dom: document
	        };
	        // we have to do this as some browsers recycle the same Event between calls
	        // so we need to make the property configurable
	        Object.defineProperty(event, 'currentTarget', {
	            configurable: true,
	            get: function get() {
	                return eventData.dom;
	            }
	        });
	        event.stopPropagation = function () {
	            eventData.stopPropagation = true;
	        };
	        var count = delegatedRoots.count;
	        if (count > 0) {
	            dispatchEvent(event, event.target, delegatedRoots.items, count, eventData);
	        }
	    };
	    document.addEventListener(normalizeEventName(name), docEvent);
	    return docEvent;
	}
	
	function isCheckedType(type) {
	    return type === 'checkbox' || type === 'radio';
	}
	function isControlled(props) {
	    var usesChecked = isCheckedType(props.type);
	    return usesChecked ? !isNullOrUndef(props.checked) : !isNullOrUndef(props.value);
	}
	function onTextInputChange(e) {
	    var vNode = this.vNode;
	    var events = vNode.events || EMPTY_OBJ;
	    var dom = vNode.dom;
	    if (events.onInput) {
	        var event = events.onInput;
	        if (event.event) {
	            event.event(event.data, e);
	        }
	        else {
	            event(e);
	        }
	    }
	    else if (events.oninput) {
	        events.oninput(e);
	    }
	    // the user may have updated the vNode from the above onInput events
	    // so we need to get it from the context of `this` again
	    applyValue(this.vNode, dom);
	}
	function wrappedOnChange(e) {
	    var vNode = this.vNode;
	    var events = vNode.events || EMPTY_OBJ;
	    var event = events.onChange;
	    if (event.event) {
	        event.event(event.data, e);
	    }
	    else {
	        event(e);
	    }
	}
	function onCheckboxChange(e) {
	    var vNode = this.vNode;
	    var events = vNode.events || EMPTY_OBJ;
	    var dom = vNode.dom;
	    if (events.onClick) {
	        var event = events.onClick;
	        if (event.event) {
	            event.event(event.data, e);
	        }
	        else {
	            event(e);
	        }
	    }
	    else if (events.onclick) {
	        events.onclick(e);
	    }
	    // the user may have updated the vNode from the above onClick events
	    // so we need to get it from the context of `this` again
	    applyValue(this.vNode, dom);
	}
	function handleAssociatedRadioInputs(name) {
	    var inputs = document.querySelectorAll(("input[type=\"radio\"][name=\"" + name + "\"]"));
	    [].forEach.call(inputs, function (dom) {
	        var inputWrapper = wrappers.get(dom);
	        if (inputWrapper) {
	            var props = inputWrapper.vNode.props;
	            if (props) {
	                dom.checked = inputWrapper.vNode.props.checked;
	            }
	        }
	    });
	}
	function processInput(vNode, dom) {
	    var props = vNode.props || EMPTY_OBJ;
	    applyValue(vNode, dom);
	    if (isControlled(props)) {
	        var inputWrapper = wrappers.get(dom);
	        if (!inputWrapper) {
	            inputWrapper = {
	                vNode: vNode
	            };
	            if (isCheckedType(props.type)) {
	                dom.onclick = onCheckboxChange.bind(inputWrapper);
	                dom.onclick.wrapped = true;
	            }
	            else {
	                dom.oninput = onTextInputChange.bind(inputWrapper);
	                dom.oninput.wrapped = true;
	            }
	            if (props.onChange) {
	                dom.onchange = wrappedOnChange.bind(inputWrapper);
	                dom.onchange.wrapped = true;
	            }
	            wrappers.set(dom, inputWrapper);
	        }
	        inputWrapper.vNode = vNode;
	    }
	}
	function applyValue(vNode, dom) {
	    var props = vNode.props || EMPTY_OBJ;
	    var type = props.type;
	    var value = props.value;
	    var checked = props.checked;
	    var multiple = props.multiple;
	    if (type && type !== dom.type) {
	        dom.type = type;
	    }
	    if (multiple && multiple !== dom.multiple) {
	        dom.multiple = multiple;
	    }
	    if (isCheckedType(type)) {
	        if (!isNullOrUndef(value)) {
	            dom.value = value;
	        }
	        dom.checked = checked;
	        if (type === 'radio' && props.name) {
	            handleAssociatedRadioInputs(props.name);
	        }
	    }
	    else {
	        if (!isNullOrUndef(value) && dom.value !== value) {
	            dom.value = value;
	        }
	        else if (!isNullOrUndef(checked)) {
	            dom.checked = checked;
	        }
	    }
	}
	
	function isControlled$1(props) {
	    return !isNullOrUndef(props.value);
	}
	function updateChildOptionGroup(vNode, value) {
	    var type = vNode.type;
	    if (type === 'optgroup') {
	        var children = vNode.children;
	        if (isArray(children)) {
	            for (var i = 0; i < children.length; i++) {
	                updateChildOption(children[i], value);
	            }
	        }
	        else if (isVNode(children)) {
	            updateChildOption(children, value);
	        }
	    }
	    else {
	        updateChildOption(vNode, value);
	    }
	}
	function updateChildOption(vNode, value) {
	    var props = vNode.props || EMPTY_OBJ;
	    var dom = vNode.dom;
	    // we do this as multiple may have changed
	    dom.value = props.value;
	    if ((isArray(value) && value.indexOf(props.value) !== -1) || props.value === value) {
	        dom.selected = true;
	    }
	    else {
	        dom.selected = props.selected || false;
	    }
	}
	function onSelectChange(e) {
	    var vNode = this.vNode;
	    var events = vNode.events || EMPTY_OBJ;
	    var dom = vNode.dom;
	    if (events.onChange) {
	        var event = events.onChange;
	        if (event.event) {
	            event.event(event.data, e);
	        }
	        else {
	            event(e);
	        }
	    }
	    else if (events.onchange) {
	        events.onchange(e);
	    }
	    // the user may have updated the vNode from the above onChange events
	    // so we need to get it from the context of `this` again
	    applyValue$1(this.vNode, dom);
	}
	function processSelect(vNode, dom) {
	    var props = vNode.props || EMPTY_OBJ;
	    applyValue$1(vNode, dom);
	    if (isControlled$1(props)) {
	        var selectWrapper = wrappers.get(dom);
	        if (!selectWrapper) {
	            selectWrapper = {
	                vNode: vNode
	            };
	            dom.onchange = onSelectChange.bind(selectWrapper);
	            dom.onchange.wrapped = true;
	            wrappers.set(dom, selectWrapper);
	        }
	        selectWrapper.vNode = vNode;
	    }
	}
	function applyValue$1(vNode, dom) {
	    var props = vNode.props || EMPTY_OBJ;
	    if (props.multiple !== dom.multiple) {
	        dom.multiple = props.multiple;
	    }
	    var children = vNode.children;
	    var value = props.value;
	    if (isArray(children)) {
	        for (var i = 0; i < children.length; i++) {
	            updateChildOptionGroup(children[i], value);
	        }
	    }
	    else if (isVNode(children)) {
	        updateChildOptionGroup(children, value);
	    }
	}
	
	function isControlled$2(props) {
	    return !isNullOrUndef(props.value);
	}
	function wrappedOnChange$1(e) {
	    var vNode = this.vNode;
	    var events = vNode.events || EMPTY_OBJ;
	    var event = events.onChange;
	    if (event.event) {
	        event.event(event.data, e);
	    }
	    else {
	        event(e);
	    }
	}
	function onTextareaInputChange(e) {
	    var vNode = this.vNode;
	    var events = vNode.events || EMPTY_OBJ;
	    var dom = vNode.dom;
	    if (events.onInput) {
	        var event = events.onInput;
	        if (event.event) {
	            event.event(event.data, e);
	        }
	        else {
	            event(e);
	        }
	    }
	    else if (events.oninput) {
	        events.oninput(e);
	    }
	    // the user may have updated the vNode from the above onInput events
	    // so we need to get it from the context of `this` again
	    applyValue$2(this.vNode, dom);
	}
	function processTextarea(vNode, dom) {
	    var props = vNode.props || EMPTY_OBJ;
	    applyValue$2(vNode, dom);
	    var textareaWrapper = wrappers.get(dom);
	    if (isControlled$2(props)) {
	        if (!textareaWrapper) {
	            textareaWrapper = {
	                vNode: vNode
	            };
	            dom.oninput = onTextareaInputChange.bind(textareaWrapper);
	            dom.oninput.wrapped = true;
	            if (props.onChange) {
	                dom.onchange = wrappedOnChange$1.bind(textareaWrapper);
	                dom.onchange.wrapped = true;
	            }
	            wrappers.set(dom, textareaWrapper);
	        }
	        textareaWrapper.vNode = vNode;
	    }
	}
	function applyValue$2(vNode, dom) {
	    var props = vNode.props || EMPTY_OBJ;
	    var value = props.value;
	    if (dom.value !== value) {
	        if (!isNullOrUndef(value)) {
	            dom.value = value;
	        }
	    }
	}
	
	var wrappers = new Map();
	function processElement(flags, vNode, dom) {
	    if (flags & 512 /* InputElement */) {
	        processInput(vNode, dom);
	    }
	    else if (flags & 2048 /* SelectElement */) {
	        processSelect(vNode, dom);
	    }
	    else if (flags & 1024 /* TextareaElement */) {
	        processTextarea(vNode, dom);
	    }
	}
	
	function unmount(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
	    var flags = vNode.flags;
	    if (flags & 28 /* Component */) {
	        unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling);
	    }
	    else if (flags & 3970 /* Element */) {
	        unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling);
	    }
	    else if (flags & (1 /* Text */ | 4096 /* Void */)) {
	        unmountVoidOrText(vNode, parentDom);
	    }
	}
	function unmountVoidOrText(vNode, parentDom) {
	    if (parentDom) {
	        removeChild(parentDom, vNode.dom);
	    }
	}
	var alreadyUnmounted = new WeakMap();
	function unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
	    var instance = vNode.children;
	    var flags = vNode.flags;
	    var isStatefulComponent$$1 = flags & 4;
	    var ref = vNode.ref;
	    var dom = vNode.dom;
	    if (alreadyUnmounted.has(vNode) && !isRecycling && !parentDom) {
	        return;
	    }
	    alreadyUnmounted.set(vNode);
	    if (!isRecycling) {
	        if (isStatefulComponent$$1) {
	            if (!instance._unmounted) {
	                instance._ignoreSetState = true;
	                options.beforeUnmount && options.beforeUnmount(vNode);
	                instance.componentWillUnmount && instance.componentWillUnmount();
	                if (ref && !isRecycling) {
	                    ref(null);
	                }
	                instance._unmounted = true;
	                options.findDOMNodeEnabled && componentToDOMNodeMap.delete(instance);
	                var subLifecycle = instance._lifecycle;
	                if (!subLifecycle.fastUnmount) {
	                    unmount(instance._lastInput, null, subLifecycle, false, isRecycling);
	                }
	            }
	        }
	        else {
	            if (!isNullOrUndef(ref)) {
	                if (!isNullOrUndef(ref.onComponentWillUnmount)) {
	                    ref.onComponentWillUnmount(dom);
	                }
	            }
	            if (!lifecycle.fastUnmount) {
	                unmount(instance, null, lifecycle, false, isRecycling);
	            }
	        }
	    }
	    if (parentDom) {
	        var lastInput = instance._lastInput;
	        if (isNullOrUndef(lastInput)) {
	            lastInput = instance;
	        }
	        removeChild(parentDom, dom);
	    }
	    if (options.recyclingEnabled && !isStatefulComponent$$1 && (parentDom || canRecycle)) {
	        poolComponent(vNode);
	    }
	}
	function unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
	    var dom = vNode.dom;
	    var ref = vNode.ref;
	    var events = vNode.events;
	    if (alreadyUnmounted.has(vNode) && !isRecycling && !parentDom) {
	        return;
	    }
	    alreadyUnmounted.set(vNode);
	    if (!lifecycle.fastUnmount) {
	        if (ref && !isRecycling) {
	            unmountRef(ref);
	        }
	        var children = vNode.children;
	        if (!isNullOrUndef(children)) {
	            unmountChildren$1(children, lifecycle, isRecycling);
	        }
	    }
	    if (!isNull(events)) {
	        for (var name in events) {
	            // do not add a hasOwnProperty check here, it affects performance
	            patchEvent(name, events[name], null, dom, lifecycle);
	            events[name] = null;
	        }
	    }
	    if (parentDom) {
	        removeChild(parentDom, dom);
	    }
	    if (options.recyclingEnabled && (parentDom || canRecycle)) {
	        poolElement(vNode);
	    }
	}
	function unmountChildren$1(children, lifecycle, isRecycling) {
	    if (isArray(children)) {
	        for (var i = 0; i < children.length; i++) {
	            var child = children[i];
	            if (!isInvalid(child) && isObject(child)) {
	                unmount(child, null, lifecycle, false, isRecycling);
	            }
	        }
	    }
	    else if (isObject(children)) {
	        unmount(children, null, lifecycle, false, isRecycling);
	    }
	}
	function unmountRef(ref) {
	    if (isFunction(ref)) {
	        ref(null);
	    }
	    else {
	        if (isInvalid(ref)) {
	            return;
	        }
	        if (false) {
	            throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
	        }
	        throwError();
	    }
	}
	
	function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
	    if (lastVNode !== nextVNode) {
	        var lastFlags = lastVNode.flags;
	        var nextFlags = nextVNode.flags;
	        if (nextFlags & 28 /* Component */) {
	            if (lastFlags & 28 /* Component */) {
	                patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */, isRecycling);
	            }
	            else {
	                replaceVNode(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */), lastVNode, lifecycle, isRecycling);
	            }
	        }
	        else if (nextFlags & 3970 /* Element */) {
	            if (lastFlags & 3970 /* Element */) {
	                patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	            }
	            else {
	                replaceVNode(parentDom, mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode, lifecycle, isRecycling);
	            }
	        }
	        else if (nextFlags & 1 /* Text */) {
	            if (lastFlags & 1 /* Text */) {
	                patchText(lastVNode, nextVNode);
	            }
	            else {
	                replaceVNode(parentDom, mountText(nextVNode, null), lastVNode, lifecycle, isRecycling);
	            }
	        }
	        else if (nextFlags & 4096 /* Void */) {
	            if (lastFlags & 4096 /* Void */) {
	                patchVoid(lastVNode, nextVNode);
	            }
	            else {
	                replaceVNode(parentDom, mountVoid(nextVNode, null), lastVNode, lifecycle, isRecycling);
	            }
	        }
	        else {
	            // Error case: mount new one replacing old one
	            replaceLastChildAndUnmount(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	        }
	    }
	}
	function unmountChildren(children, dom, lifecycle, isRecycling) {
	    if (isVNode(children)) {
	        unmount(children, dom, lifecycle, true, isRecycling);
	    }
	    else if (isArray(children)) {
	        removeAllChildren(dom, children, lifecycle, isRecycling);
	    }
	    else {
	        dom.textContent = '';
	    }
	}
	function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
	    var nextTag = nextVNode.type;
	    var lastTag = lastVNode.type;
	    if (lastTag !== nextTag) {
	        replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	    }
	    else {
	        var dom = lastVNode.dom;
	        var lastProps = lastVNode.props;
	        var nextProps = nextVNode.props;
	        var lastChildren = lastVNode.children;
	        var nextChildren = nextVNode.children;
	        var lastFlags = lastVNode.flags;
	        var nextFlags = nextVNode.flags;
	        var lastRef = lastVNode.ref;
	        var nextRef = nextVNode.ref;
	        var lastEvents = lastVNode.events;
	        var nextEvents = nextVNode.events;
	        nextVNode.dom = dom;
	        if (isSVG || (nextFlags & 128 /* SvgElement */)) {
	            isSVG = true;
	        }
	        if (lastChildren !== nextChildren) {
	            patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
	        }
	        if (!(nextFlags & 2 /* HtmlElement */)) {
	            processElement(nextFlags, nextVNode, dom);
	        }
	        if (lastProps !== nextProps) {
	            patchProps(lastProps, nextProps, dom, lifecycle, context, isSVG);
	        }
	        if (lastEvents !== nextEvents) {
	            patchEvents(lastEvents, nextEvents, dom, lifecycle);
	        }
	        if (nextRef) {
	            if (lastRef !== nextRef || isRecycling) {
	                mountRef(dom, nextRef, lifecycle);
	            }
	        }
	    }
	}
	function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
	    var patchArray = false;
	    var patchKeyed = false;
	    if (nextFlags & 64 /* HasNonKeyedChildren */) {
	        patchArray = true;
	    }
	    else if ((lastFlags & 32 /* HasKeyedChildren */) && (nextFlags & 32 /* HasKeyedChildren */)) {
	        patchKeyed = true;
	        patchArray = true;
	    }
	    else if (isInvalid(nextChildren)) {
	        unmountChildren(lastChildren, dom, lifecycle, isRecycling);
	    }
	    else if (isInvalid(lastChildren)) {
	        if (isStringOrNumber(nextChildren)) {
	            setTextContent(dom, nextChildren);
	        }
	        else {
	            if (isArray(nextChildren)) {
	                mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
	            }
	            else {
	                mount(nextChildren, dom, lifecycle, context, isSVG);
	            }
	        }
	    }
	    else if (isStringOrNumber(nextChildren)) {
	        if (isStringOrNumber(lastChildren)) {
	            updateTextContent(dom, nextChildren);
	        }
	        else {
	            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
	            setTextContent(dom, nextChildren);
	        }
	    }
	    else if (isArray(nextChildren)) {
	        if (isArray(lastChildren)) {
	            patchArray = true;
	            if (isKeyed(lastChildren, nextChildren)) {
	                patchKeyed = true;
	            }
	        }
	        else {
	            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
	            mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
	        }
	    }
	    else if (isArray(lastChildren)) {
	        removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
	        mount(nextChildren, dom, lifecycle, context, isSVG);
	    }
	    else if (isVNode(nextChildren)) {
	        if (isVNode(lastChildren)) {
	            patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
	        }
	        else {
	            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
	            mount(nextChildren, dom, lifecycle, context, isSVG);
	        }
	    }
	    else if (isVNode(lastChildren)) {
	    }
	    else {
	    }
	    if (patchArray) {
	        if (patchKeyed) {
	            patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
	        }
	        else {
	            patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
	        }
	    }
	}
	function patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling) {
	    var lastType = lastVNode.type;
	    var nextType = nextVNode.type;
	    var nextProps = nextVNode.props || EMPTY_OBJ;
	    var lastKey = lastVNode.key;
	    var nextKey = nextVNode.key;
	    var defaultProps = nextType.defaultProps;
	    if (!isUndefined(defaultProps)) {
	        copyPropsTo(defaultProps, nextProps);
	        nextVNode.props = nextProps;
	    }
	    if (lastType !== nextType) {
	        if (isClass) {
	            replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	        }
	        else {
	            var lastInput = lastVNode.children._lastInput || lastVNode.children;
	            var nextInput = createFunctionalComponentInput(nextVNode, nextType, nextProps, context);
	            unmount(lastVNode, null, lifecycle, false, isRecycling);
	            patch(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling);
	            var dom = nextVNode.dom = nextInput.dom;
	            nextVNode.children = nextInput;
	            mountFunctionalComponentCallbacks(nextVNode.ref, dom, lifecycle);
	        }
	    }
	    else {
	        if (isClass) {
	            if (lastKey !== nextKey) {
	                replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	                return false;
	            }
	            var instance = lastVNode.children;
	            if (instance._unmounted) {
	                if (isNull(parentDom)) {
	                    return true;
	                }
	                replaceChild(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, nextVNode.flags & 4 /* ComponentClass */), lastVNode.dom);
	            }
	            else {
	                var lastState = instance.state;
	                var nextState = instance.state;
	                var lastProps = instance.props;
	                var childContext = instance.getChildContext();
	                nextVNode.children = instance;
	                instance._isSVG = isSVG;
	                if (!isNullOrUndef(childContext)) {
	                    childContext = Object.assign({}, context, childContext);
	                }
	                else {
	                    childContext = context;
	                }
	                var lastInput$1 = instance._lastInput;
	                var nextInput$1 = instance._updateComponent(lastState, nextState, lastProps, nextProps, context, false, false);
	                var didUpdate = true;
	                instance._childContext = childContext;
	                if (isInvalid(nextInput$1)) {
	                    nextInput$1 = createVoidVNode();
	                }
	                else if (nextInput$1 === NO_OP) {
	                    nextInput$1 = lastInput$1;
	                    didUpdate = false;
	                }
	                else if (isStringOrNumber(nextInput$1)) {
	                    nextInput$1 = createTextVNode(nextInput$1);
	                }
	                else if (isArray(nextInput$1)) {
	                    if (false) {
	                        throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	                    }
	                    throwError();
	                }
	                else if (isObject(nextInput$1) && nextInput$1.dom) {
	                    nextInput$1 = cloneVNode(nextInput$1);
	                }
	                if (nextInput$1.flags & 28 /* Component */) {
	                    nextInput$1.parentVNode = nextVNode;
	                }
	                else if (lastInput$1.flags & 28 /* Component */) {
	                    lastInput$1.parentVNode = nextVNode;
	                }
	                instance._lastInput = nextInput$1;
	                instance._vNode = nextVNode;
	                if (didUpdate) {
	                    var fastUnmount = lifecycle.fastUnmount;
	                    var subLifecycle = instance._lifecycle;
	                    lifecycle.fastUnmount = subLifecycle.fastUnmount;
	                    patch(lastInput$1, nextInput$1, parentDom, lifecycle, childContext, isSVG, isRecycling);
	                    subLifecycle.fastUnmount = lifecycle.fastUnmount;
	                    lifecycle.fastUnmount = fastUnmount;
	                    instance.componentDidUpdate(lastProps, lastState);
	                    options.afterUpdate && options.afterUpdate(nextVNode);
	                    options.findDOMNodeEnabled && componentToDOMNodeMap.set(instance, nextInput$1.dom);
	                }
	                nextVNode.dom = nextInput$1.dom;
	            }
	        }
	        else {
	            var shouldUpdate = true;
	            var lastProps$1 = lastVNode.props;
	            var nextHooks = nextVNode.ref;
	            var nextHooksDefined = !isNullOrUndef(nextHooks);
	            var lastInput$2 = lastVNode.children;
	            var nextInput$2 = lastInput$2;
	            nextVNode.dom = lastVNode.dom;
	            nextVNode.children = lastInput$2;
	            if (lastKey !== nextKey) {
	                shouldUpdate = true;
	            }
	            else {
	                if (nextHooksDefined && !isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
	                    shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps$1, nextProps);
	                }
	            }
	            if (shouldUpdate !== false) {
	                if (nextHooksDefined && !isNullOrUndef(nextHooks.onComponentWillUpdate)) {
	                    nextHooks.onComponentWillUpdate(lastProps$1, nextProps);
	                }
	                nextInput$2 = nextType(nextProps, context);
	                if (isInvalid(nextInput$2)) {
	                    nextInput$2 = createVoidVNode();
	                }
	                else if (isStringOrNumber(nextInput$2) && nextInput$2 !== NO_OP) {
	                    nextInput$2 = createTextVNode(nextInput$2);
	                }
	                else if (isArray(nextInput$2)) {
	                    if (false) {
	                        throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	                    }
	                    throwError();
	                }
	                else if (isObject(nextInput$2) && nextInput$2.dom) {
	                    nextInput$2 = cloneVNode(nextInput$2);
	                }
	                if (nextInput$2 !== NO_OP) {
	                    patch(lastInput$2, nextInput$2, parentDom, lifecycle, context, isSVG, isRecycling);
	                    nextVNode.children = nextInput$2;
	                    if (nextHooksDefined && !isNullOrUndef(nextHooks.onComponentDidUpdate)) {
	                        nextHooks.onComponentDidUpdate(lastProps$1, nextProps);
	                    }
	                    nextVNode.dom = nextInput$2.dom;
	                }
	            }
	            if (nextInput$2.flags & 28 /* Component */) {
	                nextInput$2.parentVNode = nextVNode;
	            }
	            else if (lastInput$2.flags & 28 /* Component */) {
	                lastInput$2.parentVNode = nextVNode;
	            }
	        }
	    }
	    return false;
	}
	function patchText(lastVNode, nextVNode) {
	    var nextText = nextVNode.children;
	    var dom = lastVNode.dom;
	    nextVNode.dom = dom;
	    if (lastVNode.children !== nextText) {
	        dom.nodeValue = nextText;
	    }
	}
	function patchVoid(lastVNode, nextVNode) {
	    nextVNode.dom = lastVNode.dom;
	}
	function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
	    var lastChildrenLength = lastChildren.length;
	    var nextChildrenLength = nextChildren.length;
	    var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
	    var i = 0;
	    for (; i < commonLength; i++) {
	        var nextChild = nextChildren[i];
	        if (nextChild.dom) {
	            nextChild = nextChildren[i] = cloneVNode(nextChild);
	        }
	        patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG, isRecycling);
	    }
	    if (lastChildrenLength < nextChildrenLength) {
	        for (i = commonLength; i < nextChildrenLength; i++) {
	            var nextChild$1 = nextChildren[i];
	            if (nextChild$1.dom) {
	                nextChild$1 = nextChildren[i] = cloneVNode(nextChild$1);
	            }
	            appendChild(dom, mount(nextChild$1, null, lifecycle, context, isSVG));
	        }
	    }
	    else if (nextChildrenLength === 0) {
	        removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
	    }
	    else if (lastChildrenLength > nextChildrenLength) {
	        for (i = commonLength; i < lastChildrenLength; i++) {
	            unmount(lastChildren[i], dom, lifecycle, false, isRecycling);
	        }
	    }
	}
	function patchKeyedChildren(a, b, dom, lifecycle, context, isSVG, isRecycling) {
	    var aLength = a.length;
	    var bLength = b.length;
	    var aEnd = aLength - 1;
	    var bEnd = bLength - 1;
	    var aStart = 0;
	    var bStart = 0;
	    var i;
	    var j;
	    var aNode;
	    var bNode;
	    var nextNode;
	    var nextPos;
	    var node;
	    if (aLength === 0) {
	        if (bLength !== 0) {
	            mountArrayChildren(b, dom, lifecycle, context, isSVG);
	        }
	        return;
	    }
	    else if (bLength === 0) {
	        removeAllChildren(dom, a, lifecycle, isRecycling);
	        return;
	    }
	    var aStartNode = a[aStart];
	    var bStartNode = b[bStart];
	    var aEndNode = a[aEnd];
	    var bEndNode = b[bEnd];
	    if (bStartNode.dom) {
	        b[bStart] = bStartNode = cloneVNode(bStartNode);
	    }
	    if (bEndNode.dom) {
	        b[bEnd] = bEndNode = cloneVNode(bEndNode);
	    }
	    // Step 1
	    /* eslint no-constant-condition: 0 */
	    outer: while (true) {
	        // Sync nodes with the same key at the beginning.
	        while (aStartNode.key === bStartNode.key) {
	            patch(aStartNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
	            aStart++;
	            bStart++;
	            if (aStart > aEnd || bStart > bEnd) {
	                break outer;
	            }
	            aStartNode = a[aStart];
	            bStartNode = b[bStart];
	            if (bStartNode.dom) {
	                b[bStart] = bStartNode = cloneVNode(bStartNode);
	            }
	        }
	        // Sync nodes with the same key at the end.
	        while (aEndNode.key === bEndNode.key) {
	            patch(aEndNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
	            aEnd--;
	            bEnd--;
	            if (aStart > aEnd || bStart > bEnd) {
	                break outer;
	            }
	            aEndNode = a[aEnd];
	            bEndNode = b[bEnd];
	            if (bEndNode.dom) {
	                b[bEnd] = bEndNode = cloneVNode(bEndNode);
	            }
	        }
	        // Move and sync nodes from right to left.
	        if (aEndNode.key === bStartNode.key) {
	            patch(aEndNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
	            insertOrAppend(dom, bStartNode.dom, aStartNode.dom);
	            aEnd--;
	            bStart++;
	            aEndNode = a[aEnd];
	            bStartNode = b[bStart];
	            if (bStartNode.dom) {
	                b[bStart] = bStartNode = cloneVNode(bStartNode);
	            }
	            continue;
	        }
	        // Move and sync nodes from left to right.
	        if (aStartNode.key === bEndNode.key) {
	            patch(aStartNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
	            nextPos = bEnd + 1;
	            nextNode = nextPos < b.length ? b[nextPos].dom : null;
	            insertOrAppend(dom, bEndNode.dom, nextNode);
	            aStart++;
	            bEnd--;
	            aStartNode = a[aStart];
	            bEndNode = b[bEnd];
	            if (bEndNode.dom) {
	                b[bEnd] = bEndNode = cloneVNode(bEndNode);
	            }
	            continue;
	        }
	        break;
	    }
	    if (aStart > aEnd) {
	        if (bStart <= bEnd) {
	            nextPos = bEnd + 1;
	            nextNode = nextPos < b.length ? b[nextPos].dom : null;
	            while (bStart <= bEnd) {
	                node = b[bStart];
	                if (node.dom) {
	                    b[bStart] = node = cloneVNode(node);
	                }
	                bStart++;
	                insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextNode);
	            }
	        }
	    }
	    else if (bStart > bEnd) {
	        while (aStart <= aEnd) {
	            unmount(a[aStart++], dom, lifecycle, false, isRecycling);
	        }
	    }
	    else {
	        aLength = aEnd - aStart + 1;
	        bLength = bEnd - bStart + 1;
	        var aNullable = a;
	        var sources = new Array(bLength);
	        // Mark all nodes as inserted.
	        for (i = 0; i < bLength; i++) {
	            sources[i] = -1;
	        }
	        var moved = false;
	        var pos = 0;
	        var patched = 0;
	        if ((bLength <= 4) || (aLength * bLength <= 16)) {
	            for (i = aStart; i <= aEnd; i++) {
	                aNode = a[i];
	                if (patched < bLength) {
	                    for (j = bStart; j <= bEnd; j++) {
	                        bNode = b[j];
	                        if (aNode.key === bNode.key) {
	                            sources[j - bStart] = i;
	                            if (pos > j) {
	                                moved = true;
	                            }
	                            else {
	                                pos = j;
	                            }
	                            if (bNode.dom) {
	                                b[j] = bNode = cloneVNode(bNode);
	                            }
	                            patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
	                            patched++;
	                            aNullable[i] = null;
	                            break;
	                        }
	                    }
	                }
	            }
	        }
	        else {
	            var keyIndex = new Map();
	            for (i = bStart; i <= bEnd; i++) {
	                node = b[i];
	                keyIndex.set(node.key, i);
	            }
	            for (i = aStart; i <= aEnd; i++) {
	                aNode = a[i];
	                if (patched < bLength) {
	                    j = keyIndex.get(aNode.key);
	                    if (!isUndefined(j)) {
	                        bNode = b[j];
	                        sources[j - bStart] = i;
	                        if (pos > j) {
	                            moved = true;
	                        }
	                        else {
	                            pos = j;
	                        }
	                        if (bNode.dom) {
	                            b[j] = bNode = cloneVNode(bNode);
	                        }
	                        patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
	                        patched++;
	                        aNullable[i] = null;
	                    }
	                }
	            }
	        }
	        if (aLength === a.length && patched === 0) {
	            removeAllChildren(dom, a, lifecycle, isRecycling);
	            while (bStart < bLength) {
	                node = b[bStart];
	                if (node.dom) {
	                    b[bStart] = node = cloneVNode(node);
	                }
	                bStart++;
	                insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), null);
	            }
	        }
	        else {
	            i = aLength - patched;
	            while (i > 0) {
	                aNode = aNullable[aStart++];
	                if (!isNull(aNode)) {
	                    unmount(aNode, dom, lifecycle, true, isRecycling);
	                    i--;
	                }
	            }
	            if (moved) {
	                var seq = lis_algorithm(sources);
	                j = seq.length - 1;
	                for (i = bLength - 1; i >= 0; i--) {
	                    if (sources[i] === -1) {
	                        pos = i + bStart;
	                        node = b[pos];
	                        if (node.dom) {
	                            b[pos] = node = cloneVNode(node);
	                        }
	                        nextPos = pos + 1;
	                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
	                        insertOrAppend(dom, mount(node, dom, lifecycle, context, isSVG), nextNode);
	                    }
	                    else {
	                        if (j < 0 || i !== seq[j]) {
	                            pos = i + bStart;
	                            node = b[pos];
	                            nextPos = pos + 1;
	                            nextNode = nextPos < b.length ? b[nextPos].dom : null;
	                            insertOrAppend(dom, node.dom, nextNode);
	                        }
	                        else {
	                            j--;
	                        }
	                    }
	                }
	            }
	            else if (patched !== bLength) {
	                for (i = bLength - 1; i >= 0; i--) {
	                    if (sources[i] === -1) {
	                        pos = i + bStart;
	                        node = b[pos];
	                        if (node.dom) {
	                            b[pos] = node = cloneVNode(node);
	                        }
	                        nextPos = pos + 1;
	                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
	                        insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextNode);
	                    }
	                }
	            }
	        }
	    }
	}
	// // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
	function lis_algorithm(a) {
	    var p = a.slice(0);
	    var result = [];
	    result.push(0);
	    var i;
	    var j;
	    var u;
	    var v;
	    var c;
	    for (i = 0; i < a.length; i++) {
	        if (a[i] === -1) {
	            continue;
	        }
	        j = result[result.length - 1];
	        if (a[j] < a[i]) {
	            p[i] = j;
	            result.push(i);
	            continue;
	        }
	        u = 0;
	        v = result.length - 1;
	        while (u < v) {
	            c = ((u + v) / 2) | 0;
	            if (a[result[c]] < a[i]) {
	                u = c + 1;
	            }
	            else {
	                v = c;
	            }
	        }
	        if (a[i] < a[result[u]]) {
	            if (u > 0) {
	                p[i] = result[u - 1];
	            }
	            result[u] = i;
	        }
	    }
	    u = result.length;
	    v = result[u - 1];
	    while (u-- > 0) {
	        result[u] = v;
	        v = p[v];
	    }
	    return result;
	}
	function patchProp(prop, lastValue, nextValue, dom, isSVG, lifecycle) {
	    if (skipProps[prop]) {
	        return;
	    }
	    if (booleanProps[prop]) {
	        dom[prop] = nextValue ? true : false;
	    }
	    else if (strictProps[prop]) {
	        var value = isNullOrUndef(nextValue) ? '' : nextValue;
	        if (dom[prop] !== value) {
	            dom[prop] = value;
	        }
	    }
	    else if (lastValue !== nextValue) {
	        if (isAttrAnEvent(prop)) {
	            patchEvent(prop, lastValue, nextValue, dom, lifecycle);
	        }
	        else if (isNullOrUndef(nextValue)) {
	            dom.removeAttribute(prop);
	        }
	        else if (prop === 'className') {
	            if (isSVG) {
	                dom.setAttribute('class', nextValue);
	            }
	            else {
	                dom.className = nextValue;
	            }
	        }
	        else if (prop === 'style') {
	            patchStyle(lastValue, nextValue, dom);
	        }
	        else if (prop === 'dangerouslySetInnerHTML') {
	            var lastHtml = lastValue && lastValue.__html;
	            var nextHtml = nextValue && nextValue.__html;
	            if (lastHtml !== nextHtml) {
	                if (!isNullOrUndef(nextHtml)) {
	                    dom.innerHTML = nextHtml;
	                }
	            }
	        }
	        else if (prop !== 'childrenType' && prop !== 'ref' && prop !== 'key') {
	            var dehyphenProp;
	            if (dehyphenProps[prop]) {
	                dehyphenProp = dehyphenProps[prop];
	            }
	            else if (isSVG && prop.match(probablyKebabProps)) {
	                dehyphenProp = prop.replace(/([a-z])([A-Z]|1)/g, kebabize);
	                dehyphenProps[prop] = dehyphenProp;
	            }
	            else {
	                dehyphenProp = prop;
	            }
	            var ns = namespaces[prop];
	            if (ns) {
	                dom.setAttributeNS(ns, dehyphenProp, nextValue);
	            }
	            else {
	                dom.setAttribute(dehyphenProp, nextValue);
	            }
	        }
	    }
	}
	function patchEvents(lastEvents, nextEvents, dom, lifecycle) {
	    lastEvents = lastEvents || EMPTY_OBJ;
	    nextEvents = nextEvents || EMPTY_OBJ;
	    if (nextEvents !== EMPTY_OBJ) {
	        for (var name in nextEvents) {
	            // do not add a hasOwnProperty check here, it affects performance
	            patchEvent(name, lastEvents[name], nextEvents[name], dom, lifecycle);
	        }
	    }
	    if (lastEvents !== EMPTY_OBJ) {
	        for (var name$1 in lastEvents) {
	            // do not add a hasOwnProperty check here, it affects performance
	            if (isNullOrUndef(nextEvents[name$1])) {
	                patchEvent(name$1, lastEvents[name$1], null, dom, lifecycle);
	            }
	        }
	    }
	}
	function patchEvent(name, lastValue, nextValue, dom, lifecycle) {
	    if (lastValue !== nextValue) {
	        var nameLowerCase = name.toLowerCase();
	        var domEvent = dom[nameLowerCase];
	        // if the function is wrapped, that means it's been controlled by a wrapper
	        if (domEvent && domEvent.wrapped) {
	            return;
	        }
	        if (delegatedProps[name]) {
	            handleEvent(name, lastValue, nextValue, dom);
	        }
	        else {
	            if (lastValue !== nextValue) {
	                if (!isFunction(nextValue) && !isNullOrUndef(nextValue)) {
	                    var linkEvent = nextValue.event;
	                    if (linkEvent && isFunction(linkEvent)) {
	                        if (!dom._data) {
	                            dom[nameLowerCase] = function (e) {
	                                linkEvent(e.currentTarget._data, e);
	                            };
	                        }
	                        dom._data = nextValue.data;
	                    }
	                    else {
	                        if (false) {
	                            throwError(("an event on a VNode \"" + name + "\". was not a function or a valid linkEvent."));
	                        }
	                        throwError();
	                    }
	                }
	                else {
	                    dom[nameLowerCase] = nextValue;
	                }
	            }
	        }
	    }
	}
	function patchProps(lastProps, nextProps, dom, lifecycle, context, isSVG) {
	    lastProps = lastProps || EMPTY_OBJ;
	    nextProps = nextProps || EMPTY_OBJ;
	    if (nextProps !== EMPTY_OBJ) {
	        for (var prop in nextProps) {
	            // do not add a hasOwnProperty check here, it affects performance
	            var nextValue = nextProps[prop];
	            var lastValue = lastProps[prop];
	            if (isNullOrUndef(nextValue)) {
	                removeProp(prop, nextValue, dom);
	            }
	            else {
	                patchProp(prop, lastValue, nextValue, dom, isSVG, lifecycle);
	            }
	        }
	    }
	    if (lastProps !== EMPTY_OBJ) {
	        for (var prop$1 in lastProps) {
	            // do not add a hasOwnProperty check here, it affects performance
	            if (isNullOrUndef(nextProps[prop$1])) {
	                removeProp(prop$1, lastProps[prop$1], dom);
	            }
	        }
	    }
	}
	// We are assuming here that we come from patchProp routine
	// -nextAttrValue cannot be null or undefined
	function patchStyle(lastAttrValue, nextAttrValue, dom) {
	    if (isString(nextAttrValue)) {
	        dom.style.cssText = nextAttrValue;
	        return;
	    }
	    for (var style in nextAttrValue) {
	        // do not add a hasOwnProperty check here, it affects performance
	        var value = nextAttrValue[style];
	        if (isNumber(value) && !isUnitlessNumber[style]) {
	            dom.style[style] = value + 'px';
	        }
	        else {
	            dom.style[style] = value;
	        }
	    }
	    if (!isNullOrUndef(lastAttrValue)) {
	        for (var style$1 in lastAttrValue) {
	            if (isNullOrUndef(nextAttrValue[style$1])) {
	                dom.style[style$1] = '';
	            }
	        }
	    }
	}
	function removeProp(prop, lastValue, dom) {
	    if (prop === 'className') {
	        dom.removeAttribute('class');
	    }
	    else if (prop === 'value') {
	        dom.value = '';
	    }
	    else if (prop === 'style') {
	        dom.removeAttribute('style');
	    }
	    else if (isAttrAnEvent(prop)) {
	        handleEvent(name, lastValue, null, dom);
	    }
	    else {
	        dom.removeAttribute(prop);
	    }
	}
	
	var componentPools = new Map();
	var elementPools = new Map();
	function recycleElement(vNode, lifecycle, context, isSVG) {
	    var tag = vNode.type;
	    var key = vNode.key;
	    var pools = elementPools.get(tag);
	    if (!isUndefined(pools)) {
	        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
	        if (!isUndefined(pool)) {
	            var recycledVNode = pool.pop();
	            if (!isUndefined(recycledVNode)) {
	                patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
	                return vNode.dom;
	            }
	        }
	    }
	    return null;
	}
	function poolElement(vNode) {
	    var tag = vNode.type;
	    var key = vNode.key;
	    var pools = elementPools.get(tag);
	    if (isUndefined(pools)) {
	        pools = {
	            nonKeyed: [],
	            keyed: new Map()
	        };
	        elementPools.set(tag, pools);
	    }
	    if (isNull(key)) {
	        pools.nonKeyed.push(vNode);
	    }
	    else {
	        var pool = pools.keyed.get(key);
	        if (isUndefined(pool)) {
	            pool = [];
	            pools.keyed.set(key, pool);
	        }
	        pool.push(vNode);
	    }
	}
	function recycleComponent(vNode, lifecycle, context, isSVG) {
	    var type = vNode.type;
	    var key = vNode.key;
	    var pools = componentPools.get(type);
	    if (!isUndefined(pools)) {
	        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
	        if (!isUndefined(pool)) {
	            var recycledVNode = pool.pop();
	            if (!isUndefined(recycledVNode)) {
	                var flags = vNode.flags;
	                var failed = patchComponent(recycledVNode, vNode, null, lifecycle, context, isSVG, flags & 4 /* ComponentClass */, true);
	                if (!failed) {
	                    return vNode.dom;
	                }
	            }
	        }
	    }
	    return null;
	}
	function poolComponent(vNode) {
	    var type = vNode.type;
	    var key = vNode.key;
	    var hooks = vNode.ref;
	    var nonRecycleHooks = hooks && (hooks.onComponentWillMount ||
	        hooks.onComponentWillUnmount ||
	        hooks.onComponentDidMount ||
	        hooks.onComponentWillUpdate ||
	        hooks.onComponentDidUpdate);
	    if (nonRecycleHooks) {
	        return;
	    }
	    var pools = componentPools.get(type);
	    if (isUndefined(pools)) {
	        pools = {
	            nonKeyed: [],
	            keyed: new Map()
	        };
	        componentPools.set(type, pools);
	    }
	    if (isNull(key)) {
	        pools.nonKeyed.push(vNode);
	    }
	    else {
	        var pool = pools.keyed.get(key);
	        if (isUndefined(pool)) {
	            pool = [];
	            pools.keyed.set(key, pool);
	        }
	        pool.push(vNode);
	    }
	}
	
	function mount(vNode, parentDom, lifecycle, context, isSVG) {
	    var flags = vNode.flags;
	    if (flags & 3970 /* Element */) {
	        return mountElement(vNode, parentDom, lifecycle, context, isSVG);
	    }
	    else if (flags & 28 /* Component */) {
	        return mountComponent(vNode, parentDom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
	    }
	    else if (flags & 4096 /* Void */) {
	        return mountVoid(vNode, parentDom);
	    }
	    else if (flags & 1 /* Text */) {
	        return mountText(vNode, parentDom);
	    }
	    else {
	        if (false) {
	            if (typeof vNode === 'object') {
	                throwError(("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + (JSON.stringify(vNode)) + "\"."));
	            }
	            else {
	                throwError(("mount() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
	            }
	        }
	        throwError();
	    }
	}
	function mountText(vNode, parentDom) {
	    var dom = document.createTextNode(vNode.children);
	    vNode.dom = dom;
	    if (parentDom) {
	        appendChild(parentDom, dom);
	    }
	    return dom;
	}
	function mountVoid(vNode, parentDom) {
	    var dom = document.createTextNode('');
	    vNode.dom = dom;
	    if (parentDom) {
	        appendChild(parentDom, dom);
	    }
	    return dom;
	}
	function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
	    if (options.recyclingEnabled) {
	        var dom$1 = recycleElement(vNode, lifecycle, context, isSVG);
	        if (!isNull(dom$1)) {
	            if (!isNull(parentDom)) {
	                appendChild(parentDom, dom$1);
	            }
	            return dom$1;
	        }
	    }
	    var tag = vNode.type;
	    var flags = vNode.flags;
	    if (isSVG || (flags & 128 /* SvgElement */)) {
	        isSVG = true;
	    }
	    var dom = documentCreateElement(tag, isSVG);
	    var children = vNode.children;
	    var props = vNode.props;
	    var events = vNode.events;
	    var ref = vNode.ref;
	    vNode.dom = dom;
	    if (!isNull(children)) {
	        if (isStringOrNumber(children)) {
	            setTextContent(dom, children);
	        }
	        else if (isArray(children)) {
	            mountArrayChildren(children, dom, lifecycle, context, isSVG);
	        }
	        else if (isVNode(children)) {
	            mount(children, dom, lifecycle, context, isSVG);
	        }
	    }
	    if (!(flags & 2 /* HtmlElement */)) {
	        processElement(flags, vNode, dom);
	    }
	    if (!isNull(props)) {
	        for (var prop in props) {
	            // do not add a hasOwnProperty check here, it affects performance
	            patchProp(prop, null, props[prop], dom, isSVG, lifecycle);
	        }
	    }
	    if (!isNull(events)) {
	        for (var name in events) {
	            // do not add a hasOwnProperty check here, it affects performance
	            patchEvent(name, null, events[name], dom, lifecycle);
	        }
	    }
	    if (!isNull(ref)) {
	        mountRef(dom, ref, lifecycle);
	    }
	    if (!isNull(parentDom)) {
	        appendChild(parentDom, dom);
	    }
	    return dom;
	}
	function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
	    for (var i = 0; i < children.length; i++) {
	        var child = children[i];
	        if (!isInvalid(child)) {
	            if (child.dom) {
	                children[i] = child = cloneVNode(child);
	            }
	            mount(children[i], dom, lifecycle, context, isSVG);
	        }
	    }
	}
	function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
	    if (options.recyclingEnabled) {
	        var dom$1 = recycleComponent(vNode, lifecycle, context, isSVG);
	        if (!isNull(dom$1)) {
	            if (!isNull(parentDom)) {
	                appendChild(parentDom, dom$1);
	            }
	            return dom$1;
	        }
	    }
	    var type = vNode.type;
	    var props = vNode.props || EMPTY_OBJ;
	    var defaultProps = type.defaultProps;
	    var ref = vNode.ref;
	    var dom;
	    if (!isUndefined(defaultProps)) {
	        copyPropsTo(defaultProps, props);
	        vNode.props = props;
	    }
	    if (isClass) {
	        var instance = createClassComponentInstance(vNode, type, props, context, isSVG);
	        // If instance does not have componentWillUnmount specified we can enable fastUnmount
	        var input = instance._lastInput;
	        var prevFastUnmount = lifecycle.fastUnmount;
	        // we store the fastUnmount value, but we set it back to true on the lifecycle
	        // we do this so we can determine if the component render has a fastUnmount or not
	        lifecycle.fastUnmount = true;
	        instance._vNode = vNode;
	        vNode.dom = dom = mount(input, null, lifecycle, instance._childContext, isSVG);
	        // we now create a lifecycle for this component and store the fastUnmount value
	        var subLifecycle = instance._lifecycle = new Lifecycle();
	        // children lifecycle can fastUnmount if itself does need unmount callback and within its cycle there was none
	        subLifecycle.fastUnmount = isUndefined(instance.componentWillUnmount) && lifecycle.fastUnmount;
	        // higher lifecycle can fastUnmount only if previously it was able to and this children doesnt have any
	        lifecycle.fastUnmount = prevFastUnmount && subLifecycle.fastUnmount;
	        if (!isNull(parentDom)) {
	            appendChild(parentDom, dom);
	        }
	        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
	        options.findDOMNodeEnabled && componentToDOMNodeMap.set(instance, dom);
	        vNode.children = instance;
	    }
	    else {
	        var input$1 = createFunctionalComponentInput(vNode, type, props, context);
	        vNode.dom = dom = mount(input$1, null, lifecycle, context, isSVG);
	        vNode.children = input$1;
	        mountFunctionalComponentCallbacks(ref, dom, lifecycle);
	        if (!isNull(parentDom)) {
	            appendChild(parentDom, dom);
	        }
	    }
	    return dom;
	}
	function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
	    if (ref) {
	        if (isFunction(ref)) {
	            ref(instance);
	        }
	        else {
	            if (false) {
	                if (isStringOrNumber(ref)) {
	                    throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
	                }
	                else if (isObject(ref) && (vNode.flags & 4 /* ComponentClass */)) {
	                    throwError('functional component lifecycle events are not supported on ES2015 class components.');
	                }
	                else {
	                    throwError(("a bad value for \"ref\" was used on component: \"" + (JSON.stringify(ref)) + "\""));
	                }
	            }
	            throwError();
	        }
	    }
	    var cDM = instance.componentDidMount;
	    var afterMount = options.afterMount;
	    if (!isUndefined(cDM) || !isNull(afterMount)) {
	        lifecycle.addListener(function () {
	            afterMount && afterMount(vNode);
	            cDM && instance.componentDidMount();
	        });
	    }
	}
	function mountFunctionalComponentCallbacks(ref, dom, lifecycle) {
	    if (ref) {
	        if (!isNullOrUndef(ref.onComponentWillMount)) {
	            ref.onComponentWillMount();
	        }
	        if (!isNullOrUndef(ref.onComponentDidMount)) {
	            lifecycle.addListener(function () { return ref.onComponentDidMount(dom); });
	        }
	        if (!isNullOrUndef(ref.onComponentWillUnmount)) {
	            lifecycle.fastUnmount = false;
	        }
	    }
	}
	function mountRef(dom, value, lifecycle) {
	    if (isFunction(value)) {
	        lifecycle.fastUnmount = false;
	        lifecycle.addListener(function () { return value(dom); });
	    }
	    else {
	        if (isInvalid(value)) {
	            return;
	        }
	        if (false) {
	            throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
	        }
	        throwError();
	    }
	}
	
	function createClassComponentInstance(vNode, Component, props, context, isSVG) {
	    if (isUndefined(context)) {
	        context = {};
	    }
	    var instance = new Component(props, context);
	    instance.context = context;
	    if (instance.props === EMPTY_OBJ) {
	        instance.props = props;
	    }
	    instance._patch = patch;
	    if (options.findDOMNodeEnabled) {
	        instance._componentToDOMNodeMap = componentToDOMNodeMap;
	    }
	    instance._unmounted = false;
	    instance._pendingSetState = true;
	    instance._isSVG = isSVG;
	    instance.componentWillMount();
	    var childContext = instance.getChildContext();
	    if (!isNullOrUndef(childContext)) {
	        instance._childContext = Object.assign({}, context, childContext);
	    }
	    else {
	        instance._childContext = context;
	    }
	    options.beforeRender && options.beforeRender(instance);
	    var input = instance.render(props, instance.state, context);
	    options.afterRender && options.afterRender(instance);
	    if (isArray(input)) {
	        if (false) {
	            throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	        }
	        throwError();
	    }
	    else if (isInvalid(input)) {
	        input = createVoidVNode();
	    }
	    else if (isStringOrNumber(input)) {
	        input = createTextVNode(input);
	    }
	    else {
	        if (input.dom) {
	            input = cloneVNode(input);
	        }
	        if (input.flags & 28 /* Component */) {
	            // if we have an input that is also a component, we run into a tricky situation
	            // where the root vNode needs to always have the correct DOM entry
	            // so we break monomorphism on our input and supply it our vNode as parentVNode
	            // we can optimise this in the future, but this gets us out of a lot of issues
	            input.parentVNode = vNode;
	        }
	    }
	    instance._pendingSetState = false;
	    instance._lastInput = input;
	    return instance;
	}
	function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
	    replaceVNode(parentDom, mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
	}
	function replaceVNode(parentDom, dom, vNode, lifecycle, isRecycling) {
	    var shallowUnmount = false;
	    // we cannot cache nodeType here as vNode might be re-assigned below
	    if (vNode.flags & 28 /* Component */) {
	        // if we are accessing a stateful or stateless component, we want to access their last rendered input
	        // accessing their DOM node is not useful to us here
	        unmount(vNode, null, lifecycle, false, isRecycling);
	        vNode = vNode.children._lastInput || vNode.children;
	        shallowUnmount = true;
	    }
	    replaceChild(parentDom, dom, vNode.dom);
	    unmount(vNode, null, lifecycle, false, isRecycling);
	}
	function createFunctionalComponentInput(vNode, component, props, context) {
	    var input = component(props, context);
	    if (isArray(input)) {
	        if (false) {
	            throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	        }
	        throwError();
	    }
	    else if (isInvalid(input)) {
	        input = createVoidVNode();
	    }
	    else if (isStringOrNumber(input)) {
	        input = createTextVNode(input);
	    }
	    else {
	        if (input.dom) {
	            input = cloneVNode(input);
	        }
	        if (input.flags & 28 /* Component */) {
	            // if we have an input that is also a component, we run into a tricky situation
	            // where the root vNode needs to always have the correct DOM entry
	            // so we break monomorphism on our input and supply it our vNode as parentVNode
	            // we can optimise this in the future, but this gets us out of a lot of issues
	            input.parentVNode = vNode;
	        }
	    }
	    return input;
	}
	function setTextContent(dom, text) {
	    if (text !== '') {
	        dom.textContent = text;
	    }
	    else {
	        dom.appendChild(document.createTextNode(''));
	    }
	}
	function updateTextContent(dom, text) {
	    dom.firstChild.nodeValue = text;
	}
	function appendChild(parentDom, dom) {
	    parentDom.appendChild(dom);
	}
	function insertOrAppend(parentDom, newNode, nextNode) {
	    if (isNullOrUndef(nextNode)) {
	        appendChild(parentDom, newNode);
	    }
	    else {
	        parentDom.insertBefore(newNode, nextNode);
	    }
	}
	function documentCreateElement(tag, isSVG) {
	    if (isSVG === true) {
	        return document.createElementNS(svgNS, tag);
	    }
	    else {
	        return document.createElement(tag);
	    }
	}
	function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
	    unmount(lastNode, null, lifecycle, false, isRecycling);
	    var dom = mount(nextNode, null, lifecycle, context, isSVG);
	    nextNode.dom = dom;
	    replaceChild(parentDom, dom, lastNode.dom);
	}
	function replaceChild(parentDom, nextDom, lastDom) {
	    if (!parentDom) {
	        parentDom = lastDom.parentNode;
	    }
	    parentDom.replaceChild(nextDom, lastDom);
	}
	function removeChild(parentDom, dom) {
	    parentDom.removeChild(dom);
	}
	function removeAllChildren(dom, children, lifecycle, isRecycling) {
	    dom.textContent = '';
	    if (!lifecycle.fastUnmount || (lifecycle.fastUnmount && options.recyclingEnabled && !isRecycling)) {
	        removeChildren(null, children, lifecycle, isRecycling);
	    }
	}
	function removeChildren(dom, children, lifecycle, isRecycling) {
	    for (var i = 0; i < children.length; i++) {
	        var child = children[i];
	        if (!isInvalid(child)) {
	            unmount(child, dom, lifecycle, true, isRecycling);
	        }
	    }
	}
	function isKeyed(lastChildren, nextChildren) {
	    return nextChildren.length && !isNullOrUndef(nextChildren[0]) && !isNullOrUndef(nextChildren[0].key)
	        && lastChildren.length && !isNullOrUndef(lastChildren[0]) && !isNullOrUndef(lastChildren[0].key);
	}
	
	function normalizeChildNodes(parentDom) {
	    var dom = parentDom.firstChild;
	    while (dom) {
	        if (dom.nodeType === 8) {
	            if (dom.data === '!') {
	                var placeholder = document.createTextNode('');
	                parentDom.replaceChild(placeholder, dom);
	                dom = dom.nextSibling;
	            }
	            else {
	                var lastDom = dom.previousSibling;
	                parentDom.removeChild(dom);
	                dom = lastDom || parentDom.firstChild;
	            }
	        }
	        else {
	            dom = dom.nextSibling;
	        }
	    }
	}
	function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
	    var type = vNode.type;
	    var props = vNode.props || EMPTY_OBJ;
	    var ref = vNode.ref;
	    vNode.dom = dom;
	    if (isClass) {
	        var _isSVG = dom.namespaceURI === svgNS;
	        var defaultProps = type.defaultProps;
	        if (!isUndefined(defaultProps)) {
	            copyPropsTo(defaultProps, props);
	            vNode.props = props;
	        }
	        var instance = createClassComponentInstance(vNode, type, props, context, _isSVG);
	        // If instance does not have componentWillUnmount specified we can enable fastUnmount
	        var prevFastUnmount = lifecycle.fastUnmount;
	        var input = instance._lastInput;
	        // we store the fastUnmount value, but we set it back to true on the lifecycle
	        // we do this so we can determine if the component render has a fastUnmount or not
	        lifecycle.fastUnmount = true;
	        instance._vComponent = vNode;
	        instance._vNode = vNode;
	        hydrate(input, dom, lifecycle, instance._childContext, _isSVG);
	        // we now create a lifecycle for this component and store the fastUnmount value
	        var subLifecycle = instance._lifecycle = new Lifecycle();
	        // children lifecycle can fastUnmount if itself does need unmount callback and within its cycle there was none
	        subLifecycle.fastUnmount = isUndefined(instance.componentWillUnmount) && lifecycle.fastUnmount;
	        // higher lifecycle can fastUnmount only if previously it was able to and this children doesnt have any
	        lifecycle.fastUnmount = prevFastUnmount && subLifecycle.fastUnmount;
	        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
	        options.findDOMNodeEnabled && componentToDOMNodeMap.set(instance, dom);
	        vNode.children = instance;
	    }
	    else {
	        var input$1 = createFunctionalComponentInput(vNode, type, props, context);
	        hydrate(input$1, dom, lifecycle, context, isSVG);
	        vNode.children = input$1;
	        vNode.dom = input$1.dom;
	        mountFunctionalComponentCallbacks(ref, dom, lifecycle);
	    }
	    return dom;
	}
	function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
	    var tag = vNode.type;
	    var children = vNode.children;
	    var props = vNode.props;
	    var events = vNode.events;
	    var flags = vNode.flags;
	    var ref = vNode.ref;
	    if (isSVG || (flags & 128 /* SvgElement */)) {
	        isSVG = true;
	    }
	    if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== tag) {
	        var newDom = mountElement(vNode, null, lifecycle, context, isSVG);
	        vNode.dom = newDom;
	        replaceChild(dom.parentNode, newDom, dom);
	        return newDom;
	    }
	    vNode.dom = dom;
	    if (children) {
	        hydrateChildren(children, dom, lifecycle, context, isSVG);
	    }
	    if (!(flags & 2 /* HtmlElement */)) {
	        processElement(flags, vNode, dom);
	    }
	    if (props) {
	        for (var prop in props) {
	            patchProp(prop, null, props[prop], dom, isSVG, lifecycle);
	        }
	    }
	    if (events) {
	        for (var name in events) {
	            patchEvent(name, null, events[name], dom, lifecycle);
	        }
	    }
	    if (ref) {
	        mountRef(dom, ref, lifecycle);
	    }
	    return dom;
	}
	function hydrateChildren(children, parentDom, lifecycle, context, isSVG) {
	    normalizeChildNodes(parentDom);
	    var dom = parentDom.firstChild;
	    if (isArray(children)) {
	        for (var i = 0; i < children.length; i++) {
	            var child = children[i];
	            if (isObject(child) && !isNull(child)) {
	                if (dom) {
	                    dom = hydrate(child, dom, lifecycle, context, isSVG);
	                    dom = dom.nextSibling;
	                }
	                else {
	                    mount(child, parentDom, lifecycle, context, isSVG);
	                }
	            }
	        }
	    }
	    else if (isStringOrNumber(children)) {
	        if (dom && dom.nodeType === 3) {
	            if (dom.nodeValue !== children) {
	                dom.nodeValue = children;
	            }
	        }
	        else if (children) {
	            parentDom.textContent = children;
	        }
	        dom = dom.nextSibling;
	    }
	    else if (isObject(children)) {
	        hydrate(children, dom, lifecycle, context, isSVG);
	        dom = dom.nextSibling;
	    }
	    // clear any other DOM nodes, there should be only a single entry for the root
	    while (dom) {
	        parentDom.removeChild(dom);
	        dom = dom.nextSibling;
	    }
	}
	function hydrateText(vNode, dom) {
	    if (dom.nodeType !== 3) {
	        var newDom = mountText(vNode, null);
	        vNode.dom = newDom;
	        replaceChild(dom.parentNode, newDom, dom);
	        return newDom;
	    }
	    var text = vNode.children;
	    if (dom.nodeValue !== text) {
	        dom.nodeValue = text;
	    }
	    vNode.dom = dom;
	    return dom;
	}
	function hydrateVoid(vNode, dom) {
	    vNode.dom = dom;
	}
	function hydrate(vNode, dom, lifecycle, context, isSVG) {
	    if (false) {
	        if (isInvalid(dom)) {
	            throwError("failed to hydrate. The server-side render doesn't match client side.");
	        }
	    }
	    var flags = vNode.flags;
	    if (flags & 28 /* Component */) {
	        return hydrateComponent(vNode, dom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
	    }
	    else if (flags & 3970 /* Element */) {
	        return hydrateElement(vNode, dom, lifecycle, context, isSVG);
	    }
	    else if (flags & 1 /* Text */) {
	        return hydrateText(vNode, dom);
	    }
	    else if (flags & 4096 /* Void */) {
	        return hydrateVoid(vNode, dom);
	    }
	    else {
	        if (false) {
	            throwError(("hydrate() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
	        }
	        throwError();
	    }
	}
	function hydrateRoot(input, parentDom, lifecycle) {
	    var dom = parentDom && parentDom.firstChild;
	    if (dom) {
	        hydrate(input, dom, lifecycle, {}, false);
	        dom = parentDom.firstChild;
	        // clear any other DOM nodes, there should be only a single entry for the root
	        while (dom = dom.nextSibling) {
	            parentDom.removeChild(dom);
	        }
	        return true;
	    }
	    return false;
	}
	
	// rather than use a Map, like we did before, we can use an array here
	// given there shouldn't be THAT many roots on the page, the difference
	// in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
	var roots = [];
	var componentToDOMNodeMap = new Map();
	options.roots = roots;
	function findDOMNode(ref) {
	    if (!options.findDOMNodeEnabled) {
	        if (false) {
	            throwError('findDOMNode() has been disabled, use enableFindDOMNode() enabled findDOMNode(). Warning this can significantly impact performance!');
	        }
	        throwError();
	    }
	    var dom = ref && ref.nodeType ? ref : null;
	    return componentToDOMNodeMap.get(ref) || dom;
	}
	function getRoot(dom) {
	    for (var i = 0; i < roots.length; i++) {
	        var root = roots[i];
	        if (root.dom === dom) {
	            return root;
	        }
	    }
	    return null;
	}
	
	function setRoot(dom, input, lifecycle) {
	    var root = {
	        dom: dom,
	        input: input,
	        lifecycle: lifecycle
	    };
	    roots.push(root);
	    return root;
	}
	function removeRoot(root) {
	    for (var i = 0; i < roots.length; i++) {
	        if (roots[i] === root) {
	            roots.splice(i, 1);
	            return;
	        }
	    }
	}
	var documentBody = isBrowser ? document.body : null;
	function render(input, parentDom) {
	    if (documentBody === parentDom) {
	        if (false) {
	            throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
	        }
	        throwError();
	    }
	    if (input === NO_OP) {
	        return;
	    }
	    var root = getRoot(parentDom);
	    if (isNull(root)) {
	        var lifecycle = new Lifecycle();
	        if (!isInvalid(input)) {
	            if (input.dom) {
	                input = cloneVNode(input);
	            }
	            if (!hydrateRoot(input, parentDom, lifecycle)) {
	                mount(input, parentDom, lifecycle, {}, false);
	            }
	            root = setRoot(parentDom, input, lifecycle);
	            lifecycle.trigger();
	        }
	    }
	    else {
	        var lifecycle$1 = root.lifecycle;
	        lifecycle$1.listeners = [];
	        if (isNullOrUndef(input)) {
	            unmount(root.input, parentDom, lifecycle$1, false, false);
	            removeRoot(root);
	        }
	        else {
	            if (input.dom) {
	                input = cloneVNode(input);
	            }
	            patch(root.input, input, parentDom, lifecycle$1, {}, false, false);
	        }
	        lifecycle$1.trigger();
	        root.input = input;
	    }
	    if (root) {
	        var rootInput = root.input;
	        if (rootInput && (rootInput.flags & 28 /* Component */)) {
	            return rootInput.children;
	        }
	    }
	}
	function createRenderer(_parentDom) {
	    var parentDom = _parentDom || null;
	    return function renderer(lastInput, nextInput) {
	        if (!parentDom) {
	            parentDom = lastInput;
	        }
	        render(nextInput, parentDom);
	    };
	}
	
	function linkEvent(data, event) {
	    return { data: data, event: event };
	}
	
	if (false) {
		Object.freeze(EMPTY_OBJ);
		var testFunc = function testFn() {};
		warning(
			(testFunc.name || testFunc.toString()).indexOf('testFn') !== -1,
			'It looks like you\'re using a minified copy of the development build ' +
			'of Inferno. When deploying Inferno apps to production, make sure to use ' +
			'the production build which skips development warnings and is faster. ' +
			'See http://infernojs.org for more details.'
		);
	}
	
	// we duplicate it so it plays nicely with different module loading systems
	var index = {
		linkEvent: linkEvent,
		// core shapes
		createVNode: createVNode,
	
		// cloning
		cloneVNode: cloneVNode,
	
		// used to shared common items between Inferno libs
		NO_OP: NO_OP,
		EMPTY_OBJ: EMPTY_OBJ,
	
		// DOM
		render: render,
		findDOMNode: findDOMNode,
		createRenderer: createRenderer,
		options: options
	};
	
	exports['default'] = index;
	exports.linkEvent = linkEvent;
	exports.createVNode = createVNode;
	exports.cloneVNode = cloneVNode;
	exports.NO_OP = NO_OP;
	exports.EMPTY_OBJ = EMPTY_OBJ;
	exports.render = render;
	exports.findDOMNode = findDOMNode;
	exports.createRenderer = createRenderer;
	exports.options = options;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(4);
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _infernoComponent = __webpack_require__(5);
	
	var _infernoComponent2 = _interopRequireDefault(_infernoComponent);
	
	var _app = __webpack_require__(7);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _home = __webpack_require__(8);
	
	var _home2 = _interopRequireDefault(_home);
	
	var _about = __webpack_require__(10);
	
	var _about2 = _interopRequireDefault(_about);
	
	var _experiences = __webpack_require__(14);
	
	var _experiences2 = _interopRequireDefault(_experiences);
	
	var _skills = __webpack_require__(16);
	
	var _skills2 = _interopRequireDefault(_skills);
	
	var _portfolio = __webpack_require__(18);
	
	var _portfolio2 = _interopRequireDefault(_portfolio);
	
	var _contact = __webpack_require__(26);
	
	var _contact2 = _interopRequireDefault(_contact);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var createVNode = _inferno2.default.createVNode;
	
	var App = function (_Component) {
		_inherits(App, _Component);
	
		function App(props) {
			_classCallCheck(this, App);
	
			return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
		}
	
		_createClass(App, [{
			key: 'render',
			value: function render() {
				return createVNode(16, _app2.default, {
					children: [createVNode(16, _home2.default, _extends({}, this.props.home)), createVNode(16, _about2.default, _extends({}, this.props.about)), createVNode(16, _experiences2.default, _extends({}, this.props.experiences)), createVNode(16, _skills2.default, _extends({}, this.props.skills)), createVNode(16, _portfolio2.default, _extends({}, this.props.portfolio)), createVNode(16, _contact2.default, _extends({}, this.props.contact))]
				});
			}
		}]);
	
		return App;
	}(_infernoComponent2.default);
	
	exports.default = App;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	String.isNullOrEmpty = function (val) {
	    return typeof val !== 'string' || !val.trim().length;
	};
	
	String.isValidEmailAddress = function (val) {
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return val !== undefined && re.test(val);
	};
	
	String.isValidPhoneNumber = function (val) {
	    var re = /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
	    return val !== undefined && re.test(val);
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);
	module.exports.default = module.exports;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * inferno-component v1.0.7
	 * (c) 2017 Dominic Gannaway
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	     true ? module.exports = factory(__webpack_require__(1)) :
	    typeof define === 'function' && define.amd ? define(['inferno'], factory) :
	    (global.Inferno = global.Inferno || {}, global.Inferno.Component = factory(global.Inferno));
	}(this, (function (inferno) { 'use strict';
	
	var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
	var isBrowser = typeof window !== 'undefined' && window.document;
	
	// this is MUCH faster than .constructor === Array and instanceof Array
	// in Node 7 and the later versions of V8, slower in older versions though
	var isArray = Array.isArray;
	
	function isStringOrNumber(obj) {
	    return isString(obj) || isNumber(obj);
	}
	function isNullOrUndef(obj) {
	    return isUndefined(obj) || isNull(obj);
	}
	function isInvalid(obj) {
	    return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
	}
	function isFunction(obj) {
	    return typeof obj === 'function';
	}
	
	function isString(obj) {
	    return typeof obj === 'string';
	}
	function isNumber(obj) {
	    return typeof obj === 'number';
	}
	function isNull(obj) {
	    return obj === null;
	}
	function isTrue(obj) {
	    return obj === true;
	}
	function isUndefined(obj) {
	    return obj === undefined;
	}
	
	function throwError(message) {
	    if (!message) {
	        message = ERROR_MSG;
	    }
	    throw new Error(("Inferno Error: " + message));
	}
	
	var Lifecycle = function Lifecycle() {
	    this.listeners = [];
	    this.fastUnmount = true;
	};
	Lifecycle.prototype.addListener = function addListener (callback) {
	    this.listeners.push(callback);
	};
	Lifecycle.prototype.trigger = function trigger () {
	        var this$1 = this;
	
	    for (var i = 0; i < this.listeners.length; i++) {
	        this$1.listeners[i]();
	    }
	};
	
	var noOp = ERROR_MSG;
	if (false) {
	    noOp = 'Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.';
	}
	var componentCallbackQueue = new Map();
	// when a components root VNode is also a component, we can run into issues
	// this will recursively look for vNode.parentNode if the VNode is a component
	function updateParentComponentVNodes(vNode, dom) {
	    if (vNode.flags & 28 /* Component */) {
	        var parentVNode = vNode.parentVNode;
	        if (parentVNode) {
	            parentVNode.dom = dom;
	            updateParentComponentVNodes(parentVNode, dom);
	        }
	    }
	}
	// this is in shapes too, but we don't want to import from shapes as it will pull in a duplicate of createVNode
	function createVoidVNode() {
	    return inferno.createVNode(4096 /* Void */);
	}
	function createTextVNode(text) {
	    return inferno.createVNode(1 /* Text */, null, null, text);
	}
	function addToQueue(component, force, callback) {
	    // TODO this function needs to be revised and improved on
	    var queue = componentCallbackQueue.get(component);
	    if (!queue) {
	        queue = [];
	        componentCallbackQueue.set(component, queue);
	        Promise.resolve().then(function () {
	            componentCallbackQueue.delete(component);
	            applyState(component, force, function () {
	                for (var i = 0; i < queue.length; i++) {
	                    queue[i]();
	                }
	            });
	        });
	    }
	    if (callback) {
	        queue.push(callback);
	    }
	}
	function queueStateChanges(component, newState, callback, sync) {
	    if (isFunction(newState)) {
	        newState = newState(component.state);
	    }
	    for (var stateKey in newState) {
	        component._pendingState[stateKey] = newState[stateKey];
	    }
	    if (!component._pendingSetState && isBrowser) {
	        if (sync || component._blockRender) {
	            component._pendingSetState = true;
	            applyState(component, false, callback);
	        }
	        else {
	            addToQueue(component, false, callback);
	        }
	    }
	    else {
	        component.state = Object.assign({}, component.state, component._pendingState);
	        component._pendingState = {};
	    }
	}
	function applyState(component, force, callback) {
	    if ((!component._deferSetState || force) && !component._blockRender && !component._unmounted) {
	        component._pendingSetState = false;
	        var pendingState = component._pendingState;
	        var prevState = component.state;
	        var nextState = Object.assign({}, prevState, pendingState);
	        var props = component.props;
	        var context = component.context;
	        component._pendingState = {};
	        var nextInput = component._updateComponent(prevState, nextState, props, props, context, force, true);
	        var didUpdate = true;
	        if (isInvalid(nextInput)) {
	            nextInput = createVoidVNode();
	        }
	        else if (nextInput === inferno.NO_OP) {
	            nextInput = component._lastInput;
	            didUpdate = false;
	        }
	        else if (isStringOrNumber(nextInput)) {
	            nextInput = createTextVNode(nextInput);
	        }
	        else if (isArray(nextInput)) {
	            if (false) {
	                throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	            }
	            throwError();
	        }
	        var lastInput = component._lastInput;
	        var vNode = component._vNode;
	        var parentDom = (lastInput.dom && lastInput.dom.parentNode) || (lastInput.dom = vNode.dom);
	        component._lastInput = nextInput;
	        if (didUpdate) {
	            var subLifecycle = component._lifecycle;
	            if (!subLifecycle) {
	                subLifecycle = new Lifecycle();
	            }
	            else {
	                subLifecycle.listeners = [];
	            }
	            component._lifecycle = subLifecycle;
	            var childContext = component.getChildContext();
	            if (!isNullOrUndef(childContext)) {
	                childContext = Object.assign({}, context, component._childContext, childContext);
	            }
	            else {
	                childContext = Object.assign({}, context, component._childContext);
	            }
	            component._patch(lastInput, nextInput, parentDom, subLifecycle, childContext, component._isSVG, false);
	            subLifecycle.trigger();
	            component.componentDidUpdate(props, prevState);
	            inferno.options.afterUpdate && inferno.options.afterUpdate(vNode);
	        }
	        var dom = vNode.dom = nextInput.dom;
	        var componentToDOMNodeMap = component._componentToDOMNodeMap;
	        componentToDOMNodeMap && componentToDOMNodeMap.set(component, nextInput.dom);
	        updateParentComponentVNodes(vNode, dom);
	        if (!isNullOrUndef(callback)) {
	            callback();
	        }
	    }
	}
	var Component$1 = function Component(props, context) {
	    this.state = {};
	    this.refs = {};
	    this._blockRender = false;
	    this._ignoreSetState = false;
	    this._blockSetState = false;
	    this._deferSetState = false;
	    this._pendingSetState = false;
	    this._pendingState = {};
	    this._lastInput = null;
	    this._vNode = null;
	    this._unmounted = true;
	    this._lifecycle = null;
	    this._childContext = null;
	    this._patch = null;
	    this._isSVG = false;
	    this._componentToDOMNodeMap = null;
	    /** @type {object} */
	    this.props = props || inferno.EMPTY_OBJ;
	    /** @type {object} */
	    this.context = context || {};
	};
	Component$1.prototype.render = function render (nextProps, nextState, nextContext) {
	};
	Component$1.prototype.forceUpdate = function forceUpdate (callback) {
	    if (this._unmounted) {
	        return;
	    }
	    isBrowser && applyState(this, true, callback);
	};
	Component$1.prototype.setState = function setState (newState, callback) {
	    if (this._unmounted) {
	        return;
	    }
	    if (!this._blockSetState) {
	        if (!this._ignoreSetState) {
	            queueStateChanges(this, newState, callback, false);
	        }
	    }
	    else {
	        if (false) {
	            throwError('cannot update state via setState() in componentWillUpdate().');
	        }
	        throwError();
	    }
	};
	Component$1.prototype.setStateSync = function setStateSync (newState) {
	    if (this._unmounted) {
	        return;
	    }
	    if (!this._blockSetState) {
	        if (!this._ignoreSetState) {
	            queueStateChanges(this, newState, null, true);
	        }
	    }
	    else {
	        if (false) {
	            throwError('cannot update state via setState() in componentWillUpdate().');
	        }
	        throwError();
	    }
	};
	Component$1.prototype.componentWillMount = function componentWillMount () {
	};
	Component$1.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState, prevContext) {
	};
	Component$1.prototype.shouldComponentUpdate = function shouldComponentUpdate (nextProps, nextState, context) {
	    return true;
	};
	Component$1.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps, context) {
	};
	Component$1.prototype.componentWillUpdate = function componentWillUpdate (nextProps, nextState, nextContext) {
	};
	Component$1.prototype.getChildContext = function getChildContext () {
	};
	Component$1.prototype._updateComponent = function _updateComponent (prevState, nextState, prevProps, nextProps, context, force, fromSetState) {
	    if (this._unmounted === true) {
	        if (false) {
	            throwError(noOp);
	        }
	        throwError();
	    }
	    if ((prevProps !== nextProps || nextProps === inferno.EMPTY_OBJ) || prevState !== nextState || force) {
	        if (prevProps !== nextProps || nextProps === inferno.EMPTY_OBJ) {
	            if (!fromSetState) {
	                this._blockRender = true;
	                this.componentWillReceiveProps(nextProps, context);
	                this._blockRender = false;
	            }
	            if (this._pendingSetState) {
	                nextState = Object.assign({}, nextState, this._pendingState);
	                this._pendingSetState = false;
	                this._pendingState = {};
	            }
	        }
	        var shouldUpdate = this.shouldComponentUpdate(nextProps, nextState, context);
	        if (shouldUpdate !== false || force) {
	            this._blockSetState = true;
	            this.componentWillUpdate(nextProps, nextState, context);
	            this._blockSetState = false;
	            this.props = nextProps;
	            var state = this.state = nextState;
	            this.context = context;
	            inferno.options.beforeRender && inferno.options.beforeRender(this);
	            var render = this.render(nextProps, state, context);
	            inferno.options.afterRender && inferno.options.afterRender(this);
	            return render;
	        }
	    }
	    return inferno.NO_OP;
	};
	
	return Component$1;
	
	})));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode;
	
	
	var App = function App(_ref) {
		var children = _ref.children;
		return createVNode(2, "div", {
			"className": "app"
		}, children);
	};
	
	exports.default = App;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _infernoComponent = __webpack_require__(5);
	
	var _infernoComponent2 = _interopRequireDefault(_infernoComponent);
	
	var _page = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var createVNode = _inferno2.default.createVNode;
	
	var HomePage = function (_Component) {
		_inherits(HomePage, _Component);
	
		function HomePage(props) {
			_classCallCheck(this, HomePage);
	
			return _possibleConstructorReturn(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).call(this, props));
		}
	
		_createClass(HomePage, [{
			key: 'render',
			value: function render() {
				return createVNode(16, _page.Page, {
					'name': 'home',
					children: [createVNode(16, _page.Title, {
						children: this.props.title
					}), createVNode(16, _page.SubTitle, {
						children: this.props.subtitle
					})]
				});
			}
		}]);
	
		return HomePage;
	}(_infernoComponent2.default);
	
	exports.default = HomePage;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Quote = exports.SubTitle = exports.Title = exports.Header = exports.Page = undefined;
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode;
	var Page = exports.Page = function Page(_ref) {
		var name = _ref.name,
		    children = _ref.children;
		return createVNode(2, "div", {
			"className": "page " + name
		}, children);
	};
	
	var Header = exports.Header = function Header(_ref2) {
		var children = _ref2.children;
		return createVNode(2, "div", {
			"className": "page-header"
		}, children);
	};
	
	var Title = exports.Title = function Title(_ref3) {
		var children = _ref3.children;
		return createVNode(2, "div", {
			"className": "title"
		}, children);
	};
	
	var SubTitle = exports.SubTitle = function SubTitle(_ref4) {
		var children = _ref4.children;
		return createVNode(2, "div", {
			"className": "sub-title"
		}, children);
	};
	
	var Quote = exports.Quote = function Quote(_ref5) {
		var author = _ref5.author,
		    text = _ref5.text;
		return createVNode(16, SubTitle, {
			children: [createVNode(2, "p", null, ["\"", text, "\""]), createVNode(2, "p", null, ["- ", author])]
		});
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _infernoComponent = __webpack_require__(5);
	
	var _infernoComponent2 = _interopRequireDefault(_infernoComponent);
	
	var _page = __webpack_require__(9);
	
	var _content = __webpack_require__(11);
	
	var _about = __webpack_require__(12);
	
	var _constants = __webpack_require__(13);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var createVNode = _inferno2.default.createVNode;
	
	var AboutPage = function (_Component) {
		_inherits(AboutPage, _Component);
	
		function AboutPage(props) {
			_classCallCheck(this, AboutPage);
	
			return _possibleConstructorReturn(this, (AboutPage.__proto__ || Object.getPrototypeOf(AboutPage)).call(this, props));
		}
	
		_createClass(AboutPage, [{
			key: 'render',
			value: function render() {
				return createVNode(16, _page.Page, {
					'name': 'about',
					children: [createVNode(16, _page.Header, {
						children: [createVNode(16, _page.Title, {
							children: this.props.title
						}), createVNode(16, _page.Quote, _extends({}, this.props.quote))]
					}), createVNode(16, _content.Content, {
						children: [createVNode(16, _about.Image, {
							'src': this.props.image
						}), createVNode(16, _about.Details, {
							children: this.props.details.map(function (props) {
								return createVNode(16, _about.Detail, _extends({}, props));
							})
						}), createVNode(16, _about.Description, {
							children: this.props.description
						})]
					})]
				});
			}
		}]);
	
		return AboutPage;
	}(_infernoComponent2.default);
	
	exports.default = AboutPage;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Header = exports.Content = undefined;
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode;
	var Content = exports.Content = function Content(_ref) {
		var children = _ref.children;
		return createVNode(2, "div", {
			"className": "content"
		}, children);
	};
	
	var Header = exports.Header = function Header(_ref2) {
		var children = _ref2.children;
		return createVNode(2, "div", {
			"className": "content-header"
		}, children);
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Description = exports.Detail = exports.Details = exports.Image = undefined;
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode;
	var Image = exports.Image = function Image(_ref) {
		var src = _ref.src;
		return createVNode(2, "div", {
			"className": "about-image col"
		}, createVNode(2, "img", {
			"src": src
		}));
	};
	
	var Details = exports.Details = function Details(_ref2) {
		var children = _ref2.children;
		return createVNode(2, "div", {
			"className": "about-details col"
		}, children);
	};
	
	var Detail = exports.Detail = function Detail(_ref3) {
		var label = _ref3.label,
		    value = _ref3.value;
		return createVNode(2, "div", {
			"className": "detail"
		}, [createVNode(2, "p", {
			"className": "detail-label"
		}, [label, ":"]), createVNode(2, "p", {
			"className": "detail-value"
		}, value)]);
	};
	
	var Description = exports.Description = function Description(_ref4) {
		var children = _ref4.children;
		return createVNode(2, "div", {
			"className": "about-desc col"
		}, children);
	};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var constants = {
		previewer: {
			resizeTimeout: 200,
			scrollTimeout: 5000
		},
		devices: {
			iphone: {
				width: 268,
				height: 544,
				displayWidth: 232,
				displayHeight: 414
			},
			ipad: {
				width: 660,
				height: 940,
				displayWidth: 582,
				displayHeight: 776
			},
			macbookPro: {
				width: 1685,
				height: 966,
				displayWidth: 1263,
				displayHeight: 790
			}
		}
	};
	
	exports.default = constants;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _infernoComponent = __webpack_require__(5);
	
	var _infernoComponent2 = _interopRequireDefault(_infernoComponent);
	
	var _page = __webpack_require__(9);
	
	var _content = __webpack_require__(11);
	
	var _experiences = __webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var createVNode = _inferno2.default.createVNode;
	
	var ExperiencesPage = function (_Component) {
		_inherits(ExperiencesPage, _Component);
	
		function ExperiencesPage(props) {
			_classCallCheck(this, ExperiencesPage);
	
			return _possibleConstructorReturn(this, (ExperiencesPage.__proto__ || Object.getPrototypeOf(ExperiencesPage)).call(this, props));
		}
	
		_createClass(ExperiencesPage, [{
			key: 'render',
			value: function render() {
				return createVNode(16, _page.Page, {
					'name': 'experiences',
					children: [createVNode(16, _page.Header, {
						children: [createVNode(16, _page.Title, {
							children: this.props.title
						}), createVNode(16, _page.Quote, _extends({}, this.props.quote))]
					}), this.props.sections.map(function (section) {
						return createVNode(16, _content.Content, {
							children: [createVNode(16, _content.Header, {
								children: createVNode(16, _page.Title, {
									children: section.title
								})
							}), createVNode(16, _experiences.List, {
								children: section.items.map(function (props) {
									return createVNode(16, _experiences.Item, _extends({}, props));
								})
							})]
						});
					})]
				});
			}
		}]);
	
		return ExperiencesPage;
	}(_infernoComponent2.default);
	
	exports.default = ExperiencesPage;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Item = exports.Site = exports.Location = exports.Link = exports.List = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode;
	var List = exports.List = function List(_ref) {
		var children = _ref.children;
		return createVNode(2, "ul", {
			"className": "experience-list"
		}, children);
	};
	
	var Link = exports.Link = function Link(_ref2) {
		var type = _ref2.type,
		    target = _ref2.target,
		    href = _ref2.href,
		    icon = _ref2.icon,
		    text = _ref2.text;
		return createVNode(2, "li", {
			"className": "item-" + type
		}, createVNode(2, "a", {
			"className": "link",
			"target": target,
			"href": href
		}, [createVNode(2, "span", {
			"className": "fa fa-" + icon
		}), createVNode(2, "span", {
			"className": "text"
		}, text)]));
	};
	
	var Location = exports.Location = function Location(_ref3) {
		var address = _ref3.address;
		return createVNode(16, Link, {
			"type": "location",
			"target": "google-maps",
			"href": "http://maps.google.com/maps?q=" + address,
			"icon": "map-marker",
			"text": address
		});
	};
	
	var Site = exports.Site = function Site(_ref4) {
		var domain = _ref4.domain,
		    protocol = _ref4.protocol;
		return createVNode(16, Link, {
			"type": "site",
			"target": "site",
			"href": "" + (protocol || "http://") + domain,
			"icon": "external-link",
			"text": domain
		});
	};
	
	var Item = exports.Item = function Item(_ref5) {
		var company = _ref5.company,
		    start = _ref5.start,
		    end = _ref5.end,
		    title = _ref5.title,
		    description = _ref5.description,
		    location = _ref5.location,
		    site = _ref5.site;
		return createVNode(2, "li", {
			"className": "experience-item"
		}, [createVNode(2, "div", {
			"className": "item-info"
		}, [createVNode(2, "div", {
			"className": "item-company"
		}, company), createVNode(2, "div", {
			"className": "item-timespan"
		}, start + " - " + end)]), createVNode(2, "div", {
			"className": "item-details"
		}, [createVNode(2, "p", {
			"className": "item-title"
		}, title), createVNode(2, "p", {
			"className": "item-description"
		}, description), createVNode(2, "ul", {
			"className": "item-links"
		}, [location ? createVNode(16, Location, _extends({}, location)) : null, site ? createVNode(16, Site, _extends({}, site)) : null])])]);
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _infernoComponent = __webpack_require__(5);
	
	var _infernoComponent2 = _interopRequireDefault(_infernoComponent);
	
	var _page = __webpack_require__(9);
	
	var _content = __webpack_require__(11);
	
	var _skills = __webpack_require__(17);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var createVNode = _inferno2.default.createVNode;
	
	var SkillsPage = function (_Component) {
		_inherits(SkillsPage, _Component);
	
		function SkillsPage(props) {
			_classCallCheck(this, SkillsPage);
	
			return _possibleConstructorReturn(this, (SkillsPage.__proto__ || Object.getPrototypeOf(SkillsPage)).call(this, props));
		}
	
		_createClass(SkillsPage, [{
			key: 'render',
			value: function render() {
				return createVNode(16, _page.Page, {
					'name': 'skills',
					children: [createVNode(16, _page.Header, {
						children: [createVNode(16, _page.Title, {
							children: this.props.title
						}), createVNode(16, _page.Quote, _extends({}, this.props.quote))]
					}), this.props.sections.map(function (section) {
						return createVNode(16, _content.Content, {
							children: [createVNode(16, _content.Header, {
								children: createVNode(16, _page.Title, {
									children: section.title
								})
							}), createVNode(16, _skills.List, {
								children: section.items.map(function (props) {
									return createVNode(16, _skills.Item, _extends({}, props));
								})
							})]
						});
					})]
				});
			}
		}]);
	
		return SkillsPage;
	}(_infernoComponent2.default);
	
	exports.default = SkillsPage;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Item = exports.List = undefined;
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode;
	var List = exports.List = function List(_ref) {
		var children = _ref.children;
		return createVNode(2, "ul", {
			"className": "skills-list"
		}, children);
	};
	
	var Item = exports.Item = function Item(_ref2) {
		var title = _ref2.title,
		    proficiency = _ref2.proficiency;
		return createVNode(2, "li", {
			"className": "skills-item"
		}, [createVNode(2, "div", {
			"className": "item-title"
		}, title), createVNode(2, "div", {
			"className": "item-bar",
			"fill": proficiency
		})]);
	};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _infernoComponent = __webpack_require__(5);
	
	var _infernoComponent2 = _interopRequireDefault(_infernoComponent);
	
	var _page = __webpack_require__(9);
	
	var _content = __webpack_require__(11);
	
	var _portfolio = __webpack_require__(19);
	
	var _previewer = __webpack_require__(20);
	
	var _previewer2 = _interopRequireDefault(_previewer);
	
	var _constants = __webpack_require__(13);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var createVNode = _inferno2.default.createVNode;
	
	var PortfolioPage = function (_Component) {
		_inherits(PortfolioPage, _Component);
	
		function PortfolioPage(props) {
			_classCallCheck(this, PortfolioPage);
	
			var _this = _possibleConstructorReturn(this, (PortfolioPage.__proto__ || Object.getPrototypeOf(PortfolioPage)).call(this, props));
	
			_this.showPreview = _this.showPreview.bind(_this);
			_this.closePreview = _this.closePreview.bind(_this);
	
			_this.state = {
				previewIsShowing: null,
				previewImages: []
			};
			return _this;
		}
	
		_createClass(PortfolioPage, [{
			key: 'closePreview',
			value: function closePreview() {
				this.setState({ previewIsShowing: false, previewImages: [] });
			}
		}, {
			key: 'showPreview',
			value: function showPreview(item) {
				this.setState({ previewIsShowing: true, previewImages: item.images });
			}
		}, {
			key: 'render',
			value: function render() {
	
				var preview = this.showPreview;
	
				return createVNode(16, _page.Page, {
					'name': 'portfolio',
					children: [createVNode(16, _page.Header, {
						children: [createVNode(16, _page.Title, {
							children: this.props.title
						}), createVNode(16, _page.Quote, _extends({}, this.props.quote))]
					}), createVNode(16, _content.Content, {
						children: createVNode(16, _portfolio.List, {
							children: this.props.items.map(function (props) {
								return createVNode(16, _portfolio.Item, _extends({
									'onClick': function onClick() {
										return preview(props);
									}
								}, props));
							})
						})
					}), this.state.previewIsShowing ? createVNode(16, _previewer2.default, {
						'onClose': this.closePreview,
						'imageSets': this.state.previewImages
					}) : null]
				});
			}
		}]);
	
		return PortfolioPage;
	}(_infernoComponent2.default);
	
	exports.default = PortfolioPage;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Item = exports.List = undefined;
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode;
	var List = exports.List = function List(_ref) {
		var children = _ref.children;
		return createVNode(2, 'ul', {
			'className': 'portfolio-list'
		}, children);
	};
	
	var Item = exports.Item = function Item(_ref2) {
		var title = _ref2.title,
		    description = _ref2.description,
		    background = _ref2.background,
		    onClick = _ref2.onClick;
	
	
		var el = null;
		var onLoad = function onLoad(_el) {
			el = _el;
		};
		var onTouchEnd = function onTouchEnd() {
			if (el) {
				el.classList.add('no-hover');
			}
		};
	
		return createVNode(2, 'li', {
			'className': 'portfolio-item'
		}, createVNode(2, 'a', {
			'className': 'anim'
		}, [createVNode(2, 'img', {
			'className': 'item-image',
			'src': background
		}), createVNode(2, 'div', {
			'className': 'item-cover'
		}, [createVNode(2, 'div', {
			'className': 'cover-title'
		}, title), createVNode(2, 'div', {
			'className': 'cover-details'
		}, description)]), createVNode(2, 'button', {
			'className': 'btn preview-btn'
		}, [createVNode(2, 'span', {
			'className': 'fa fa-search-plus anim-out'
		}), createVNode(2, 'span', {
			'className': 'text anim-in'
		}, 'Preview')])], {
			'onTouchEnd': onTouchEnd,
			'onClick': onClick
		}, null, onLoad));
	};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _infernoComponent = __webpack_require__(5);
	
	var _infernoComponent2 = _interopRequireDefault(_infernoComponent);
	
	var _previewer = __webpack_require__(21);
	
	var _devices = __webpack_require__(22);
	
	var _constants = __webpack_require__(13);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var devices = Object.keys(_constants2.default.devices);
	
	var createVNode = _inferno2.default.createVNode;
	
	var Previewer = function (_Component) {
		_inherits(Previewer, _Component);
	
		function Previewer(props) {
			_classCallCheck(this, Previewer);
	
			var _this = _possibleConstructorReturn(this, (Previewer.__proto__ || Object.getPrototypeOf(Previewer)).call(this, props));
	
			_this.onPrev = _this.onPrev.bind(_this);
			_this.onNext = _this.onNext.bind(_this);
			_this.onResize = _this.onResize.bind(_this);
			_this.checkResize = _this.checkResize.bind(_this);
			_this.setElement = _this.setElement.bind(_this);
			_this.setActiveDevice = _this.setActiveDevice.bind(_this);
			_this.getDevice = _this.getDevice.bind(_this);
	
			var index = 0;
			var activeImageSet = props.imageSets[index];
			var activeDevice = Object.keys(activeImageSet)[0];
	
			_this.state = {
				index: index,
				imageSet: activeImageSet,
				activeDevice: activeDevice,
				activeProps: { stage: 0 },
				inactiveProps: { stage: 0 }
			};
			return _this;
		}
	
		_createClass(Previewer, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
	
				this.onResize();
	
				window.addEventListener('resize', this.checkResize);
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				window.removeEventListener('resize', this.checkResize);
			}
		}, {
			key: 'onChange',
			value: function onChange(index) {
				var set = this.props.imageSets[index];
				var device = this.state.activeDevice;
	
				if (!set[device]) {
					device = Object.keys(set)[0];
				}
	
				this.setState({
	
					index: index,
					imageSet: set,
					activeDevice: device
				});
			}
		}, {
			key: 'onPrev',
			value: function onPrev() {
				this.onChange((this.state.index || this.props.imageSets.length) - 1);
			}
		}, {
			key: 'onNext',
			value: function onNext() {
				this.onChange((this.state.index + 1) % this.props.imageSets.length);
			}
		}, {
			key: 'checkResize',
			value: function checkResize() {
				if (this.resizeTimeout) {
					clearTimeout(this.resizeTimeout);
				}
				this.resizeTimeout = setTimeout(this.onResize, _constants2.default.previewer.resizeTimeout);
			}
		}, {
			key: 'onResize',
			value: function onResize() {
	
				// TODO: log error
				if (!this.element) {
					return;
				}
	
				var width = void 0,
				    height = void 0,
				    activeProps = void 0,
				    inactiveProps = void 0,
				    hPad = void 0,
				    vPad = void 0;
	
				hPad = 50;
				vPad = 25;
				width = this.element.clientWidth - hPad - hPad;
				height = this.element.clientHeight - vPad - vPad;
	
				inactiveProps = {
					fullWidth: width,
					maxWidth: width / Object.keys(this.state.imageSet).length,
					maxHeight: height * 0.25,
					bottom: height + vPad,
					stage: ++this.state.inactiveProps.stage
				};
	
				activeProps = {
					maxWidth: width,
					maxHeight: height * 0.75 - vPad,
					top: vPad,
					stage: ++this.state.inactiveProps.stage
				};
	
				this.setState({
					activeProps: activeProps,
					inactiveProps: inactiveProps
				});
			}
		}, {
			key: 'setActiveDevice',
			value: function setActiveDevice(name) {
				this.setState({ activeDevice: name });
			}
		}, {
			key: 'getDevice',
			value: function getDevice(name, index, nameArray) {
				var _this2 = this;
	
				var props = {
	
					index: index,
					deviceCount: nameArray.length,
					image: this.state.imageSet[name],
					active: this.state.activeDevice === name,
					activeProps: this.state.activeProps,
					inactiveProps: this.state.inactiveProps,
					onActivate: function onActivate() {
						_this2.setActiveDevice(name);
					}
				};
	
				switch (name.toLowerCase()) {
					case _devices.IPhone.type.toLowerCase():
						return createVNode(16, _devices.IPhone, _extends({}, props));
					case _devices.IPad.type.toLowerCase():
						return createVNode(16, _devices.IPad, _extends({}, props));
					case _devices.MacbookPro.type.toLowerCase():
						return createVNode(16, _devices.MacbookPro, _extends({}, props));
				}
	
				return null;
			}
		}, {
			key: 'setElement',
			value: function setElement(el) {
				this.element = el;
			}
		}, {
			key: 'render',
			value: function render() {
	
				var buttons = [];
	
				if (this.props.imageSets.length > 1) {
	
					buttons.push(createVNode(16, _previewer.Button, {
						'anim': true,
						'name': 'next',
						'icon': 'angle-right',
						'text': 'Next',
						'onClick': this.onNext
					}), createVNode(16, _previewer.Button, {
						'anim': true,
						'name': 'prev',
						'icon': 'angle-left',
						'text': 'Previous',
						'onClick': this.onPrev
					}));
				}
	
				return createVNode(16, _previewer.Popup, {
					'onLoad': this.setElement,
					children: [devices.map(this.getDevice), createVNode(16, _previewer.Button, {
						'anim': true,
						'name': 'close',
						'icon': 'close',
						'text': 'Close',
						'onClick': this.props.onClose
					}), buttons]
				});
			}
		}]);
	
		return Previewer;
	}(_infernoComponent2.default);
	
	exports.default = Previewer;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Button = exports.Popup = undefined;
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode;
	var Popup = exports.Popup = function Popup(_ref) {
		var onLoad = _ref.onLoad,
		    children = _ref.children;
		return createVNode(2, "div", {
			"className": "previewer show"
		}, [createVNode(2, "div", {
			"className": "previewer-cover"
		}), createVNode(2, "div", {
			"className": "previewer-content"
		}, children, null, null, onLoad)]);
	};
	
	var Button = exports.Button = function Button(_ref2) {
		var name = _ref2.name,
		    anim = _ref2.anim,
		    text = _ref2.text,
		    icon = _ref2.icon,
		    onClick = _ref2.onClick;
	
	
		var className = void 0,
		    iconName = void 0,
		    el = void 0,
		    onLoad = void 0,
		    onTouchEnd = void 0;
	
		className = 'btn';
		iconName = 'anim-out';
		el = null;
		onLoad = function onLoad(_el) {
			el = _el;
		};
		onTouchEnd = function onTouchEnd() {
			if (el) {
				el.classList.add('no-hover');
			}
		};
	
		if (name) {
			className += " " + name + "-btn";
		}
		if (anim) {
			className += " anim";
		}
	
		if (name.includes('close')) {
			iconName += " icon -close";
		} else {
			iconName += " fa fa-" + icon;
		}
	
		return createVNode(2, "button", {
			"className": className
		}, [createVNode(2, "span", {
			"className": iconName
		}), createVNode(2, "span", {
			"className": "text anim-in"
		}, text)], {
			"onTouchEnd": onTouchEnd,
			"onClick": onClick
		}, null, onLoad);
	};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.MacbookPro = exports.IPad = exports.IPhone = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _infernoComponent = __webpack_require__(5);
	
	var _infernoComponent2 = _interopRequireDefault(_infernoComponent);
	
	var _constants = __webpack_require__(13);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _form = __webpack_require__(23);
	
	var _devices = __webpack_require__(25);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var createVNode = _inferno2.default.createVNode;
	
	var Device = function (_Component) {
		_inherits(Device, _Component);
	
		function Device(props, naturalState) {
			_classCallCheck(this, Device);
	
			var _this = _possibleConstructorReturn(this, (Device.__proto__ || Object.getPrototypeOf(Device)).call(this, props));
	
			_this.scroll = _this.scroll.bind(_this);
			_this.onClick = _this.onClick.bind(_this);
			_this.onLoaderRef = _this.onLoaderRef.bind(_this);
			_this.onImageRef = _this.onImageRef.bind(_this);
			_this.onImageError = _this.onImageError.bind(_this);
			_this.onDrag = _this.onDrag.bind(_this);
			_this.onDragStart = _this.onDragStart.bind(_this);
			_this.onDragEnd = _this.onDragEnd.bind(_this);
	
			_this.states = { natural: naturalState };
			_this.dx = 2 * _this.props.index + 1 - _this.props.deviceCount;
			_this.dxp = _this.dx / (2 * _this.props.deviceCount);
			_this.imgBounds = {};
	
			_this.state = {
				ready: false,
				x: 0,
				y: 0,
				scale: 0,
				offsetY: 0,
				disabled: false,
				manualDrag: false
			};
			return _this;
		}
	
		_createClass(Device, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
	
				this.setActiveProps(nextProps.activeProps);
				this.setInactiveProps(nextProps.inactiveProps);
	
				var state = this.getTransformProps(nextProps);
	
				if (state) {
					if (nextProps.image != this.props.image) {
						if (this.imageEl && this.loaderEl) {
							this.loaderEl.style.zIndex = 3;
							this.imageEl.style.zIndex = -1;
						}
					}
	
					if (this.state.disabled && nextProps.image != this.props.image) {
						state.disabled = false;
					}
	
					this.clearScrollTimeout();
	
					if (nextProps.active) {
						this.scrollTimeout = setTimeout(this.scroll, _constants2.default.previewer.scrollTimeout);
					}
	
					this.setState(state);
				}
			}
		}, {
			key: 'clearScrollTimeout',
			value: function clearScrollTimeout() {
				if (this.scrollTimeout) {
					clearTimeout(this.scrollTimeout);
				}
				this.scrollTimeout = null;
			}
		}, {
			key: 'onLoaderRef',
			value: function onLoaderRef(el) {
				if (el) {
					this.loaderEl = el;
				}
			}
		}, {
			key: 'onImageRef',
			value: function onImageRef(el) {
				var _this2 = this;
	
				if (el) {
	
					this.imageEl = el;
	
					el.addEventListener('load', function () {
	
						el.style.zIndex = 0;
	
						if (_this2.loaderEl) {
							_this2.loaderEl.style.zIndex = -1;
						}
	
						_this2.imgBounds = {
							width: el.naturalWidth,
							height: el.naturalHeight
						};
	
						if (_this2.imgBounds.width === 0 && _this2.imgBounds.height === 0) {
							debugger;
						}
					});
				} else {
					this.imgBounds = {};
				}
			}
		}, {
			key: 'onImageError',
			value: function onImageError() {
				this.imgBounds = {};
	
				this.setState({ disabled: true });
			}
		}, {
			key: 'getTransformProps',
			value: function getTransformProps(props) {
	
				var state = props.active ? this.states.active : this.states.inactive;
	
				if (!state) {
					return null;
				}
	
				if (state.x !== this.state.x || state.y !== this.state.y || state.scale !== this.state.scale || !this.state.ready) {
	
					return {
						ready: true,
						x: state.x.toFixed(2),
						y: state.y.toFixed(2),
						scale: state.scale.toFixed(2),
						offsetY: 0
					};
				}
	
				return null;
			}
		}, {
			key: 'setActiveProps',
			value: function setActiveProps(props) {
	
				if (props.stage === this.props.activeProps.stage) {
					return;
				}
	
				var state = {};
	
				state.scale = Math.min(props.maxWidth / this.states.natural.width, props.maxHeight / this.states.natural.height);
	
				state.x = 0;
				state.y = props.top + (props.maxHeight - this.states.natural.height) / 2;
	
				this.states.active = state;
			}
		}, {
			key: 'setInactiveProps',
			value: function setInactiveProps(props) {
	
				if (props.stage === this.props.inactiveProps.stage) {
					return;
				}
	
				var state = {};
	
				state.scale = Math.min(props.maxWidth / this.states.natural.width, props.maxHeight / this.states.natural.height);
	
				state.x = props.fullWidth * this.dxp;
				state.y = props.bottom + 0.5 * (this.states.natural.height - this.states.natural.height * state.scale) - this.states.natural.height;
	
				this.states.inactive = state;
			}
		}, {
			key: 'scroll',
			value: function scroll() {
				var offset = void 0,
				    imgHeight = void 0,
				    display = void 0;
	
				imgHeight = this.imgBounds.height * this.states.natural.displayWidth / this.imgBounds.width;
				display = this.states.natural.displayHeight;
				offset = this.state.offsetY + display;
	
				// should scroll
				if (imgHeight && imgHeight > offset) {
	
					// check maximum scroll height
					if (offset < imgHeight - display) {
	
						// we can still scroll
						this.scrollTimeout = setTimeout(this.scroll, _constants2.default.previewer.scrollTimeout);
					} else {
	
						// ensure we don't passed the image.
						offset = imgHeight - display;
					}
	
					this.setState({ offsetY: offset, manualDrag: false });
				}
			}
		}, {
			key: 'onClick',
			value: function onClick(e) {
				if (!this.props.active && !String.isNullOrEmpty(this.props.image) && typeof this.props.onActivate === 'function') {
	
					this.props.onActivate();
				}
			}
		}, {
			key: 'onDrag',
			value: function onDrag(e) {
				if (e.x && e.y && this.props.active && this.dragEvent && this.state.scale > 0) {
	
					var dy = (this.dragEvent.y - e.y) * 2 / this.state.scale;
					var offset = this.state.offsetY + dy;
	
					if (offset !== this.state.offsetY && offset >= 0 && offset <= this.dragEvent.maxOffset) {
	
						this.setState({ offsetY: offset, manualDrag: true });
					}
	
					this.dragEvent.x = e.x;
					this.dragEvent.y = e.y;
				}
			}
		}, {
			key: 'onDragStart',
			value: function onDragStart(e) {
				if (this.props.active && this.imgBounds.width && this.imgBounds.height) {
	
					this.dragEvent = {
						maxOffset: this.imgBounds.height * this.states.natural.displayWidth / this.imgBounds.width - this.states.natural.displayHeight,
						x: e.x,
						y: e.y
					};
	
					this.clearScrollTimeout();
				}
			}
		}, {
			key: 'onDragEnd',
			value: function onDragEnd(e) {
	
				this.dragEvent = null;
				this.scrollTimeout = setTimeout(this.scroll, _constants2.default.previewer.scrollTimeout);
			}
		}, {
			key: 'getDeviceElProps',
			value: function getDeviceElProps() {
				return {
					onClick: this.onClick,
					disabled: this.state.disabled || String.isNullOrEmpty(this.props.image),
					active: this.props.active,
					scale: this.state.scale,
					x: this.state.x,
					y: this.state.y
				};
			}
		}, {
			key: 'getElChildren',
			value: function getElChildren() {
				return createVNode(16, _devices.Display, {
					children: [createVNode(16, _devices.Image, {
						'manualDrag': this.state.manualDrag,
						'onError': this.onImageError,
						'onRef': this.onImageRef,
						'url': this.props.image,
						'y': this.state.offsetY.toFixed(2)
					}), createVNode(16, _devices.ImageCover, {
						'onDrag': this.onDrag,
						'onDragStart': this.onDragStart,
						'onDragEnd': this.onDragEnd
					}), createVNode(16, _form.Loader, {
						'onRef': this.onLoaderRef,
						'active': 'true'
					})]
				});
			}
		}]);
	
		return Device;
	}(_infernoComponent2.default);
	
	var IPhone = exports.IPhone = function (_Device) {
		_inherits(IPhone, _Device);
	
		function IPhone(props) {
			_classCallCheck(this, IPhone);
	
			return _possibleConstructorReturn(this, (IPhone.__proto__ || Object.getPrototypeOf(IPhone)).call(this, props, _constants2.default.devices.iphone));
		}
	
		_createClass(IPhone, [{
			key: 'render',
			value: function render() {
				if (!this.state.ready) {
					return null;
				}
	
				return createVNode(16, _devices.IPhone, _extends({}, this.getDeviceElProps(), {
					children: this.getElChildren()
				}));
			}
		}]);
	
		return IPhone;
	}(Device);
	
	IPhone.type = "iphone";
	
	var IPad = exports.IPad = function (_Device2) {
		_inherits(IPad, _Device2);
	
		function IPad(props) {
			_classCallCheck(this, IPad);
	
			return _possibleConstructorReturn(this, (IPad.__proto__ || Object.getPrototypeOf(IPad)).call(this, props, _constants2.default.devices.ipad));
		}
	
		_createClass(IPad, [{
			key: 'render',
			value: function render() {
				if (!this.state.ready) {
					return null;
				}
	
				return createVNode(16, _devices.IPad, _extends({}, this.getDeviceElProps(), {
					children: this.getElChildren()
				}));
			}
		}]);
	
		return IPad;
	}(Device);
	
	IPad.type = "ipad";
	
	var MacbookPro = exports.MacbookPro = function (_Device3) {
		_inherits(MacbookPro, _Device3);
	
		function MacbookPro(props) {
			_classCallCheck(this, MacbookPro);
	
			return _possibleConstructorReturn(this, (MacbookPro.__proto__ || Object.getPrototypeOf(MacbookPro)).call(this, props, _constants2.default.devices.macbookPro));
		}
	
		_createClass(MacbookPro, [{
			key: 'render',
			value: function render() {
				if (!this.state.ready) {
					return null;
				}
	
				return createVNode(16, _devices.MacbookPro, _extends({}, this.getDeviceElProps(), {
					children: this.getElChildren()
				}));
			}
		}]);
	
		return MacbookPro;
	}(Device);
	
	MacbookPro.type = "macbookPro";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Popover = exports.Loader = exports.Button = exports.Col = exports.Row = undefined;
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _enums = __webpack_require__(24);
	
	var _enums2 = _interopRequireDefault(_enums);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode;
	var Row = exports.Row = function Row(_ref) {
		var children = _ref.children;
		return createVNode(2, 'div', {
			'className': 'input-row'
		}, children);
	};
	
	var Col = exports.Col = function Col(_ref2) {
		var children = _ref2.children;
		return createVNode(2, 'div', {
			'className': 'input-col'
		}, children);
	};
	
	var Cover = function Cover(_ref3) {
		var type = _ref3.type;
	
		switch (type) {
			case _enums2.default.level.success:
				return createVNode(2, 'div', {
					'className': 'cover success'
				}, createVNode(2, 'span', {
					'className': 'fa fa-check'
				}));
			case _enums2.default.level.error:
				return createVNode(2, 'div', {
					'className': 'cover error'
				}, createVNode(2, 'span', {
					'className': 'fa fa-times'
				}));
		}
	
		return null;
	};
	
	var Button = exports.Button = function Button(_ref4) {
		var name = _ref4.name,
		    anim = _ref4.anim,
		    text = _ref4.text,
		    icon = _ref4.icon,
		    onClick = _ref4.onClick,
		    loading = _ref4.loading,
		    cover = _ref4.cover;
	
		var className = 'btn';
		var coverItem = null;
		var el = null;
		var onLoad = function onLoad(_el) {
			el = _el;
		};
		var onTouchEnd = function onTouchEnd() {
			if (el) {
				el.classList.add('no-hover');
			}
		};
	
		if (name) {
			className += ' ' + name + '-btn';
		}
		if (anim) {
			className += ' anim';
		}
		if (loading) {
			className += ' loading';
		}
	
		if (cover) {
			coverItem = createVNode(16, Cover, {
				'type': cover
			});
		}
	
		return createVNode(2, 'button', {
			'className': className
		}, [createVNode(2, 'span', {
			'className': 'text anim-out'
		}, text), createVNode(2, 'span', {
			'className': 'fa fa-' + icon + ' anim-in'
		}), coverItem], {
			'onTouchEnd': onTouchEnd,
			'onClick': onClick
		}, null, onLoad);
	};
	
	var Loader = exports.Loader = function Loader(_ref5) {
		var onRef = _ref5.onRef,
		    active = _ref5.active;
	
	
		if (!active) {
			return null;
		}
	
		return createVNode(2, 'div', {
			'className': 'loader'
		}, createVNode(128, 'svg', {
			'className': 'circular',
			'viewBox': '25 25 50 50'
		}, createVNode(2, 'circle', {
			'className': 'path',
			'cx': '50',
			'cy': '50',
			'r': '20',
			'fill': 'none',
			'stroke-width': '2',
			'stroke-miterlimit': '10'
		})), null, null, onRef);
	};
	
	var Popover = exports.Popover = function Popover(_ref6) {
		var display = _ref6.display,
		    message = _ref6.message,
		    level = _ref6.level,
		    direction = _ref6.direction,
		    arrow = _ref6.arrow;
	
	
		if (!display || !message) {
			return null;
		}
	
		var className = 'popover has-' + (level || "error") + ' ' + (direction || "top");
	
		if (arrow) {
			className += " arrow";
		}
	
		return createVNode(2, 'div', {
			'className': className
		}, message);
	};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var enums = {
		level: {
			error: 'error',
			success: 'success'
		}
	};
	
	exports.default = enums;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.MacbookPro = exports.IPad = exports.IPhone = exports.Display = exports.ImageCover = exports.Image = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode;
	
	
	var Device = function Device(_ref) {
		var name = _ref.name,
		    x = _ref.x,
		    y = _ref.y,
		    scale = _ref.scale,
		    active = _ref.active,
		    disabled = _ref.disabled,
		    onClick = _ref.onClick,
		    children = _ref.children;
	
	
		var styles = { transform: "translate(" + x + "px, " + y + "px) scale(" + scale + ")" };
		var className = "device ios " + name;
	
		if (active) {
			className += " active";
		}
		if (disabled) {
			className += " disabled";
		}
	
		return createVNode(2, "div", {
			"className": className,
			"style": styles
		}, children, {
			"onClick": onClick
		});
	};
	
	var Image = exports.Image = function Image(_ref2) {
		var onRef = _ref2.onRef,
		    onError = _ref2.onError,
		    url = _ref2.url,
		    y = _ref2.y,
		    manualDrag = _ref2.manualDrag;
	
	
		var className = "";
		var styles = {};
	
		if (y) {
			styles.transform = "translateY(-" + y + "px)";
		}
		if (manualDrag) {
			className += 'manual-drag';
		}
	
		return createVNode(2, "img", {
			"className": className,
			"style": styles,
			"src": url
		}, null, {
			"onError": onError
		}, null, onRef);
	};
	
	var ImageCover = exports.ImageCover = function ImageCover(_ref3) {
		var onDrag = _ref3.onDrag,
		    onDragStart = _ref3.onDragStart,
		    onDragEnd = _ref3.onDragEnd;
		return createVNode(2, "div", {
			"draggable": "true",
			"className": "image-cover"
		}, null, {
			"onDrag": onDrag,
			"onDragStart": onDragStart,
			"onDragEnd": onDragEnd
		});
	};
	
	var Display = exports.Display = function Display(_ref4) {
		var children = _ref4.children;
		return createVNode(2, "div", {
			"className": "display"
		}, children);
	};
	
	var IPhone = exports.IPhone = function IPhone(props) {
		return createVNode(16, Device, _extends({
			"name": "iphone"
		}, props, {
			children: [createVNode(2, "div", {
				"className": "silent cover-btn"
			}), createVNode(2, "div", {
				"className": "vol-up cover-btn"
			}), createVNode(2, "div", {
				"className": "vol-down cover-btn"
			}), createVNode(2, "div", {
				"className": "power cover-btn"
			}), createVNode(2, "div", {
				"className": "cover"
			}, [createVNode(2, "div", {
				"className": "strip top left"
			}), createVNode(2, "div", {
				"className": "strip top right"
			}), createVNode(2, "div", {
				"className": "strip bot left"
			}), createVNode(2, "div", {
				"className": "strip bot right"
			}), createVNode(2, "div", {
				"className": "screen"
			}, [createVNode(2, "div", {
				"className": "shadow"
			}), createVNode(2, "div", {
				"className": "camera"
			}, createVNode(2, "div", {
				"className": "bulb"
			})), createVNode(2, "div", {
				"className": "ear-speaker"
			}), createVNode(2, "div", {
				"className": "home-btn"
			}, createVNode(2, "div", {
				"className": "inner-btn"
			})), props.children])])]
		}));
	};
	
	var IPad = exports.IPad = function IPad(props) {
		return createVNode(16, Device, _extends({
			"name": "ipad v9_7"
		}, props, {
			children: createVNode(2, "div", {
				"className": "cover"
			}, createVNode(2, "div", {
				"className": "screen"
			}, [createVNode(2, "div", {
				"className": "camera"
			}, createVNode(2, "div", {
				"className": "bulb"
			})), createVNode(2, "div", {
				"className": "home-btn"
			}, createVNode(2, "div", {
				"className": "inner-btn"
			})), props.children]))
		}));
	};
	
	var MacbookPro = exports.MacbookPro = function MacbookPro(props) {
		return createVNode(16, Device, _extends({
			"name": "macbook-pro"
		}, props, {
			children: [createVNode(2, "div", {
				"className": "cover"
			}, createVNode(2, "div", {
				"className": "screen"
			}, [createVNode(2, "div", {
				"className": "camera"
			}, createVNode(2, "div", {
				"className": "bulb"
			})), props.children, createVNode(2, "div", {
				"className": "logo"
			}, createVNode(2, "span", {
				"className": "text fa fa-apple"
			}))])), createVNode(2, "div", {
				"className": "bottom"
			}, [createVNode(2, "div", {
				"className": "front-top"
			}, createVNode(2, "div", {
				"className": "indention"
			})), createVNode(2, "div", {
				"className": "front-bot"
			})])]
		}));
	};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _infernoComponent = __webpack_require__(5);
	
	var _infernoComponent2 = _interopRequireDefault(_infernoComponent);
	
	var _page = __webpack_require__(9);
	
	var _content = __webpack_require__(11);
	
	var _form = __webpack_require__(23);
	
	var _social = __webpack_require__(27);
	
	var _form2 = __webpack_require__(28);
	
	var _http = __webpack_require__(29);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _constants = __webpack_require__(13);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _enums = __webpack_require__(24);
	
	var _enums2 = _interopRequireDefault(_enums);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var fields = {
		firstname: 'firstname',
		lastname: 'lastname',
		email: 'email',
		message: 'message'
	};
	
	var errors = {
		firstnameEmpty: 'Please enter a first name.',
		lastnameEmpty: 'Please enter a last name.',
		emailEmpty: 'Please enter an email address.',
		emailInvalid: 'Please enter a valid email address.',
		messageEmpty: 'Please enter a message.',
		generic: 'Uh oh! There was a problem sending your message. Please try again!'
	};
	
	var createVNode = _inferno2.default.createVNode;
	
	var ContactPage = function (_Component) {
		_inherits(ContactPage, _Component);
	
		function ContactPage(props) {
			_classCallCheck(this, ContactPage);
	
			var _this = _possibleConstructorReturn(this, (ContactPage.__proto__ || Object.getPrototypeOf(ContactPage)).call(this, props));
	
			_this.checkFirstname = _this.checkFirstname.bind(_this);
			_this.checkLastname = _this.checkLastname.bind(_this);
			_this.checkEmail = _this.checkEmail.bind(_this);
			_this.checkMessage = _this.checkMessage.bind(_this);
			_this.updateFirstname = _this.updateFirstname.bind(_this);
			_this.updateLastname = _this.updateLastname.bind(_this);
			_this.updateEmail = _this.updateEmail.bind(_this);
			_this.updateMessage = _this.updateMessage.bind(_this);
			_this.sendForm = _this.sendForm.bind(_this);
	
			_this.state = {
				loading: false,
				errorTarget: null,
				errorMessage: '',
				firstname: '',
				lastname: '',
				email: '',
				message: '',
				lastRes: null
			};
			return _this;
		}
	
		_createClass(ContactPage, [{
			key: 'checkFirstname',
			value: function checkFirstname(val) {
				if (this.state.errorTarget === fields.firstname && !String.isNullOrEmpty(val)) {
	
					return this.setState({
						errorTarget: fields.none,
						errorMessage: '',
						firstname: val,
						lastRes: null
					});
				}
			}
		}, {
			key: 'checkLastname',
			value: function checkLastname(val) {
				if (this.state.errorTarget === fields.lastname && !String.isNullOrEmpty(val)) {
	
					return this.setState({
						errorTarget: fields.none,
						errorMessage: '',
						lastname: val,
						lastRes: null
					});
				}
			}
		}, {
			key: 'checkEmail',
			value: function checkEmail(val) {
				if (this.state.errorTarget !== fields.email) {
					return;
				}
	
				if (String.isNullOrEmpty(val)) {
					if (this.errorMessage !== errors.emailEmpty) {
						return this.setState({
							errorMessage: errors.emailEmpty,
							email: val,
							lastRes: null
						});
					}
	
					return;
				}
	
				if (!String.isValidEmailAddress(val)) {
					if (this.errorMessage !== errors.emailInvalid) {
						return this.setState({
							errorMessage: errors.emailInvalid,
							email: val,
							lastRes: null
						});
					}
	
					return;
				}
	
				return this.setState({
					errorTarget: fields.none,
					errorMessage: '',
					email: val,
					lastRes: null
				});
			}
		}, {
			key: 'checkMessage',
			value: function checkMessage(val) {
				if (this.state.errorTarget === fields.message && !String.isNullOrEmpty(val)) {
	
					return this.setState({
						errorTarget: fields.none,
						errorMessage: '',
						message: val,
						lastRes: null
					});
				}
			}
		}, {
			key: 'updateFirstname',
			value: function updateFirstname(val) {
				this.setState({ firstname: val });
			}
		}, {
			key: 'updateLastname',
			value: function updateLastname(val) {
				this.setState({ lastname: val });
			}
		}, {
			key: 'updateEmail',
			value: function updateEmail(val) {
				this.setState({ email: val });
			}
		}, {
			key: 'updateMessage',
			value: function updateMessage(val) {
				this.setState({ message: val });
			}
		}, {
			key: 'sendForm',
			value: function sendForm() {
				var _this2 = this;
	
				if (this.state.loading) {
					return;
				}
	
				if (String.isNullOrEmpty(this.state.firstname)) {
					return this.setState({
						errorTarget: fields.firstname,
						errorMessage: errors.firstnameEmpty,
						lastRes: null
					});
				}
	
				if (String.isNullOrEmpty(this.state.lastname)) {
					return this.setState({
						errorTarget: fields.lastname,
						errorMessage: errors.lastnameEmpty,
						lastRes: null
					});
				}
	
				if (String.isNullOrEmpty(this.state.email)) {
					return this.setState({
						errorTarget: fields.email,
						errorMessage: errors.emailEmpty,
						lastRes: null
					});
				}
	
				if (!String.isValidEmailAddress(this.state.email)) {
					return this.setState({
						errorTarget: fields.email,
						errorMessage: errors.emailInvalid,
						lastRes: null
					});
				}
	
				if (String.isNullOrEmpty(this.state.message)) {
					return this.setState({
						errorTarget: fields.message,
						errorMessage: errors.messageEmpty,
						lastRes: null
					});
				}
	
				this.setState({
					errorTarget: fields.none,
					errorMessage: '',
					loading: true,
					lastRes: null
				});
	
				var data = {
	
					firstname: this.state.firstname,
					lastname: this.state.lastname,
					email: this.state.email,
					message: this.state.message
				};
	
				_http2.default.post(this.props.urls.sendMessage, data).done(function (response) {
	
					_this2.setState({
						loading: false,
						lastRes: _enums2.default.level.success,
						errorMessage: '',
						firstname: '',
						lastname: '',
						email: '',
						message: ''
					});
				}).fail(function () {
					_this2.setState({
						errorTarget: fields.none,
						errorMessage: errors.generic,
						loading: false,
						lastRes: _enums2.default.level.error
					});
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return createVNode(16, _page.Page, {
					'name': 'contact',
					children: [createVNode(16, _page.Header, {
						children: [createVNode(16, _page.Title, {
							children: this.props.title
						}), createVNode(16, _page.Quote, _extends({}, this.props.quote))]
					}), createVNode(16, _content.Content, {
						children: [createVNode(16, _form.Row, {
							children: [createVNode(16, _form.Col, {
								children: [createVNode(16, _form2.Input, {
									'placeholder': 'First Name',
									'hasError': this.state.errorTarget === fields.firstname,
									'maxlength': 100,
									'value': this.state.firstname,
									'onChange': this.updateFirstname,
									'onKeyPress': this.checkFirstname,
									'onEnter': this.sendForm
								}), createVNode(16, _form.Popover, {
									'display': this.state.errorTarget === fields.firstname,
									'message': this.state.errorMessage,
									'arrow': true
								})]
							}), createVNode(16, _form.Col, {
								children: [createVNode(16, _form2.Input, {
									'placeholder': 'Last Name',
									'hasError': this.state.errorTarget === fields.lastname,
									'maxlength': 100,
									'value': this.state.lastname,
									'onChange': this.updateLastname,
									'onKeyPress': this.checkLastname,
									'onEnter': this.sendForm
								}), createVNode(16, _form.Popover, {
									'display': this.state.errorTarget === fields.lastname,
									'message': this.state.errorMessage,
									'arrow': true
								})]
							})]
						}), createVNode(16, _form.Row, {
							children: createVNode(16, _form.Col, {
								children: [createVNode(16, _form2.Input, {
									'placeholder': 'Email Address',
									'hasError': this.state.errorTarget === fields.email,
									'maxlength': 100,
									'value': this.state.email,
									'onChange': this.updateEmail,
									'onKeyPress': this.checkEmail,
									'onEnter': this.sendForm
								}), createVNode(16, _form.Popover, {
									'display': this.state.errorTarget === fields.email,
									'message': this.state.errorMessage,
									'arrow': true
								})]
							})
						}), createVNode(16, _form.Row, {
							children: createVNode(16, _form.Col, {
								children: [createVNode(16, _form2.Textarea, {
									'placeholder': 'Type Your Message Here...',
									'hasError': this.state.errorTarget === fields.message,
									'maxlength': 5000,
									'value': this.state.message,
									'onChange': this.updateMessage,
									'onKeyPress': this.checkMessage
								}), createVNode(16, _form.Popover, {
									'display': this.state.errorTarget === fields.message,
									'message': this.state.errorMessage,
									'arrow': true
								})]
							})
						}), createVNode(16, _form.Row, {
							children: [createVNode(16, _form.Button, {
								'anim': true,
								'text': 'Send',
								'icon': 'paper-plane-o',
								'loading': this.state.loading,
								'cover': this.state.lastRes,
								'onClick': this.sendForm
							}), createVNode(16, _form.Popover, {
								'display': this.state.errorTarget === fields.none,
								'message': this.state.errorMessage
							}), createVNode(16, _form.Loader, {
								'active': this.state.loading
							})]
						})]
					}), createVNode(16, _content.Content, {
						children: createVNode(16, _social.SocialList, {
							children: this.props.sociallinks.map(function (props) {
								return createVNode(16, _social.SocialLink, _extends({}, props));
							})
						})
					})]
				});
			}
		}]);
	
		return ContactPage;
	}(_infernoComponent2.default);
	
	exports.default = ContactPage;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SocialLink = exports.SocialList = undefined;
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _inferno2.default.createVNode;
	var SocialList = exports.SocialList = function SocialList(_ref) {
		var children = _ref.children;
		return createVNode(2, 'div', {
			'className': 'social'
		}, children);
	};
	
	var SocialLink = exports.SocialLink = function SocialLink(_ref2) {
		var type = _ref2.type,
		    href = _ref2.href,
		    text = _ref2.text,
		    icon = _ref2.icon;
	
	
		var el = null;
		var onLoad = function onLoad(_el) {
			el = _el;
		};
		var onTouchEnd = function onTouchEnd() {
			if (el) {
				el.classList.add('no-hover');
			}
		};
	
		return createVNode(2, 'a', {
			'className': 'social-link ' + type + ' anim',
			'target': 'social',
			'href': href
		}, [createVNode(2, 'span', {
			'className': 'fa fa-' + icon + ' anim-out'
		}), createVNode(2, 'span', {
			'className': 'text anim-in'
		}, text)], {
			'onTouchEnd': onTouchEnd
		}, null, onLoad);
	};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Textarea = exports.Input = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _inferno = __webpack_require__(1);
	
	var _inferno2 = _interopRequireDefault(_inferno);
	
	var _infernoComponent = __webpack_require__(5);
	
	var _infernoComponent2 = _interopRequireDefault(_infernoComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var createVNode = _inferno2.default.createVNode;
	
	var Input = exports.Input = function (_Component) {
		_inherits(Input, _Component);
	
		function Input(props) {
			_classCallCheck(this, Input);
	
			var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));
	
			_this.keyPress = _this.keyPress.bind(_this);
			_this.blur = _this.blur.bind(_this);
			return _this;
		}
	
		_createClass(Input, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
	
				if (this.props.autofocus) {
					this.focus();
				}
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
	
				if (this.props.autofocus && this.props.focusAfterClear && !this.props.value) {
	
					this.focus();
				}
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
	
				if (this.input) {
					this.input.value = nextProps.value;
				}
			}
		}, {
			key: 'focus',
			value: function focus() {
				var _this2 = this;
	
				if (this.input) {
	
					// the timeout is here isnce the component may not be rendered yet
					// like in the case of componentDidMount
					setTimeout(function () {
						return _this2.input.focus();
					});
				}
			}
		}, {
			key: 'blur',
			value: function blur(e) {
	
				if (e.target.value != this.props.value && typeof this.props.onChange === 'function') {
	
					this.props.onChange(e.target.value);
				}
			}
		}, {
			key: 'keyPress',
			value: function keyPress(e) {
	
				if (e.which == 13 && typeof this.props.onEnter === 'function') {
	
					this.blur(e);
					this.props.onEnter(e.target.value);
				} else if (e.target.value != this.props.value && typeof this.props.onKeyPress === 'function') {
	
					this.props.onKeyPress(e.target.value);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;
	
				return createVNode(512, 'input', {
					'type': 'text',
					'tabindex': Number.isInteger(this.props.index) ? this.props.index : 0,
					'placeholder': this.props.placeholder,
					'className': 'input' + (this.props.hasError ? " has-error" : ""),
					'maxlength': this.props.maxlength || 999
				}, null, {
					'onBlur': this.blur,
					'onKeyUp': this.keyPress
				}, null, function (input) {
					_this3.input = input;
				});
			}
		}]);
	
		return Input;
	}(_infernoComponent2.default);
	
	var Textarea = exports.Textarea = function (_Input) {
		_inherits(Textarea, _Input);
	
		function Textarea() {
			_classCallCheck(this, Textarea);
	
			return _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).apply(this, arguments));
		}
	
		_createClass(Textarea, [{
			key: 'render',
			value: function render() {
				var _this5 = this;
	
				return createVNode(1024, 'textarea', {
					'tabindex': Number.isInteger(this.props.index) ? this.props.index : 0,
					'placeholder': this.props.placeholder,
					'className': 'input' + (this.props.hasError ? " has-error" : ""),
					'maxlength': this.props.maxlength || 999
				}, null, {
					'onBlur': this.blur,
					'onKeyUp': this.keyPress
				}, null, function (input) {
					_this5.input = input;
				});
			}
		}]);
	
		return Textarea;
	}(Input);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _deferred = __webpack_require__(30);
	
	var _deferred2 = _interopRequireDefault(_deferred);
	
	var _log = __webpack_require__(31);
	
	var _log2 = _interopRequireDefault(_log);
	
	var _utils = __webpack_require__(32);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var http = {
		request: function request(url, method, data, type) {
			_log2.default.debug("Sending http request: ", url, method, data, type);
	
			var d = new _deferred2.default();
			var xhr = new XMLHttpRequest();
			xhr.open(method.toUpperCase(), url, true);
			xhr.setRequestHeader("Accept", "*/*");
	
			if (type) {
				xhr.setRequestHeader("Content-Type", type);
			}
	
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
	
					if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
	
						var response = _utils2.default.safeJsonParse(xhr.response || xhr.responseText);
	
						d.resolve(response);
					} else {
	
						d.reject(xhr.statusText || xhr.responseText);
					}
				}
			};
	
			xhr.send(data);
	
			return d.promise;
		},
	
		get: function get(url, data) {
	
			if (data) {
				url = url + Http.objToQueryString(data);
			}
	
			return http.request(url, "GET", null, 'application/json;charset=UTF-8');
		},
	
		post: function post(url, data) {
	
			return http.request(url, 'POST', JSON.stringify(data), 'application/json;charset=UTF-8');
		},
	
		objToQueryString: function objToQueryString(obj) {
			if (!obj) {
				return '';
			}
	
			return '?' + Object.keys(obj).map(function (key) {
				return key + '=' + (obj[key] == null ? "" : obj[key]);
			}).join('&');
		}
	};
	
	exports.default = http;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _log = __webpack_require__(31);
	
	var _log2 = _interopRequireDefault(_log);
	
	var _utils = __webpack_require__(32);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var deferredState = {
		pending: 'pending',
		resolved: 'resolved',
		rejected: 'rejected'
	};
	
	var handlerTypes = {
		fail: 0,
		done: 1,
		then: 2
	};
	
	var helper = {
		executeHandlers: function executeHandlers(handlers, state, args) {
	
			if (state === deferredState.pending) {
				return;
			}
	
			var params = void 0;
	
			try {
				_utils2.default.foreach(handlers, function (handler) {
	
					if (state === deferredState.resolved) {
						switch (handler.type) {
	
							case handlerTypes.done:
								handler.cb.execute(args);
								break;
	
							case handlerTypes.then:
								params = handler.cb.execute(args);
								handler.child.resolve.call(null, params);
								break;
						}
					} else if (state === deferredState.rejected) {
	
						switch (handler.type) {
	
							case handlerTypes.fail:
								handler.cb.execute(args);
								break;
	
							case handlerTypes.then:
								handler.child.reject.apply(null, args);
								break;
						}
					}
				});
			} catch (ex) {
				_log2.default.error(ex, args);
			}
		},
	
		addHandler: function addHandler(target, type, args, chainedDeferred) {
	
			if (typeof args[0] !== 'function') {
				return;
			}
	
			var callback = new Callback(args[0], _typeof(args[1]) === 'object' ? args[1] : null);
	
			target.push(new Handler(type, callback, chainedDeferred));
		}
	};
	
	var Handler = function Handler(type, callback, child) {
		_classCallCheck(this, Handler);
	
		this.type = type;
		this.cb = callback;
		this.child = child;
	};
	
	var Callback = function () {
		function Callback(func, ctx) {
			_classCallCheck(this, Callback);
	
			this.func = func;
			this.ctx = (typeof ctx === 'undefined' ? 'undefined' : _typeof(ctx)) === 'object' ? ctx : null;
		}
	
		_createClass(Callback, [{
			key: 'execute',
			value: function execute(args) {
				return this.func.apply(this.ctx, args);
			}
		}]);
	
		return Callback;
	}();
	
	function Deferred() {
	
		var _state = void 0,
		    promise = void 0,
		    handlers = void 0,
		    resolve = void 0,
		    reject = void 0,
		    args = void 0;
	
		_state = deferredState.pending;
		handlers = [];
		promise = {
			state: function state() {
				return _state;
			},
	
			done: function done() {
				helper.addHandler(handlers, handlerTypes.done, arguments);
	
				if (_state === deferredState.resolved) {
					resolve();
				}
	
				return promise;
			},
	
			fail: function fail() {
				helper.addHandler(handlers, handlerTypes.fail, arguments);
	
				if (_state === deferredState.rejected) {
					reject();
				}
	
				return promise;
			},
	
			then: function then() {
				var child = new Deferred();
	
				helper.addHandler(handlers, handlerTypes.then, arguments);
	
				return child.promise;
			},
	
			always: function always() {
				promise.done.apply(null, arguments).fail.apply(null, arguments);
				return promise;
			}
		};
	
		resolve = function resolve() {
			_state = deferredState.resolved;
			args = arguments.length ? arguments : args;
	
			var handlersCopy = handlers.splice(0, handlers.length);
	
			helper.executeHandlers(handlersCopy, _state, args);
	
			return promise;
		};
	
		reject = function reject() {
			_state = deferredState.rejected;
			args = arguments.length ? arguments : args;
	
			var handlersCopy = handlers.splice(0, handlers.length);
	
			helper.executeHandlers(handlersCopy, _state, args);
	
			return promise;
		};
	
		this.promise = promise;
		this.resolve = resolve;
		this.reject = reject;
	};
	
	exports.default = Deferred;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/* TODO */
	var logger = {
		info: function info() {},
		log: function log() {},
		warn: function warn() {},
		error: function error() {},
		debug: function debug() {}
	};
	
	exports.default = logger;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var utils = {
	    foreach: function foreach(array, callback) {
	
	        if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) != 'object') {
	            return;
	        }
	
	        var keys = Object.keys(array);
	
	        for (var i = 0; i < keys.length; i++) {
	            if (callback(array[keys[i]], i, keys[i]) === false) {
	                return i;
	            }
	        }
	    },
	
	    first: function first(array, func, defVal) {
	
	        if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) != 'object') {
	            return defVal;
	        }
	
	        var keys = Object.keys(array);
	
	        for (var i = 0; i < keys.length; i++) {
	            if (func(array[keys[i]], i)) {
	                return array[keys[i]];
	            }
	        }
	
	        return defVal;
	    },
	
	    map: function map(array, func) {
	
	        if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) != 'object') {
	            return [];
	        }
	
	        var mapped, keys, val;
	
	        mapped = [];
	        keys = Object.keys(array);
	
	        for (var i = 0; i < keys.length; i++) {
	            var val = func(array[keys[i]], keys[i], i);
	            if (val) {
	                mapped.push(val);
	            }
	        }
	
	        return mapped;
	    },
	
	    mapObject: function mapObject(obj, func) {
	
	        var mapped = {};
	
	        if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) != 'object') {
	            return mapped;
	        }
	
	        var keys = Object.keys(obj);
	
	        for (var i = 0; i < keys.length; i++) {
	            if (func(mapped, obj[keys[i]], keys[i], i) === false) {
	                break;
	            }
	        }
	
	        return mapped;
	    },
	
	    safeJsonParse: function safeJsonParse(str) {
	
	        var obj = {};
	
	        if (str) {
	            try {
	                obj = JSON.parse(str);
	            } catch (ex) {
	                // TODO: log error
	            }
	        }
	
	        return obj;
	    }
	};
	
	exports.default = utils;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	module.exports = {
		"about": {
			"image": "images/me/image1-512-512.jpg",
			"title": "About Me",
			"quote": {
				"author": "Bruce Lee",
				"text": "Always be yourself, express yourself, have faith in yourself, do not go out and look for a successful personality and duplicate it."
			},
			"description": "I’m a well rounded Software Developer that enjoys seeing his work come to life. I consider myself proficient in all pieces of web development, from creating and manipulation database structures, to backend application structures and frameworks, to designing and programming client side pages. I enjoy spending time learning new skills, design patterns and architecture approaches. With my heavy mathematics and physics background, I also enjoy getting down and dirty into physics engines for games and other.",
			"details": [
				{
					"label": "Name",
					"value": "Raiden Kaneda"
				},
				{
					"label": "Age",
					"value": "25"
				},
				{
					"label": "Location",
					"value": "Orlando, FL"
				}
			]
		},
		"contact": {
			"title": "Contact",
			"quote": {
				"author": "Bruce Lee",
				"text": "If you always put limit on everything you do, physical or anything else. It will spread into your work and into your life. There are no limits. There are only plateaus, and you must not stay there, you must go beyond them."
			},
			"sociallinks": [
				{
					"type": "facebook",
					"text": "Facebook",
					"icon": "facebook",
					"href": "https://www.facebook.com/raiden.kaneda"
				},
				{
					"type": "linkedin",
					"text": "LinkedIn",
					"icon": "linkedin",
					"href": "https://www.linkedin.com/in/raiden-kaneda-2141a790"
				},
				{
					"type": "google-plus",
					"text": "Google+",
					"icon": "google-plus",
					"href": "https://plus.google.com/113051978520654565642"
				},
				{
					"type": "codepen",
					"text": "Codepen",
					"icon": "codepen",
					"href": "http://codepen.io/Kaneda9/"
				},
				{
					"type": "github",
					"text": "Github",
					"icon": "github",
					"href": "https://github.com/RKaneda9"
				},
				{
					"type": "instagram",
					"text": "Instagram",
					"icon": "instagram",
					"href": "https://www.instagram.com/kaneda9"
				}
			],
			"urls": {
				"sendMessage": "http://www.raidenkaneda.com/contact/me"
			}
		},
		"experiences": {
			"title": "Experiences",
			"quote": {
				"author": "Bruce Lee",
				"text": "Knowledge will give you power, but character respect."
			},
			"sections": [
				{
					"title": "Education",
					"items": [
						{
							"company": "University of Central Florida",
							"start": "Fall 2009",
							"end": "Winter 2014",
							"title": "Bachelors Degree in Computer Engineering",
							"description": "The degree was a combination of Computer Science and Electrical Engineering. There was a strong focus on Microprocessors and Computer Architecture. I chose my electives to grow in game development and further my understanding in electronics from an Electrical Engineering perspective. My senior design project was the base of a smart watch that could connect to common systems like your security system, smoke detectors, ovens, microwaves, etc.",
							"location": {
								"address": "Orlando, FL"
							},
							"site": {
								"domain": "www.ucf.edu",
								"protocol": "http://"
							}
						}
					]
				},
				{
					"title": "Work Experience",
					"items": [
						{
							"company": "ActivEngage",
							"start": "July 2014",
							"end": "Present",
							"title": "Full-time - Software Developer",
							"description": "Shortly before my last semester at UCF, I started working with ActivEngage. ActivEngage builds chatting software for automotive companies, real estate, and the Orlando Magic. They provide the chatting options displayed on client pages, as well as the services to handle incoming chats for those clients. For ActivEngage, I built the administrative website, I improved the chatting console, redesigned the analytics viewer, created a new security platform, redesigned the framework that is displayed on client websites, integrated client chat with Facebook messanger, and more.",
							"location": {
								"address": "Maitland, FL"
							},
							"site": {
								"domain": "www.activengage.com",
								"protocol": "http://"
							}
						},
						{
							"company": "Via Response",
							"start": "March 2012",
							"end": "July 2014",
							"title": "Full-time - Software Developer",
							"description": "I was offered a full time position at Via Response after my internship ended. Over the next 2+ years, I continued to expand my skills and learned everything I could. I found that I enjoyed working on both sides of a project, client and server side work. During my time there, our team redesigned and rebuilt the entire product from end to end. With Via Response being a relatively small company, I enjoyed getting a close look at the full process of a customer idea turned into a piece of software.",
							"location": {
								"address": "Orlando, FL"
							}
						},
						{
							"company": "Via Response",
							"start": "September 2011",
							"end": "March 2012",
							"title": "Internship - Software Developer",
							"description": "I started my first internship with Via Response when I was 20. Via Response's mission was to create online services for students and teachers. Their main audience was college professors, where they could build course work, submit and schedule tests, view analytics, take polls, etc. The students could then view the course work, take tests, homeworks, mark themselves present, and more. During my internship, I dove into the web world by learning ASP.NET webforms through C#, HTML, CSS. I was also introduced to JavaScript, SQL Server and Entity Framework.",
							"location": {
								"address": "Orlando, FL"
							}
						}
					]
				}
			]
		},
		"home": {
			"title": "Raiden Kaneda",
			"subtitle": "Full Stack Software Developer"
		},
		"portfolio": {
			"title": "My Work",
			"quote": {
				"author": "Bruce Lee",
				"text": "Obey the principles without being bound by them."
			},
			"items": [
				{
					"name": "ninjafit",
					"title": "NinjaFit Gym",
					"description": "An Obstacle Course Gym in Orlando, Florida",
					"background": "images/websites/ninjafitgym/logo.jpg",
					"images": [
						{
							"ipad": "images/websites/ninjafitgym/ipad-home.png",
							"iphone": "images/websites/ninjafitgym/iphone-home.png",
							"macbookPro": "images/websites/ninjafitgym/macbook-home.png"
						},
						{
							"ipad": "images/websites/ninjafitgym/ipad-home2.png",
							"macbookPro": "images/websites/ninjafitgym/macbook-home2.png"
						},
						{
							"ipad": "images/websites/ninjafitgym/ipad-home3.png",
							"macbookPro": "images/websites/ninjafitgym/macbook-home3.png"
						},
						{
							"ipad": "images/websites/ninjafitgym/ipad-wod.png",
							"iphone": "images/websites/ninjafitgym/iphone-wod.png",
							"macbookPro": "images/websites/ninjafitgym/macbook-wod.png"
						},
						{
							"ipad": "images/websites/ninjafitgym/ipad-news.png",
							"iphone": "images/websites/ninjafitgym/iphone-news.png",
							"macbookPro": "images/websites/ninjafitgym/macbook-news.png"
						},
						{
							"ipad": "images/websites/ninjafitgym/ipad-pricing.png",
							"iphone": "images/websites/ninjafitgym/iphone-pricing.png",
							"macbookPro": "images/websites/ninjafitgym/macbook-pricing.png"
						},
						{
							"ipad": "images/websites/ninjafitgym/ipad-our-gym.png",
							"iphone": "images/websites/ninjafitgym/iphone-our-gym.png",
							"macbookPro": "images/websites/ninjafitgym/macbook-our-gym.png"
						},
						{
							"ipad": "images/websites/ninjafitgym/ipad-login.png",
							"iphone": "images/websites/ninjafitgym/iphone-login.png",
							"macbookPro": "images/websites/ninjafitgym/macbook-login.png"
						},
						{
							"iphone": "images/websites/ninjafitgym/iphone-menu.png"
						}
					]
				},
				{
					"name": "activengage-admin",
					"title": "ActivEngage Admin",
					"description": "A administrative website for ActivEngage, where they can manage their users, teams, applications, advertisements, etc.",
					"background": "images/websites/activengage-admin/logo.jpg",
					"images": [
						{
							"ipad": "images/websites/activengage-admin/ipad-login.png",
							"iphone": "images/websites/activengage-admin/iphone-login.png",
							"macbookPro": "images/websites/activengage-admin/macbook-login.png"
						},
						{
							"ipad": "images/websites/activengage-admin/ipad-users.png",
							"macbookPro": "images/websites/activengage-admin/macbook-users.png"
						},
						{
							"ipad": "images/websites/activengage-admin/ipad-user.png",
							"macbookPro": "images/websites/activengage-admin/macbook-user.png"
						},
						{
							"ipad": "images/websites/activengage-admin/ipad-applications.png",
							"macbookPro": "images/websites/activengage-admin/macbook-applications.png"
						},
						{
							"ipad": "images/websites/activengage-admin/ipad-application-web.png",
							"macbookPro": "images/websites/activengage-admin/macbook-application-web.png"
						},
						{
							"ipad": "images/websites/activengage-admin/ipad-application-api.png",
							"macbookPro": "images/websites/activengage-admin/macbook-application-api.png"
						},
						{
							"ipad": "images/websites/activengage-admin/ipad-teams.png",
							"macbookPro": "images/websites/activengage-admin/macbook-teams.png"
						},
						{
							"ipad": "images/websites/activengage-admin/ipad-team.png",
							"macbookPro": "images/websites/activengage-admin/macbook-team.png"
						},
						{
							"ipad": "images/websites/activengage-admin/ipad-advertisements.png",
							"macbookPro": "images/websites/activengage-admin/macbook-advertisements.png"
						},
						{
							"ipad": "images/websites/activengage-admin/ipad-advertisement.png",
							"macbookPro": "images/websites/activengage-admin/macbook-advertisement.png"
						},
						{
							"ipad": "images/websites/activengage-admin/ipad-logout.png",
							"iphone": "images/websites/activengage-admin/iphone-logout.png",
							"macbookPro": "images/websites/activengage-admin/macbook-logout.png"
						}
					]
				},
				{
					"name": "activengage-pageview",
					"title": "ActivEngage PageView",
					"description": "A module that will be displayed on client websites for chatting services. Each client was created a custom brand setup to fit their needs.",
					"background": "images/websites/activengage-pageview/logo.png",
					"images": [
						{
							"ipad": "images/websites/activengage-pageview/ipad-pageview1.png",
							"iphone": "images/websites/activengage-pageview/iphone-pageview1.png",
							"macbookPro": "images/websites/activengage-pageview/macbook-pageview1.png"
						},
						{
							"ipad": "images/websites/activengage-pageview/ipad-expanded.png",
							"iphone": "images/websites/activengage-pageview/iphone-expanded.png",
							"macbookPro": "images/websites/activengage-pageview/macbook-expanded.png"
						},
						{
							"ipad": "images/websites/activengage-pageview/ipad-ipc.png",
							"iphone": "images/websites/activengage-pageview/iphone-ipc.png",
							"macbookPro": "images/websites/activengage-pageview/macbook-ipc.png"
						},
						{
							"ipad": "images/websites/activengage-pageview/ipad-ipc2.png",
							"iphone": "images/websites/activengage-pageview/iphone-ipc2.png",
							"macbookPro": "images/websites/activengage-pageview/macbook-ipc2.png"
						},
						{
							"ipad": "images/websites/activengage-pageview/ipad-ipc3.png",
							"iphone": "images/websites/activengage-pageview/iphone-ipc3.png",
							"macbookPro": "images/websites/activengage-pageview/macbook-ipc3.png"
						},
						{
							"ipad": "images/websites/activengage-pageview/ipad-ipc4.png",
							"iphone": "images/websites/activengage-pageview/iphone-ipc4.png",
							"macbookPro": "images/websites/activengage-pageview/macbook-ipc4.png"
						},
						{
							"ipad": "images/websites/activengage-pageview/ipad-ipc5.png",
							"iphone": "images/websites/activengage-pageview/iphone-ipc5.png",
							"macbookPro": "images/websites/activengage-pageview/macbook-ipc5.png"
						},
						{
							"ipad": "images/websites/activengage-pageview/ipad-ipc6.png",
							"iphone": "images/websites/activengage-pageview/iphone-ipc6.png",
							"macbookPro": "images/websites/activengage-pageview/macbook-ipc6.png"
						},
						{
							"ipad": "images/websites/activengage-pageview/ipad-ipc7.png",
							"iphone": "images/websites/activengage-pageview/iphone-ipc7.png",
							"macbookPro": "images/websites/activengage-pageview/macbook-ipc7.png"
						},
						{
							"ipad": "images/websites/activengage-pageview/ipad-ipc8.png",
							"iphone": "images/websites/activengage-pageview/iphone-ipc8.png",
							"macbookPro": "images/websites/activengage-pageview/macbook-ipc8.png"
						},
						{
							"ipad": "images/websites/activengage-pageview/ipad-ipc9.png",
							"iphone": "images/websites/activengage-pageview/iphone-ipc9.png",
							"macbookPro": "images/websites/activengage-pageview/macbook-ipc9.png"
						},
						{
							"ipad": "images/websites/activengage-pageview/ipad-ips1.png",
							"iphone": "images/websites/activengage-pageview/iphone-ips1.png",
							"macbookPro": "images/websites/activengage-pageview/macbook-ips1.png"
						},
						{
							"ipad": "images/websites/activengage-pageview/ipad-ips2.png",
							"iphone": "images/websites/activengage-pageview/iphone-ips2.png",
							"macbookPro": "images/websites/activengage-pageview/macbook-ips2.png"
						},
						{
							"macbookPro": "images/websites/activengage-pageview/macbook-designer1.png"
						},
						{
							"macbookPro": "images/websites/activengage-pageview/macbook-designer2.png"
						},
						{
							"macbookPro": "images/websites/activengage-pageview/macbook-designer3.png"
						},
						{
							"macbookPro": "images/websites/activengage-pageview/macbook-designer4.png"
						},
						{
							"macbookPro": "images/websites/activengage-pageview/macbook-designer5.png"
						},
						{
							"macbookPro": "images/websites/activengage-pageview/macbook-designer6.png"
						},
						{
							"macbookPro": "images/websites/activengage-pageview/macbook-designer7.png"
						},
						{
							"macbookPro": "images/websites/activengage-pageview/macbook-designer8.png"
						},
						{
							"macbookPro": "images/websites/activengage-pageview/macbook-designer9.png"
						},
						{
							"macbookPro": "images/websites/activengage-pageview/macbook-designer10.png"
						},
						{
							"macbookPro": "images/websites/activengage-pageview/macbook-designer11.png"
						},
						{
							"macbookPro": "images/websites/activengage-pageview/macbook-designer12.png"
						},
						{
							"macbookPro": "images/websites/activengage-pageview/macbook-designer13.png"
						},
						{
							"ipad": "images/websites/activengage-pageview/ipad-live1.png",
							"iphone": "images/websites/activengage-pageview/iphone-live1.png",
							"macbookPro": "images/websites/activengage-pageview/macbook-live1.png"
						}
					]
				},
				{
					"name": "activengage-console",
					"title": "ActivEngage Console",
					"description": "A chatting website for ActivEngage, where members can chat with automotive website visitors.",
					"background": "images/websites/activengage-console/logo.jpg",
					"images": [
						{
							"ipad": "images/websites/activengage-console/ipad-login.png",
							"iphone": "images/websites/activengage-console/iphone-login.png",
							"macbookPro": "images/websites/activengage-console/macbook-login.png"
						},
						{
							"ipad": "images/websites/activengage-console/ipad-reporting-filters.png",
							"macbookPro": "images/websites/activengage-console/macbook-reporting-filters.png"
						},
						{
							"ipad": "images/websites/activengage-console/ipad-reporting-site-performance.png",
							"macbookPro": "images/websites/activengage-console/macbook-reporting-site-performance.png"
						},
						{
							"ipad": "images/websites/activengage-console/ipad-reporting-user-performance.png",
							"macbookPro": "images/websites/activengage-console/macbook-reporting-user-performance.png"
						},
						{
							"ipad": "images/websites/activengage-console/ipad-reporting-chat-details.png",
							"macbookPro": "images/websites/activengage-console/macbook-reporting-chat-details.png"
						},
						{
							"ipad": "images/websites/activengage-console/ipad-logout.png",
							"iphone": "images/websites/activengage-console/iphone-logout.png",
							"macbookPro": "images/websites/activengage-console/macbook-logout.png"
						}
					]
				}
			]
		},
		"skills": {
			"title": "Skills",
			"quote": {
				"author": "Bruce Lee",
				"text": "Notice that the stiffest tree is most easily cracked, while the bamboo or willow survives by bending with the wind."
			},
			"sections": [
				{
					"title": "Programming Languages",
					"items": [
						{
							"title": "JavaScript",
							"proficiency": 10
						},
						{
							"title": "CSS (3)",
							"proficiency": 10
						},
						{
							"title": "HTML (5)",
							"proficiency": 10
						},
						{
							"title": "C#",
							"proficiency": 9
						},
						{
							"title": "SCSS",
							"proficiency": 8
						},
						{
							"title": "Arduino",
							"proficiency": 7
						},
						{
							"title": "SVG",
							"proficiency": 6
						},
						{
							"title": "Java",
							"proficiency": 6
						},
						{
							"title": "C++",
							"proficiency": 5
						},
						{
							"title": "C",
							"proficiency": 4
						},
						{
							"title": "PHP",
							"proficiency": 4
						}
					]
				},
				{
					"title": "JavaScript Front End Frameworks and Formats",
					"items": [
						{
							"title": "AngularJS 1.x",
							"proficiency": 10
						},
						{
							"title": "ES7 (ECMAScript 2016)",
							"proficiency": 10
						},
						{
							"title": "React JS",
							"proficiency": 9
						},
						{
							"title": "Inferno JS",
							"proficiency": 9
						},
						{
							"title": "jQuery",
							"proficiency": 8
						},
						{
							"title": "Bootstrap",
							"proficiency": 8
						},
						{
							"title": "Typescript",
							"proficiency": 8
						},
						{
							"title": "Canvas",
							"proficiency": 7
						},
						{
							"title": "Aurelia JS",
							"proficiency": 4
						},
						{
							"title": "CoffeeScript",
							"proficiency": 4
						},
						{
							"title": "Angular 2.x",
							"proficiency": 2
						}
					]
				},
				{
					"title": "JavaScript Back End Frameworks",
					"items": [
						{
							"title": "Node.js",
							"proficiency": 9
						},
						{
							"title": "Webpack",
							"proficiency": 8
						},
						{
							"title": "Express JS",
							"proficiency": 7
						},
						{
							"title": "Local Web Server",
							"proficiency": 7
						}
					]
				},
				{
					"title": "C# Frameworks",
					"items": [
						{
							"title": "MVC (5)",
							"proficiency": 9
						},
						{
							"title": "ASP.NET Web Api 2",
							"proficiency": 9
						},
						{
							"title": "Owin",
							"proficiency": 8
						},
						{
							"title": "Nuget",
							"proficiency": 8
						},
						{
							"title": "Entity Framework",
							"proficiency": 8
						},
						{
							"title": "Thinktecture Identity Server 3",
							"proficiency": 7
						},
						{
							"title": "EasyNetQ",
							"proficiency": 7
						}
					]
				},
				{
					"title": "Java Frameworks",
					"items": [
						{
							"title": "Android",
							"proficiency": 5
						}
					]
				},
				{
					"title": "Other Frameworks",
					"items": [
						{
							"title": "Docker",
							"proficiency": 4
						}
					]
				},
				{
					"title": "Relational Databases",
					"items": [
						{
							"title": "SQL Server",
							"proficiency": 8
						},
						{
							"title": "MySql",
							"proficiency": 4
						},
						{
							"title": "PostgresSQL",
							"proficiency": 3
						}
					]
				},
				{
					"title": "Non-Relational Databases",
					"items": [
						{
							"title": "RavenDB",
							"proficiency": 8
						},
						{
							"title": "Amazon DynamoDB",
							"proficiency": 6
						}
					]
				},
				{
					"title": "Tools",
					"items": [
						{
							"title": "Sublime Text 3",
							"proficiency": 10
						},
						{
							"title": "Visual Studio",
							"proficiency": 10
						},
						{
							"title": "Git",
							"proficiency": 9
						},
						{
							"title": "Bitbucket",
							"proficiency": 9
						},
						{
							"title": "SQL Server Management Studio",
							"proficiency": 8
						},
						{
							"title": "Command Prompt / Terminal",
							"proficiency": 7
						},
						{
							"title": "Visual Studio Code",
							"proficiency": 5
						},
						{
							"title": "Web Storm",
							"proficiency": 5
						},
						{
							"title": "Blender",
							"proficiency": 3
						}
					]
				},
				{
					"title": "Operating Systems",
					"items": [
						{
							"title": "Windows",
							"proficiency": 9
						},
						{
							"title": "Mac OSX",
							"proficiency": 8
						}
					]
				}
			]
		}
	};

/***/ })
/******/ ]);