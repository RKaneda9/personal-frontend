'use strict';

const
    pug      = require('pug'),
    fs       = require('fs'),
    settings = require('./settings'),
    data     = require('../src/data'),
    {log}    = console;

module.exports = {
    build: function () {
        log('Building html');

        data.minified = true;

        const template1 = pug.compileFile('src/main-compatibility/index.pug');
        const template2 = pug.compileFile('src/main/index.pug');
        const html1Min  = template1(data);
        const html2Min  = template2(data);

        fs.writeFileSync(`${settings.outputFolder}/index-old.html`, html1Min);
        fs.writeFileSync(`${settings.outputFolder}/index.html`,     html2Min);

        data.minified = false;

        const html1Unmin = template1(data);
        const html2Unmin = template2(data);

        fs.writeFileSync(`${settings.outputFolder}/index-old-unminified.html`, html1Unmin);
        fs.writeFileSync(`${settings.outputFolder}/index-unminified.html`,     html2Unmin);

        log('Built html successfully.');
    }
};
