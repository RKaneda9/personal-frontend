const utils = {
	foreach: (array, callback) => {

        if (typeof array != 'object') { return; }

        var keys = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            if (callback(array[keys[i]], i, keys[i]) === false) {
                return i;
            }
        }
    },

    first: (array, func, defVal) => {

        if (typeof array != 'object') { return defVal; }

        var keys = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            if (func(array[keys[i]], i)) {
                return array[keys[i]];
            }
        }

        return defVal;
    },

    map: (array, func) => {

    	if (typeof array != 'object') { return []; }

    	var mapped, keys, val;

    	mapped = [];
        keys   = Object.keys(array);

        for (var i = 0; i < keys.length; i++) {
            var val = func(array[keys[i]], keys[i], i);
            if (val) { mapped.push(val); }
        }

        return mapped;
    },

    mapObject: (obj, func) => {

        var mapped = {};

        if (typeof array != 'object') { return mapped; }

        var keys = Object.keys(obj);

        for (var i = 0; i < keys.length; i++) {
            if (func(mapped, obj[keys[i]], keys[i], i) === false) {
                break;
            }
        }

        return mapped;
    },

    safeJsonParse: function (str) {

        var obj = {};
        
        if (str) {
            try {
                obj = JSON.parse(str);
            }
            catch (ex) {
                // TODO: log error
            }
        }

        return obj;
    }
};

export default utils;