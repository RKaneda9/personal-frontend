let pug       = require('pug'),
    fs        = require('fs'),
    argv      = require('process').argv,
    parser    = require('./args-parser'),
    webServer = require('./web-server'),
    sass      = require('./sass'),
    config    = require('./config'),
    html      = require('./html'),
    webpack   = require('./webpack'),
    utils     = require('./utils'),
    settings  = require('./settings');

let args = parser.getCmdArgs();

// TODO:
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

utils.createFolder(settings.outputFolder);
sass.compile({ minified: true, unminified: true });
html.build();
webpack.build({
    appName : 'Main', 
    config  : config, 
    watch   : args.watch,
    callback: () => {

    }       
});

if (args.watch) { webServer.start(args.port); }