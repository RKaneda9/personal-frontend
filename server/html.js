let pug      = require('pug'),
    fs       = require('fs'),
    settings = require('./settings');

const data  = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const {log} = console;

module.exports = {
    build: function () {
        log('Building html');

        data.minified = true;

        let template1 = pug.compileFile('src/main-compatibility/index.pug');
        let template2 = pug.compileFile('src/main/index.pug');
        let html1     = template1(data);
        let html2     = template2(data);

        fs.writeFileSync(`${settings.outputFolder}/index-old.html`, html1);
        fs.writeFileSync(`${settings.outputFolder}/index.html`,     html2);

        data.minified = false;

        html1 = template1(data);
        html2 = template2(data);

        fs.writeFileSync(`${settings.outputFolder}/index-old-unminified.html`, html1);
        fs.writeFileSync(`${settings.outputFolder}/index-unminified.html`,     html2);

        log('Built html successfully.');
    }
};