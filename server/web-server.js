var fs = require('fs');
var ws = require("local-web-server");

var localWebServer = {
    start: function (port) {

        var config, str;

        try {
            str = fs.readFileSync('.local-web-server.json', 'utf8');

            try {
                config = JSON.parse(str);
                if (config.port && !port) {
                    port = config.port;
                }
            }
            catch (err) {
                return console.error("Unable to retrieve local web server settings from .local-web-server.json", err);
            }
            
            ws(config).listen(port);
        }
        catch (ex) { 
            console.log('Could not start web server: ', ex.message);
        }
    }
};

module.exports = localWebServer;