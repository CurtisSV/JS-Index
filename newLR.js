var lineReader = require('line-reader');
var BST = require('binary-search-tree').AVLTree; 
var LookupBST = new BST();
var BST_INDEX = new BST();

// read all lines:
var ElementID = 0;
lineReader.eachLine('BIG.txt', function(line) {  
  	if(ElementID % 1000 == 0){console.log(ElementID)}
  	// console.log(line); 
	ElementID++;
   	var i = 0; 
   	while(line[i] != "-" && i<400){i++; }
   	// console.log(line); 
   	var text = line.substring(i+1); 
   	var words = text.split(" "); 

   	LookupBST.insert(ElementID, text); 
   	words.forEach(function(word){
   		BST_INDEX.insert(word.toLowerCase(), ElementID); 
   	}); 
   	// console.log("endLINE"); 
}).then(function () {
  console.log("DONE"); 
	console.log(ElementID); 
});