
//var file = __dirname + '/test.json';
 
//fs.readFile(file, 'utf8', function (err, data) {
//if (err) {
//console.log('Error: ' + err);
//return;
//}
 
//data = JSON.parse(data);
 
//console.dir(data);
//});
//////////////////////////////////////////////////////////////////////

var fs = require('fs');
var file = __dirname + '/output.json';
//var file = __dirname + '/config.json';

var list = file["web_address"];

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  data = JSON.parse(data);

  console.dir(data);
});
