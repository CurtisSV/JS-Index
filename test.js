var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('test.txt');

lr.on('error', function (err) {
    // 'err' contains error object
});

lr.on('line', function (line){
   	var i = 0; 
   	while(line[i] != "-"){i++;}
   	console.log("i=", i); 
});

lr.on('end', function () {
    // All lines are read, file is closed now.
});