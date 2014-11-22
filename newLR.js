var lineReader = require('line-reader');
var BST = require('binary-search-tree').AVLTree; 
var LookupBST = new BST();
var BST_INDEX = new BST();

// read all lines:
var ElementID = 0;
lineReader.eachLine('BIG.txt', function(line) {
  	console.log(ElementID);  
	ElementID++;
   	var i = 0; 
   	if(ElementID==4496){console.log(line)}
   	while(line[i] != "-" || i<400){i++; console.log(i,line[i]);}
   	var text = line.substring(i+1); 
   	var words = text.split(" "); 

   	LookupBST.insert(ElementID, text); 
   	words.forEach(function(word){
   		BST_INDEX.insert(word.toLowerCase(), ElementID); 
   	}); 
   	// console.log("endLINE"); 
}).then(function () {
  console.log("DONE"); 
    // var IDs = BST_INDEX.search("eggs"); 
    // IDs.forEach(function(id){
    // 	var val = LookupBST.search(id)[0];
    // 	console.log(id, val); 
    // });
	console.log(ElementID); 
});