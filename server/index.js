'use strict';

const
    pug       = require('pug'),
    fs        = require('fs'),
    argv      = require('process').argv,
    parser    = require('./args-parser'),
    webServer = require('./web-server'),
    sass      = require('./sass'),
    config    = require('./config'),
    html      = require('./html'),
    webpack   = require('./webpack'),
    utils     = require('./utils'),
    settings  = require('./settings'),
    data      = require('../src/data');

const args = parser.getCmdArgs();

utils.createFolder(settings.outputFolder);
sass.compile({ minified: true, unminified: true });
html.build();
webpack.build({
    appName : 'Main',
    config  : config,
    watch   : args.watch
});

if (args.watch) { webServer.start(args.port); }
