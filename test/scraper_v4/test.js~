
var fs = require('fs');
var file = __dirname + '/URL_output.json';

var list = file["web_address"];

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  data = JSON.parse(data);

  console.dir(data);
});
