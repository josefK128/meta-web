// readline.js
var readline = require('readline');
var fs = require('fs');

var args = process.argv.slice(1);
var filename = args[1] || args[0];

var rl = readline.createInterface({
      input : fs.createReadStream(filename),
      output: process.stdout,
      terminal: false
})
rl.on('line',function(line){
     console.log(line + '\n\n') //or parse line
})
