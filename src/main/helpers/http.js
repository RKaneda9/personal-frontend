import Deferred from './deferred';
import log      from './log';
import utils    from './utils';

const http = {
	request: (url, method, data, type) => {
		log.debug("Sending http request: ", url, method, data, type);

    	let d   = new Deferred();
		let xhr = new XMLHttpRequest();
		xhr.open(method.toUpperCase(), url, true);
		xhr.setRequestHeader("Accept", "*/*");

		if (type) { xhr.setRequestHeader("Content-Type", type); }

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {

				if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {

					var response = utils.safeJsonParse(xhr.response || xhr.responseText);

					d.resolve(response);
				}
				else {

					d.reject(xhr.statusText || xhr.responseText);
				}
			}
		};
		 
		xhr.send(data);

		return d.promise;
	},

	get: (url, data) => {

		if (data) { url = url + Http.objToQueryString(data); }

		return http.request(url, "GET", null, 'application/json;charset=UTF-8');
	},

	post: (url, data) => { 

		return http.request(url, 'POST', JSON.stringify(data), 'application/json;charset=UTF-8');
	},

	objToQueryString: (obj) => {
        if (!obj) { return ''; }

        return '?' + 
            Object.keys(obj).map(function (key) { 
                return key + '=' + (obj[key] == null ? "" : obj[key]); 
            }).join('&');
    }
};

export default http;