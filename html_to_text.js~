
var htmlToText = require('html-to-text');

htmlToText.fromFile(path.join(/home/, 'Welcome to Web Presence in China | Web Presence in China.html'), {
    tables: ['#invoice', '.address']
}, function(err, text) {
    if (err) return console.error(err);
    console.log(text);
});

