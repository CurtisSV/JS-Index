var lineReader = require('line-reader');
var BST = require('binary-search-tree').AVLTree; 
var LookupBST = new BST();
var BST_INDEX = new BST();
var _ = require("underscore"); 

var sys = require("sys");
var stdin = process.openStdin();

// read all lines:
var ElementID = 0;
var indexStart = Date.now(); 
lineReader.eachLine('tldrpg.txt', function(line) {  
  	if(ElementID % 1000 == 0){console.log(ElementID)}
	ElementID++;
   	var i = 0; 
   	while(line[i] != "-" && i<400){i++; }
   	var text = line.substring(i+1); 
   	var words = text.split(" "); 

   	LookupBST.insert(ElementID, text); 
   	words.forEach(function(word){
   		BST_INDEX.insert(word.toLowerCase(), ElementID); 
   	});  
}).then(function () {
  var indexEnd = Date.now();
	console.log("DONE Indexing " + ElementID + " bullets in " + (indexEnd-indexStart) + " milliseconds"); 
  console.log("pleaseEnter a Query"); 
  stdin.addListener("data", replProcess);
});


var replProcess = function(d) { 
  var query = d.toString().substring(0, d.length-1).toLowerCase();
  var start = Date.now();
  console.log("you entered: [" + query + "] at " + start);


  var finalIDs = [];
  var orPhrases = query.split("or");  
  // console.log("ORPHRASES"); 
  // console.log(orPhrases); 
  orPhrases.forEach(function(andPhrase){
    var returnedAndIds = processAndPhrase(andPhrase)
    // console.log("\nreturnedAndIds", JSON.stringify(returnedAndIds)); 
    finalIDs = _.union(finalIDs, returnedAndIds); 
  }); 
  // console.log("afterUnioning"); 
  // console.log(JSON.stringify(finalIDs)); 

  finalIDs.forEach(function(ID){
    console.log("\n\n", LookupBST.search(ID)); 
  }); 
  var end = Date.now(); 
  console.log("returned "+finalIDs.length +"results in " + (end-start) + " milliseconds")
  console.log("\n\nplease enter another query:"); 

}



var processAndPhrase = function(phrase){
  // console.log("andPhrase", phrase); 
  var words=phrase.split(" ");

  var andIDArrs = []; 
  var notIDArrs = []; 
  words.forEach(function(word){
    if(word == ""){return;}
    var arrPointer; 
    if(word[0]=="-"){
      word = word.substring(1); 
      arrPointer = notIDArrs; 
    }
    else{
      arrPointer = andIDArrs;
    }
    var IDs = BST_INDEX.search(word);
    arrPointer.push(IDs);
  }); 
  // console.log("andIDs", JSON.stringify(andIDArrs)); 
  // console.log("notIds", JSON.stringify(notIDArrs)); 


  var finalIDs = intersectArrOfArrs(andIDArrs); 
  // console.log("\nafterIntersection"); console.log(JSON.stringify(finalIDs)); 

  var finalIDs = _.difference(_.flatten(finalIDs), _.flatten(notIDArrs)); 
  // console.log("afterNOTFiltering"); console.log(JSON.stringify(finalIDs)); 

  return finalIDs; 
}

var intersectArrOfArrs = function(arrOfArrs){
  var result = arrOfArrs[0]; 
  for(var i  = 1; i<arrOfArrs.length; i++){
    result = _.intersection(result, arrOfArrs[i]); 
  }
  return result; 
}









