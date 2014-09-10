var fs = require('fs');

var myData = {
  name:'test',
  version:'1.0'
}

var outputFilename = '/tmp/my.json';

fs.writeFile('my.json', JSON.stringify(myData, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
});
