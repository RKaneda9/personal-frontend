let sass     = require('node-sass'),
    fs       = require('fs'),
    settings = require('./settings'),
    utils    = require('./utils');

module.exports = {
    compile: ({ minified, unminified, watch }) => {

        let stylesInputFiles  = ["main.scss", "main-compatibility.scss"];
        let stylesInputPath   = "lib/styles/";
        let stylesOutputPath  = `${settings.outputFolder}/css/`; //styles.css";
        let stylesIncludePath = "lib/styles/";
        let result            = null;

        utils.createFolder(stylesOutputPath);

        stylesInputFiles.forEach(file => {

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