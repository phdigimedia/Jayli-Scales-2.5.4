'use strict';

var fs = require('fs');
var sass = require('node-sass');

sass.render({
  file: './baseline.scss'
}, function(error, result) {
  if (error) {
    console.log("Error compiling SASS:", error.status, error.column, error.message, error.line);
    return;
  }

  // Output example document
  var template = fs.readFileSync('./scripts/template.html').toString();
  var example = template.replace('{{styles}}', result.css.toString());
  fs.writeFileSync('./example.html', example);
});
