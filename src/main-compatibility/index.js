// var fs = require('fs');
// var content = fs.readFileSync('data.json', 'utf8');
// var data = JSON.parse(content);

// var template = require('pug-loader!./main.pug');
// var html = template(data.home);

// console.log(html);

// fs.writeFileSync('temp.html', html);

var pug = require('pug');
var fs  = require('fs');
var content = fs.readFileSync('data.json', 'utf8');
var data = JSON.parse(content);

var template = pug.compileFile('src/main-compatibility/index.pug');

var html = template(data);

console.log(html);

fs.writeFileSync('temp.html', html);