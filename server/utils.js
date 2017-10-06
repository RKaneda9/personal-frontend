'use strict';

const fs = require('fs');

const utils = module.exports = {

    appendVersion: (fileName, version) => {
        return fileName + '?v=' + version;
    },

    createFolder: (path) => {
        if (!fs.existsSync(path)) {

            console.log('Creating folder: ', path);

            let pieces   = path.split('/');
            let location = "";

            utils.foreach(pieces, function (piece) {

                // if piece is empty, we've reached the end of the path
                // return early and break out of loop
                if (!piece) { return false; }

                location += location ? `/${piece}` : piece;

                if (!fs.existsSync(location)) {
                    fs.mkdirSync(location);
                }
            });
        }
    },

    removeFolder: (path) => {
        if (fs.existsSync(path)) {

            console.log('Removing folder: ', path);

            fs.readdirSync(path).forEach(function (file,index) {
                let curPath = path + "/" + file;

                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    utils.removeFolder(curPath);
                }
                else { // delete file
                    fs.unlinkSync(curPath);
                }

            });

            fs.rmdirSync(path);
        }
        else {
            console.log("DIRECTORY DOES NOT EXIST: " + path);
        }
    },

    foreach: (array, callback) => {

        if (typeof array != 'object') { return; }

        const keys = Object.keys(array);

        for (let i = 0; i < keys.length; i++) {
            if (callback(array[keys[i]], i, keys[i]) === false) {
                return i;
            }
        }
    },

    first: (array, func, defVal) => {

        if (typeof array != 'object') { return defVal; }

        const keys = Object.keys(array);

        for (let i = 0; i < keys.length; i++) {
            if (func(array[keys[i]], i)) {
                return array[keys[i]];
            }
        }

        return defVal;
    },

    map: (array, func) => {

        if (typeof array != 'object') { return []; }

        const keys = Object.keys(array);
        let mapped = [], val, i;

        for (i = 0; i < keys.length; i++) {
            val = func(array[keys[i]], i, keys[i]);
            if (val) { mapped.push(val); }
        }

        return mapped;
    },

    mapObject: (obj, func) => {

        let mapped = {}, i;

        if (typeof array != 'object') { return mapped; }

        const keys = Object.keys(obj);

        for (i = 0; i < keys.length; i++) {
            if (func(mapped, obj[keys[i]], keys[i], i) === false) {
                break;
            }
        }

        return mapped;
    }
};
