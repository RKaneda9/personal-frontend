'use strict';

const fs = require('fs');
const ws = require("local-web-server");

module.exports = {
    start: function (port) {

        let config, str;

        try {
            str    = fs.readFileSync('.local-web-server.json', 'utf8');
            config = JSON.parse(str);
        }
        catch (err) {
            return console.error("Unable to retrieve local web server settings from .local-web-server.json", err);
        }

        try {
            if (config.port && !port)
                port = config.port;

            ws(config).listen(port);
        }
        catch (ex) {
            console.log('Could not start web server: ', ex.message);
        }
    }
};
