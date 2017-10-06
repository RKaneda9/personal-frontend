'use strict';

const webpack = require('webpack');

module.exports = {
    build: ({ appName, config, watch, callback }) => {

        const compiler = webpack(config);
        const resFunc  = (err, stats) => {

            console.log(stats.toString({ colors: true }) + "\n");

            if (err) { return console.error("Error building " + appName, err); }

            else if (typeof callback == 'function') {
                callback();
            }
        };

        return watch
          ? compiler.watch({ aggregateTimeout: 300 }, resFunc)
          : compiler.run(resFunc);
    }
};
