let webpack = require('webpack');

module.exports = {

    build: ({ appName, config, watch, callback }) => {

        compiler = webpack(config);
        resFunc  = (err, stats) => {

            console.log(stats.toString({ colors: true }) + "\n");

            if (err) { return console.error("Error building " + appName, err); }

            else if (typeof callback == 'function') {
                callback();
            }
        };

        if (watch) {
            return compiler.watch({ aggregateTimeout: 300 }, resFunc);
        }
        else {
            return compiler.run(resFunc);
        }
    }
};