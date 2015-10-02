// readfile.js
// asynchronous
var fs = require('fs');

var args = process.argv.slice(1);
var filename = args[1] || args[0];

fs.readFile(filename, function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
    for(i in array) {
        console.log(array[i] + '\n\n');
    }
});
