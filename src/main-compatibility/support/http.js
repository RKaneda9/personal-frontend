var log   = require('./log'),
    utils = require('./utils');

var Http = {
	request: function (url, method, data, type, successCb, errorCb) {

    	log.debug("Sending http request: ", url, method, data, type);

		var xhr = new XMLHttpRequest();
		xhr.open(method.toUpperCase(), url, true);
		xhr.setRequestHeader("Accept", "*/*");

		if (type) { xhr.setRequestHeader("Content-Type", type); }

		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {

				var response = utils.parse(xhr.response || xhr.responseText);

				if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {

					if (typeof successCb == 'function') {
						successCb(response);
					}
				}
				else if (typeof errorCb == 'function') {

					errorCb(response, xhr.status);
				}
			}
		};
		 
		xhr.send(data);
	},

	get: function (url, data, successCb, errorCb) {

		if (data) { url = url + Http.objToQueryString(data); }

		this.request(url, "GET", null, 'application/json;charset=UTF-8', successCb, errorCb);
	},

	post: function (url, data, successCb, errorCb) { 

		this.request(url, 'POST', JSON.stringify(data), 'application/json;charset=UTF-8', successCb, errorCb);
	},

	objToQueryString: function (obj) {
        if (!obj) { return ''; }

        return '?' + 
            Object.keys(obj).map(function (key) { 
                return key + '=' + (obj[key] == null ? "" : obj[key]); 
            }).join('&');
    }
};

module.exports = Http;