var utils = {
    foreach: function (array, cb) {
        var i = 0;

        if (array instanceof Array) {
            for (i; i < array.length; i++) {
                if (cb(array[i], i, i) === false) {
                    return i;
                }
            }
        }
        
        else if (typeof array == 'object') {
            for (var key in array) {
                if (cb(array[key], i++, key) === false) {
                    return i;
                }
            }
        }

        return null;
    },

    map: function (array, cb) {
        var mapped = [], obj, i = 0;

           if (array instanceof Array) {
               for (i; i < array.length; i++) {
                   obj = cb(array[i], i, i);
                   if (obj) { mapped.push(obj); }
            }
           }

           else if (typeof array == 'object') {
               for (var key in array) {
                   obj = cb(array[key], i++, key);
                   if (obj) { mapped.push(obj); }
               }
           }
           
        return mapped;
    },

    first: function (array, cb, defVal) {
        var i = 0;

        if (array instanceof Array) {
            for (i; i < array.length; i++) {
                if (cb(array[i], i, i)) {
                    return array[i];
                }
            }
        }
        
        else if (typeof array == 'object') {
            for (var key in array) {
                if (cb(array[key], i++, key)) {
                    return array[key];
                }
            }
        }

        return defVal;;
    },

    parse: function (str) {

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
    },

    removeDashes: function (str) {
        return utils.map(str, function (piece, i) {

            if (i == 0) { return piece; }

            return piece.substring(0, 1).toUpperCase() 
                 + piece.substring(1);

        }).join('');
    }
};

module.exports = utils;