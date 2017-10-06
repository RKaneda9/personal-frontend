'use strict';

const argv = require('process').argv;

const parser = module.exports = {
    getCmdArgs: function () {

        let args = {
            unminified: false,
            minified  : false,
            watch     : false,
            hash      : false,
            version   : false,
            test      : false,
            port      : 5200
        };

        argv.forEach(function (val, index) {
            val = val.trim();

            switch (val) {

                case 'hash'      : args.hash       = true; break;
                case 'minified'  : args.minified   = true; break;
                case 'unminified': args.unminified = true; break;
                case 'watch'     : args.watch      = true; break;
                case 'test'      : args.test       = true; break;
                default          : parser.parseCmdArg(val, ['version', 'port'], args); break;
            }

        });

        console.log('Command prompt arguments found: ', JSON.stringify(args));

        return args;
    },

    parseCmdArg: function (val, searchArray, args) {

        let search, i, arg;

        if (typeof searchArray === 'string') { searchArray = [searchArray]; }

        for (i = 0; i < searchArray.length; i++) {
            search = searchArray[i];

            if (val.includes(search + '=')) {
                arg = val.substr((search + '=').length).trim();

                if (!!arg) {
                    return (args[search] = arg);
                }
            }
        }

        return false;
    }
};
