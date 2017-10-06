'use strict';

const
    sass     = require('node-sass'),
    fs       = require('fs'),
    settings = require('./settings'),
    utils    = require('./utils');

module.exports = {
    compile: ({ minified, unminified, watch }) => {

        const stylesInputFiles  = ["main.scss", "main-compatibility.scss"];
        const stylesInputPath   = "lib/styles/";
        const stylesOutputPath  = `${settings.outputFolder}/css/`; //styles.css";
        const stylesIncludePath = "lib/styles/";

        utils.createFolder(stylesOutputPath);

        stylesInputFiles.forEach(file => {
            let result;

            if (unminified) {
                result = sass.renderSync({
                    file:        stylesInputPath + file,
                    outFile:     stylesOutputPath,
                    outputStyle: "nested",
                    sourceMap:   false
                });

                fs.writeFileSync(`${stylesOutputPath}${file.split('.')[0] + '.css'}`, result.css);
            }

            if (minified || !unminified) {
                result = sass.renderSync({
                    file:        stylesInputPath + file,
                    outFile:     stylesOutputPath,
                    outputStyle: "compressed",
                    sourceMap:   false
                });

                fs.writeFileSync(`${stylesOutputPath}${file.split('.')[0] + '.min.css'}`, result.css);
            }
        });
    }
};
