/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = {
    foreach: function foreach(array, cb) {
        var i = 0;

        if (array instanceof Array) {
            for (i; i < array.length; i++) {
                if (cb(array[i], i, i) === false) {
                    return i;
                }
            }
        } else if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) == 'object') {
            for (var key in array) {
                if (cb(array[key], i++, key) === false) {
                    return i;
                }
            }
        }

        return null;
    },

    map: function map(array, cb) {
        var mapped = [],
            obj,
            i = 0;

        if (array instanceof Array) {
            for (i; i < array.length; i++) {
                obj = cb(array[i], i, i);
                if (obj) {
                    mapped.push(obj);
                }
            }
        } else if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) == 'object') {
            for (var key in array) {
                obj = cb(array[key], i++, key);
                if (obj) {
                    mapped.push(obj);
                }
            }
        }

        return mapped;
    },

    first: function first(array, cb, defVal) {
        var i = 0;

        if (array instanceof Array) {
            for (i; i < array.length; i++) {
                if (cb(array[i], i, i)) {
                    return array[i];
                }
            }
        } else if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) == 'object') {
            for (var key in array) {
                if (cb(array[key], i++, key)) {
                    return array[key];
                }
            }
        }

        return defVal;;
    },

    parse: function parse(str) {

        var obj = {};

        if (str) {
            try {
                obj = JSON.parse(str);
            } catch (ex) {
                // TODO: log error
            }
        }

        return obj;
    },

    removeDashes: function removeDashes(str) {
        return utils.map(str, function (piece, i) {

            if (i == 0) {
                return piece;
            }

            return piece.substring(0, 1).toUpperCase() + piece.substring(1);
        }).join('');
    }
};

module.exports = utils;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

module.exports = {"about":{"image":"images/me/image1-512-512.jpg","title":"About Me","quote":{"author":"Bruce Lee","text":"Always be yourself, express yourself, have faith in yourself, do not go out and look for a successful personality and duplicate it."},"description":"I’m a well rounded Software Developer that enjoys seeing his work come to life. I consider myself proficient in all pieces of web development, from creating and manipulation database structures, to backend application structures and frameworks, to designing and programming client side pages. I enjoy spending time learning new skills, design patterns and architecture approaches. With my heavy mathematics and physics background, I also enjoy getting down and dirty into physics engines for games and other.","details":[{"label":"Name","value":"Raiden Kaneda"},{"label":"Age","value":"26"},{"label":"Location","value":"Seattle, WA"}]},"contact":{"title":"Contact","quote":{"author":"Bruce Lee","text":"If you always put limit on everything you do, physical or anything else. It will spread into your work and into your life. There are no limits. There are only plateaus, and you must not stay there, you must go beyond them."},"sociallinks":[{"type":"facebook","text":"Facebook","icon":"facebook","href":"https://www.facebook.com/raiden.kaneda"},{"type":"linkedin","text":"LinkedIn","icon":"linkedin","href":"https://www.linkedin.com/in/raiden-kaneda-2141a790"},{"type":"google-plus","text":"Google+","icon":"google-plus","href":"https://plus.google.com/113051978520654565642"},{"type":"codepen","text":"Codepen","icon":"codepen","href":"http://codepen.io/Kaneda9/"},{"type":"github","text":"Github","icon":"github","href":"https://github.com/RKaneda9"},{"type":"instagram","text":"Instagram","icon":"instagram","href":"https://www.instagram.com/kaneda9"}],"urls":{"sendMessage":"http://www.raidenkaneda.com/contact/me"}},"experiences":{"title":"Experiences","quote":{"author":"Bruce Lee","text":"Knowledge will give you power, but character respect."},"sections":[{"title":"Education","items":[{"company":"University of Central Florida","start":"Fall 2009","end":"Winter 2014","title":"Bachelors Degree in Computer Engineering","description":"The degree was a combination of Computer Science and Electrical Engineering. There was a strong focus on Microprocessors and Computer Architecture. I chose my electives to grow in game development and further my understanding in electronics from an Electrical Engineering perspective. My senior design project was the base of a smart watch that could connect to common systems like your security system, smoke detectors, ovens, microwaves, etc.","location":{"address":"Orlando, FL"},"site":{"domain":"www.ucf.edu","protocol":"http://"}}]},{"title":"Work Experience","items":[{"company":"iFit","start":"August 2017","end":"Present","title":"Full-time - Software Developer (Remote)","description":"","location":{"address":"Logan, Utah"},"site":{"domain":"www.ifit.com","protocol":"https://"}},{"company":"ActivEngage","start":"July 2014","end":"August 2017","title":"Full-time - Software Developer","description":"Shortly before my last semester at UCF, I started working with ActivEngage. ActivEngage builds chatting software for automotive companies, real estate, and the Orlando Magic. They provide the chatting options displayed on client pages, as well as the services to handle incoming chats for those clients. For ActivEngage, I built the administrative website, I improved the chatting console, redesigned the analytics viewer, created a new security platform, redesigned the framework that is displayed on client websites, integrated client chat with Facebook messanger, and more.","location":{"address":"Maitland, FL"},"site":{"domain":"www.activengage.com","protocol":"http://"}},{"company":"Via Response","start":"March 2012","end":"July 2014","title":"Full-time - Software Developer","description":"I was offered a full time position at Via Response after my internship ended. Over the next 2+ years, I continued to expand my skills and learned everything I could. I found that I enjoyed working on both sides of a project, client and server side work. During my time there, our team redesigned and rebuilt the entire product from end to end. With Via Response being a relatively small company, I enjoyed getting a close look at the full process of a customer idea turned into a piece of software.","location":{"address":"Orlando, FL"}},{"company":"Via Response","start":"September 2011","end":"March 2012","title":"Internship - Software Developer","description":"I started my first internship with Via Response when I was 20. Via Response's mission was to create online services for students and teachers. Their main audience was college professors, where they could build course work, submit and schedule tests, view analytics, take polls, etc. The students could then view the course work, take tests, homeworks, mark themselves present, and more. During my internship, I dove into the web world by learning ASP.NET webforms through C#, HTML, CSS. I was also introduced to JavaScript, SQL Server and Entity Framework.","location":{"address":"Orlando, FL"}}]}]},"home":{"title":"Raiden Kaneda","subtitle":"Full Stack Software Developer"},"portfolio":{"title":"My Work","quote":{"author":"Bruce Lee","text":"Obey the principles without being bound by them."},"items":[{"name":"ninjafit","title":"NinjaFit Gym 2.0","description":"Version 2.0 of NinjaFit Gym's Landing Webiste. An Obstacle Course Gym in Orlando, Florida","background":"images/websites/ninjafitgym2/logo.jpg","href":"http://raidenkaneda.com/mocks/nfg/"},{"name":"ninjafit","title":"NinjaFit Gym 1.0","description":"An Obstacle Course Gym in Orlando, Florida","background":"images/websites/ninjafitgym/logo.jpg","images":[{"ipad":"images/websites/ninjafitgym/ipad-home.png","iphone":"images/websites/ninjafitgym/iphone-home.png","macbookPro":"images/websites/ninjafitgym/macbook-home.png"},{"ipad":"images/websites/ninjafitgym/ipad-home2.png","macbookPro":"images/websites/ninjafitgym/macbook-home2.png"},{"ipad":"images/websites/ninjafitgym/ipad-home3.png","macbookPro":"images/websites/ninjafitgym/macbook-home3.png"},{"ipad":"images/websites/ninjafitgym/ipad-wod.png","iphone":"images/websites/ninjafitgym/iphone-wod.png","macbookPro":"images/websites/ninjafitgym/macbook-wod.png"},{"ipad":"images/websites/ninjafitgym/ipad-news.png","iphone":"images/websites/ninjafitgym/iphone-news.png","macbookPro":"images/websites/ninjafitgym/macbook-news.png"},{"ipad":"images/websites/ninjafitgym/ipad-pricing.png","iphone":"images/websites/ninjafitgym/iphone-pricing.png","macbookPro":"images/websites/ninjafitgym/macbook-pricing.png"},{"ipad":"images/websites/ninjafitgym/ipad-our-gym.png","iphone":"images/websites/ninjafitgym/iphone-our-gym.png","macbookPro":"images/websites/ninjafitgym/macbook-our-gym.png"},{"ipad":"images/websites/ninjafitgym/ipad-login.png","iphone":"images/websites/ninjafitgym/iphone-login.png","macbookPro":"images/websites/ninjafitgym/macbook-login.png"},{"iphone":"images/websites/ninjafitgym/iphone-menu.png"}]},{"name":"activengage-admin","title":"ActivEngage Admin","description":"A administrative website for ActivEngage, where they can manage their users, teams, applications, advertisements, etc.","background":"images/websites/activengage-admin/logo.jpg","images":[{"ipad":"images/websites/activengage-admin/ipad-login.png","iphone":"images/websites/activengage-admin/iphone-login.png","macbookPro":"images/websites/activengage-admin/macbook-login.png"},{"ipad":"images/websites/activengage-admin/ipad-users.png","macbookPro":"images/websites/activengage-admin/macbook-users.png"},{"ipad":"images/websites/activengage-admin/ipad-user.png","macbookPro":"images/websites/activengage-admin/macbook-user.png"},{"ipad":"images/websites/activengage-admin/ipad-applications.png","macbookPro":"images/websites/activengage-admin/macbook-applications.png"},{"ipad":"images/websites/activengage-admin/ipad-application-web.png","macbookPro":"images/websites/activengage-admin/macbook-application-web.png"},{"ipad":"images/websites/activengage-admin/ipad-application-api.png","macbookPro":"images/websites/activengage-admin/macbook-application-api.png"},{"ipad":"images/websites/activengage-admin/ipad-teams.png","macbookPro":"images/websites/activengage-admin/macbook-teams.png"},{"ipad":"images/websites/activengage-admin/ipad-team.png","macbookPro":"images/websites/activengage-admin/macbook-team.png"},{"ipad":"images/websites/activengage-admin/ipad-advertisements.png","macbookPro":"images/websites/activengage-admin/macbook-advertisements.png"},{"ipad":"images/websites/activengage-admin/ipad-advertisement.png","macbookPro":"images/websites/activengage-admin/macbook-advertisement.png"},{"ipad":"images/websites/activengage-admin/ipad-logout.png","iphone":"images/websites/activengage-admin/iphone-logout.png","macbookPro":"images/websites/activengage-admin/macbook-logout.png"}]},{"name":"activengage-pageview","title":"ActivEngage PageView","description":"A module that will be displayed on client websites for chatting services. Each client was created a custom brand setup to fit their needs.","background":"images/websites/activengage-pageview/logo.png","images":[{"ipad":"images/websites/activengage-pageview/ipad-pageview1.png","iphone":"images/websites/activengage-pageview/iphone-pageview1.png","macbookPro":"images/websites/activengage-pageview/macbook-pageview1.png"},{"ipad":"images/websites/activengage-pageview/ipad-expanded.png","iphone":"images/websites/activengage-pageview/iphone-expanded.png","macbookPro":"images/websites/activengage-pageview/macbook-expanded.png"},{"ipad":"images/websites/activengage-pageview/ipad-ipc.png","iphone":"images/websites/activengage-pageview/iphone-ipc.png","macbookPro":"images/websites/activengage-pageview/macbook-ipc.png"},{"ipad":"images/websites/activengage-pageview/ipad-ipc2.png","iphone":"images/websites/activengage-pageview/iphone-ipc2.png","macbookPro":"images/websites/activengage-pageview/macbook-ipc2.png"},{"ipad":"images/websites/activengage-pageview/ipad-ipc3.png","iphone":"images/websites/activengage-pageview/iphone-ipc3.png","macbookPro":"images/websites/activengage-pageview/macbook-ipc3.png"},{"ipad":"images/websites/activengage-pageview/ipad-ipc4.png","iphone":"images/websites/activengage-pageview/iphone-ipc4.png","macbookPro":"images/websites/activengage-pageview/macbook-ipc4.png"},{"ipad":"images/websites/activengage-pageview/ipad-ipc5.png","iphone":"images/websites/activengage-pageview/iphone-ipc5.png","macbookPro":"images/websites/activengage-pageview/macbook-ipc5.png"},{"ipad":"images/websites/activengage-pageview/ipad-ipc6.png","iphone":"images/websites/activengage-pageview/iphone-ipc6.png","macbookPro":"images/websites/activengage-pageview/macbook-ipc6.png"},{"ipad":"images/websites/activengage-pageview/ipad-ipc7.png","iphone":"images/websites/activengage-pageview/iphone-ipc7.png","macbookPro":"images/websites/activengage-pageview/macbook-ipc7.png"},{"ipad":"images/websites/activengage-pageview/ipad-ipc8.png","iphone":"images/websites/activengage-pageview/iphone-ipc8.png","macbookPro":"images/websites/activengage-pageview/macbook-ipc8.png"},{"ipad":"images/websites/activengage-pageview/ipad-ipc9.png","iphone":"images/websites/activengage-pageview/iphone-ipc9.png","macbookPro":"images/websites/activengage-pageview/macbook-ipc9.png"},{"ipad":"images/websites/activengage-pageview/ipad-ips1.png","iphone":"images/websites/activengage-pageview/iphone-ips1.png","macbookPro":"images/websites/activengage-pageview/macbook-ips1.png"},{"ipad":"images/websites/activengage-pageview/ipad-ips2.png","iphone":"images/websites/activengage-pageview/iphone-ips2.png","macbookPro":"images/websites/activengage-pageview/macbook-ips2.png"},{"macbookPro":"images/websites/activengage-pageview/macbook-designer1.png"},{"macbookPro":"images/websites/activengage-pageview/macbook-designer2.png"},{"macbookPro":"images/websites/activengage-pageview/macbook-designer3.png"},{"macbookPro":"images/websites/activengage-pageview/macbook-designer4.png"},{"macbookPro":"images/websites/activengage-pageview/macbook-designer5.png"},{"macbookPro":"images/websites/activengage-pageview/macbook-designer6.png"},{"macbookPro":"images/websites/activengage-pageview/macbook-designer7.png"},{"macbookPro":"images/websites/activengage-pageview/macbook-designer8.png"},{"macbookPro":"images/websites/activengage-pageview/macbook-designer9.png"},{"macbookPro":"images/websites/activengage-pageview/macbook-designer10.png"},{"macbookPro":"images/websites/activengage-pageview/macbook-designer11.png"},{"macbookPro":"images/websites/activengage-pageview/macbook-designer12.png"},{"macbookPro":"images/websites/activengage-pageview/macbook-designer13.png"},{"ipad":"images/websites/activengage-pageview/ipad-live1.png","iphone":"images/websites/activengage-pageview/iphone-live1.png","macbookPro":"images/websites/activengage-pageview/macbook-live1.png"}]},{"name":"activengage-console","title":"ActivEngage Console","description":"A chatting website for ActivEngage, where members can chat with automotive website visitors.","background":"images/websites/activengage-console/logo.jpg","images":[{"ipad":"images/websites/activengage-console/ipad-login.png","iphone":"images/websites/activengage-console/iphone-login.png","macbookPro":"images/websites/activengage-console/macbook-login.png"},{"ipad":"images/websites/activengage-console/ipad-reporting-filters.png","macbookPro":"images/websites/activengage-console/macbook-reporting-filters.png"},{"ipad":"images/websites/activengage-console/ipad-reporting-site-performance.png","macbookPro":"images/websites/activengage-console/macbook-reporting-site-performance.png"},{"ipad":"images/websites/activengage-console/ipad-reporting-user-performance.png","macbookPro":"images/websites/activengage-console/macbook-reporting-user-performance.png"},{"ipad":"images/websites/activengage-console/ipad-reporting-chat-details.png","macbookPro":"images/websites/activengage-console/macbook-reporting-chat-details.png"},{"ipad":"images/websites/activengage-console/ipad-logout.png","iphone":"images/websites/activengage-console/iphone-logout.png","macbookPro":"images/websites/activengage-console/macbook-logout.png"}]}]},"skills":{"title":"Skills","quote":{"author":"Bruce Lee","text":"Notice that the stiffest tree is most easily cracked, while the bamboo or willow survives by bending with the wind."},"sections":[{"title":"Programming Languages","items":[{"title":"JavaScript","proficiency":10},{"title":"CSS (3)","proficiency":10},{"title":"HTML (5)","proficiency":10},{"title":"C#","proficiency":9},{"title":"Arduino","proficiency":7},{"title":"SVG","proficiency":6},{"title":"Java","proficiency":6},{"title":"C++","proficiency":5},{"title":"C","proficiency":4},{"title":"PHP","proficiency":4}]},{"title":"JavaScript Front End Frameworks and Formats","items":[{"title":"AngularJS 1.x","proficiency":10},{"title":"ES7 (ECMAScript 2016)","proficiency":10},{"title":"React JS","proficiency":9},{"title":"Inferno JS","proficiency":9},{"title":"jQuery","proficiency":8},{"title":"Bootstrap","proficiency":8},{"title":"Typescript","proficiency":8},{"title":"Canvas","proficiency":7},{"title":"Aurelia JS","proficiency":4},{"title":"CoffeeScript","proficiency":4},{"title":"Angular 2.x","proficiency":2}]},{"title":"JavaScript Back End Frameworks","items":[{"title":"Node.js","proficiency":9},{"title":"Webpack","proficiency":8},{"title":"Express JS","proficiency":7},{"title":"Local Web Server","proficiency":7}]},{"title":"Other Front End Preprocessor Languages","items":[{"title":"SCSS","proficiency":9},{"title":"Pug","proficiency":5},{"title":"Haml","proficiency":5}]},{"title":"C# Frameworks","items":[{"title":"MVC (5)","proficiency":9},{"title":"ASP.NET Web Api 2","proficiency":9},{"title":"Owin","proficiency":8},{"title":"Nuget","proficiency":8},{"title":"Entity Framework","proficiency":8},{"title":"Thinktecture Identity Server 3","proficiency":7},{"title":"EasyNetQ","proficiency":7}]},{"title":"Java Frameworks","items":[{"title":"Android","proficiency":5}]},{"title":"Other Frameworks","items":[{"title":"Docker","proficiency":4}]},{"title":"Relational Databases","items":[{"title":"SQL Server","proficiency":8},{"title":"MySql","proficiency":4},{"title":"PostgresSQL","proficiency":3}]},{"title":"Non-Relational Databases","items":[{"title":"RavenDB","proficiency":8},{"title":"Amazon DynamoDB","proficiency":6}]},{"title":"Tools","items":[{"title":"Sublime Text 3","proficiency":10},{"title":"Visual Studio","proficiency":10},{"title":"Git","proficiency":9},{"title":"Bitbucket","proficiency":9},{"title":"SQL Server Management Studio","proficiency":8},{"title":"Command Prompt / Terminal","proficiency":7},{"title":"Visual Studio Code","proficiency":5},{"title":"Web Storm","proficiency":5},{"title":"Blender","proficiency":3}]},{"title":"Operating Systems","items":[{"title":"Windows","proficiency":9},{"title":"Mac OSX","proficiency":8}]}]}}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helper = {
    getElement: function getElement(id) {
        return document.getElementById(id);
    },

    getBounds: function getBounds(el) {
        return helper.isElement(el) ? el.getBoundingClientRect() : null;
    },

    isElement: function isElement(el) {
        return el instanceof Element;
    },

    addListener: function addListener(el, type, func) {
        if (!helper.isElement(el)) {
            return;
        }

        if (el.addEventListener) {
            el.addEventListener(type, func);
        } else if (el.attachEvent) {
            el.attachEvent(type, func);
        }
    },

    removeListener: function removeListener(el, type, func) {
        if (!helper.isElement(el)) {
            return;
        }

        if (el.removeEventListener) {
            el.removeEventListener(type, func);
        } else if (el.detachEvent) {
            el.detachEvent(type, func);
        }
    },

    addClass: function addClass(el, _class) {
        if (!helper.isElement(el)) {
            return;
        }

        // TODO:
        el.classList.add(_class);
    },

    removeClass: function removeClass(el, _class) {
        if (!helper.isElement(el)) {
            return;
        }

        // TODO:
        el.classList.remove(_class);
    },

    setClass: function setClass(el, bool, _class) {
        if (bool) {
            helper.addClass(el, _class);
        } else {
            helper.removeClass(el, _class);
        }
    },

    setText: function setText(el, text) {
        if (!helper.isElement(el)) {
            return;
        }

        if (el.innerText != undefined) {
            el.innerText = text;
        } else if (el.innerHTML) {
            el.innerHTML = text;
        }
    }
};

module.exports = helper;

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = __webpack_require__(2),
    constants = __webpack_require__(20),
    http = __webpack_require__(21),
    Button = __webpack_require__(16),
    Field = __webpack_require__(17);

function ContactForm(props) {

    /* ====================================== **
    ** Region: internal variable declaration  **
    ** ====================================== */

    var fields, button;

    /* ====================================== **
    ** Region: internal functions               **
    ** ====================================== */

    function onSubmitSuccess(res) {
        button.setState(button.states.responseSuccess);

        utils.foreach(fields, function (field) {
            field.setValue('');
        });
    }

    function onSubmitError(res) {
        var message, found;

        found = false;
        message = 'Uh oh! There was a problem sending your message. Please try again!';

        if ((typeof res === 'undefined' ? 'undefined' : _typeof(res)) == 'object' && !String.isNullOrEmpty(res.message)) {

            message = res.message;

            if (!String.isNullOrEmpty(res.target)) {
                found = utils.first(fields, function (field) {

                    if (field.name === res.target) {
                        field.showError(res.message);
                        return true;
                    }
                });
            }
        }

        if (found) {
            message = null;
        }

        button.setState(button.states.responseError, message);
    }

    /* ====================================== **
    ** Region: external functions               **
    ** ====================================== */

    this.submit = function () {
        var data, invalid;

        data = {};

        utils.foreach(fields, function (field) {
            field.reset();
        });

        invalid = utils.first(fields, function (field) {
            if (!field.isValid()) {

                field.focus();
                return true;
            }

            data[field.name] = field.getValue();
        });

        if (invalid) {
            return;
        }

        button.setState(button.states.loading);

        http.post(props.urls.sendMessage, data, onSubmitSuccess, onSubmitError);
    };

    /* ====================================== **
    ** Region: internal setup                   **
    ** ====================================== */

    button = new Button({ name: 'form-send', onClick: this.submit });
    fields = [new Field({
        name: 'firstname',
        display: 'First Name',
        onEnter: this.submit,
        validation: [{
            func: String.isNotNullOrEmpty,
            msg: 'Please enter a first name.'
        }]
    }), new Field({
        name: 'lastname',
        display: 'Last Name',
        onEnter: this.submit,
        validation: [{
            func: String.isNotNullOrEmpty,
            msg: 'Please enter a last name.'
        }]
    }), new Field({
        name: 'email',
        display: 'Email Address',
        onEnter: this.submit,
        validation: [{
            func: String.isNotNullOrEmpty,
            msg: 'Please enter an email address.'
        }, {
            func: String.isValidEmailAddress,
            msg: 'Please enter a valid email address.'
        }]
    }), new Field({
        name: 'message',
        display: 'Message'
    })];
}

module.exports = ContactForm;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Previewer = __webpack_require__(18),
    helper = __webpack_require__(7),
    utils = __webpack_require__(2);

function Portfolio(props) {

    var previewer, els;

    /* ====================================== **
    ** Region: internal variable declaration  **
    ** ====================================== */

    /* ====================================== **
    ** Region: internal functions               **
    ** ====================================== */

    /* ====================================== **
    ** Region: external functions               **
    ** ====================================== */

    /* ====================================== **
    ** Region: internal setup                   **
    ** ====================================== */

    previewer = new Previewer();
    els = utils.map(props.items, function (params) {

        var el = document.getElementById('portfolio-item-' + params.name);

        helper.addListener(el, 'click', function (e) {
            previewer.show(params.images);
        });

        return el;
    });
}

module.exports = Portfolio;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "");
    };
}

String.isNullOrEmpty = function (val) {
    return typeof val !== 'string' || !val.trim().length;
};

String.isNotNullOrEmpty = function (val) {
    return !String.isNullOrEmpty(val);
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
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var helper = __webpack_require__(7),
    utils = __webpack_require__(2);

function Button(props) {
    if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) != 'object') {
        props = {};
    }

    /* ====================================== **
    ** Region: internal variable declaration  **
    ** ====================================== */

    var els, state, scope;

    /* ====================================== **
    ** Region: internal functions               **
    ** ====================================== */

    function onClick(e) {
        if (state == scope.states.ready && typeof props.onClick == 'function') {
            props.onClick();
        }
    }

    function showLoader() {
        helper.addClass(els.loader, 'show');
    }

    function hideLoader() {
        helper.removeClass(els.loader, 'show');
    }

    function showButton() {
        helper.removeClass(els.btn, 'loading');
    }

    function hideButton() {
        helper.addClass(els.btn, 'loading');
    }

    function showPopover(msg) {
        if (!String.isNullOrEmpty(msg)) {

            helper.setText(els.popover, msg);
            helper.addClass(els.popover, 'show');
        }
    }

    function hidePopover() {
        helper.removeClass(els.popover, 'show');
    }

    function showCover(error) {

        if (error) {
            helper.addClass(els.coverError, 'show');
        } else {
            helper.addClass(els.coverSuccess, 'show');
        }
    }

    function hideCover() {
        helper.removeClass(els.coverError, 'show');
        helper.removeClass(els.coverSuccess, 'show');
    }

    /* ====================================== **
    ** Region: external variables               **
    ** ====================================== */

    this.states = {
        ready: 0,
        loading: 1,
        responseSuccess: 2,
        responseError: 3
    };

    /* ====================================== **
    ** Region: external functions               **
    ** ====================================== */

    this.setState = function (state, msg) {

        switch (state) {
            case scope.states.ready:
                hidePopover();
                hideLoader();
                hideCover();

                showButton();
                break;
            case scope.states.loading:
                hideButton();
                hideCover();
                hidePopover();

                showLoader();
                break;

            case scope.states.responseSuccess:
                hideLoader();
                hidePopover(msg);

                showButton();
                showCover(false);
                break;
            case scope.states.responseError:
                hideLoader();

                showButton();
                showPopover(msg);
                showCover(true);
                break;
        }
    };

    /* ====================================== **
    ** Region: internal setup                   **
    ** ====================================== */

    scope = this;
    state = this.states.ready;
    els = {
        btn: helper.getElement(props.name + '-btn'),
        popover: helper.getElement(props.name + '-popover'),
        loader: helper.getElement(props.name + '-loader'),
        coverSuccess: helper.getElement(props.name + '-btn-cover-success'),
        coverError: helper.getElement(props.name + '-btn-cover-error')
    };

    helper.addListener(els.btn, 'click', onClick);
}

module.exports = Button;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var helper = __webpack_require__(7),
    utils = __webpack_require__(2);

function Field(props) {
    if ((typeof props === 'undefined' ? 'undefined' : _typeof(props)) != 'object') {
        props = {};
    }

    /* ====================================== **
    ** Region: internal variable declaration  **
    ** ====================================== */

    var els, hasError, scope;

    /* ====================================== **
    ** Region: internal functions               **
    ** ====================================== */

    function onKeyUp(e) {

        if (e.which == 13 && typeof props.onEnter === 'function') {

            props.onEnter(els.input.value);
        } else if (hasError) {
            scope.isValid();
        }
    }

    function showError(msg) {

        if (!String.isNullOrEmpty(msg)) {

            helper.setText(els.popover, msg);
            helper.addClass(els.popover, 'show');
            helper.addClass(els.input, 'has-error');

            hasError = true;
        }
    }

    function clearError() {

        helper.removeClass(els.popover, 'show');
        helper.removeClass(els.input, 'has-error');

        hasError = false;
    }

    /* ====================================== **
    ** Region: external functions               **
    ** ====================================== */

    this.name = props.name;

    /* ====================================== **
    ** Region: external functions               **
    ** ====================================== */

    this.setValue = function (val) {
        els.input.value = val;
    };
    this.getValue = function () {
        return els.input.value.trim();
    };

    this.isValid = function () {
        var err = utils.first(props.validation, function (validation) {

            if ((typeof validation === 'undefined' ? 'undefined' : _typeof(validation)) == 'object' && typeof validation.func == 'function' && !validation.func(scope.getValue())) {

                showError(validation.msg);
                return true;
            }
        });

        if (!err) {
            clearError();
        }

        return !err;
    };

    this.focus = function () {
        els.input.focus();
    };
    this.reset = function () {
        clearError();
    };

    this.showError = function (msg) {
        showError(msg);
    };

    this.dispose = function () {

        helper.removeListener(els.input, 'keyup', onKeyUp);
        //helper.removeListener(el, 'blur',  onBlur);
    };

    /* ====================================== **
    ** Region: internal setup                   **
    ** ====================================== */

    scope = this;
    hasError = false;
    els = {
        input: helper.getElement(props.name + '-input'),
        popover: helper.getElement(props.name + '-popover')
    };

    helper.addListener(els.input, 'keyup', onKeyUp);
}

module.exports = Field;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helper = __webpack_require__(7),
    utils = __webpack_require__(2);

function Previewer(props) {

    /* ====================================== **
    ** Region: internal variable declaration  **
    ** ====================================== */

    var els, images, index, device;

    /* ====================================== **
    ** Region: internal functions               **
    ** ====================================== */

    function selectDeviceMobile() {
        selectImage(device = 'iphone');
    }
    function selectDeviceTablet() {
        selectImage(device = 'ipad');
    }
    function selectDeviceDesktop() {
        selectImage(device = 'macbookPro');
    }

    function onClose() {
        helper.removeClass(els.container, 'show');
    }
    function onPrev() {
        selectImage(--index);
    }
    function onNext() {
        selectImage(++index);
    }

    function selectImage() {

        if (index >= images.length) {
            index = 0;
        }
        if (index < 0) {
            index = images.length - 1;
        }

        var image = images[index];

        helper.setClass(els.mobileBtn, !image.iphone, 'disabled');
        helper.setClass(els.tabletBtn, !image.ipad, 'disabled');
        helper.setClass(els.desktopBtn, !image.macbookPro, 'disabled');

        if (!device || !image[device]) {
            if (image.iphone) {
                device = "iphone";
            } else if (image.macbookPro) {
                device = "macbookPro";
            } else if (image.ipad) {
                device = "ipad";
            }
        }

        if (device && image[device]) {
            els.display.src = image[device];
        }

        helper.setClass(els.mobileBtn, device == 'iphone', 'active');
        helper.setClass(els.tabletBtn, device == 'ipad', 'active');
        helper.setClass(els.desktopBtn, device == 'macbookPro', 'active');
        helper.setText(els.indexSpan, index + 1);
    }

    /* ====================================== **
    ** Region: external functions               **
    ** ====================================== */

    this.show = function (_images) {
        images = _images;
        index = 0;

        selectImage();

        helper.setText(els.countSpan, _images.length);
        helper.addClass(els.container, 'show');
    };

    /* ====================================== **
    ** Region: internal setup                   **
    ** ====================================== */

    index = 0;

    els = {
        container: helper.getElement('previewer'),
        display: helper.getElement('previewer-display'),
        closeBtn: helper.getElement('previewer-close-btn'),
        prevBtn: helper.getElement('previewer-prev-btn'),
        nextBtn: helper.getElement('previewer-next-btn'),
        mobileBtn: helper.getElement('previewer-mobile-btn'),
        tabletBtn: helper.getElement('previewer-tablet-btn'),
        desktopBtn: helper.getElement('previewer-desktop-btn'),
        indexSpan: helper.getElement('previewer-image-index'),
        countSpan: helper.getElement('previewer-image-count')
    };

    helper.addListener(els.closeBtn, 'click', onClose);
    helper.addListener(els.prevBtn, 'click', onPrev);
    helper.addListener(els.nextBtn, 'click', onNext);
    helper.addListener(els.mobileBtn, 'click', selectDeviceMobile);
    helper.addListener(els.tabletBtn, 'click', selectDeviceTablet);
    helper.addListener(els.desktopBtn, 'click', selectDeviceDesktop);
}

module.exports = Previewer;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(14);
var data = __webpack_require__(6);
var Pages = {
    Contact: __webpack_require__(12),
    Portfolio: __webpack_require__(13)
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
})(function () {

    // application start
    var pages = {
        contact: new Pages.Contact(data.contact),
        portfolio: new Pages.Portfolio(data.portfolio)
    };
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var log = __webpack_require__(22),
    utils = __webpack_require__(2);

var Http = {
    request: function request(url, method, data, type, successCb, errorCb) {

        log.debug("Sending http request: ", url, method, data, type);

        var xhr = new XMLHttpRequest();
        xhr.open(method.toUpperCase(), url, true);
        xhr.setRequestHeader("Accept", "*/*");

        if (type) {
            xhr.setRequestHeader("Content-Type", type);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {

                var response = utils.parse(xhr.response || xhr.responseText);

                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {

                    if (typeof successCb == 'function') {
                        successCb(response);
                    }
                } else if (typeof errorCb == 'function') {

                    errorCb(response, xhr.status);
                }
            }
        };

        xhr.send(data);
    },

    get: function get(url, data, successCb, errorCb) {

        if (data) {
            url = url + Http.objToQueryString(data);
        }

        this.request(url, "GET", null, 'application/json;charset=UTF-8', successCb, errorCb);
    },

    post: function post(url, data, successCb, errorCb) {

        this.request(url, 'POST', JSON.stringify(data), 'application/json;charset=UTF-8', successCb, errorCb);
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

module.exports = Http;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    debug: console.log,
    info: console.log,
    warn: console.log,
    error: console.error
};

/***/ })
/******/ ]);