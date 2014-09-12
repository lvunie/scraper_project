var fs = require('fs');
var path = 'file.json',

buffer = new Buffer("some content\n");

fs.open(path, 'w', function(err, fd) {
    if (err) {
        throw 'error opening file: ' + err;
    } else {
        fs.write(fd, buffer, 0, buffer.length, 100, function(err) {
            if (err) throw 'error writing file: ' + err;
            fs.close(fd, function() {
                console.log('file written');
            })
        });
    }
})
