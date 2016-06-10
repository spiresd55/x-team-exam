const fs = require("fs"),
    path = require("path"),
    config = require('../../config/index.js');

const p = config.jsonDirectory;

function isValidSearch(searchString) {
    var pattern = /^[a-zA-Z0-9, ]*$/;
    return pattern.test(searchString);
}

//TODO: Create a JSON Exception Error

function loadJSONFilesIntoObjectArray(callback) {
    var objectArray = [];
    fs.readdir(p, readDiretory);
    var files, index;

    function readDiretory(err, _files) {
        files = _files;
        //If there is an error reading the directory then throw an error
        if (err) {
            throw err;
        }

        files.map(mapFiles)
          .filter(filterFiles)
          .forEach(iterateFiles);
    }

    function mapFiles(file) {
        return path.join(p, file);
    }

    function filterFiles(file) {
        return fs.statSync(file).isFile();
    }

    function iterateFiles(file, _index) {
        index = _index;
        fs.readFile(file, readFile);
    }

    function readFile(err, data) {
        //TODO: Add callback here
        if (err) throw err;

        //A raw buffer is returned, this will convert it to JSON
        var str = data.toString();
        try {
            //If the string converts to JSON correctly then add it to the objects array
            var obj = JSON.parse(str);
            objectArray.push(obj);
        }catch(error) {
            //This most likely means there was an issue parsing non valid JSON, this logs the error and continues
            console.error(' JSON PARSING ERROR OCCURED \n ' + error);
            console.log('');
        }

        //If at the final object in the array, then send a callback with a valid response
        if(index === (files.length - 1 )) {
            //Convert the data into a hashmap based on property searching for
            setTimeout(function() {
                var mapOfStructure = [];
                convertStructureToMapBasedOnSearchCriteria(objectArray, mapOfStructure, config.searchCriteria, false);
                callback(mapOfStructure);
            }, 1000);
        }
    }
}

function generateSearchTerms(searchTerms, callback) {
    if(searchTerms.length === 0){
        fs.readFile('tags.txt', readFile);
    }else {
        searchTerms = searchTerms.split(',');
        return callback(searchTerms);
    }

    function readFile(err, data) {
        if(err) {
            throw err;
        }

        var str = data.toString();

        return callback(str.split('\n'));
    }

}

function searchMapAndSort(searchTerms, map) {
    var sortedList = [];
    searchTerms.forEach(function(term) {
       if(map[term]){
         var item = {};
         item.term = term;
         item.count = map[term];
         sortedList.push(item);
       }
    });

    return sortedList.sort((function(a, b) {
        return b.count - a.count;
    }));
}

// This method recursively search through either an array or object structure looking for specific data
// It will keep track of how many times something occurred by keeping it in a Map
function convertStructureToMapBasedOnSearchCriteria(structure, map, criteria, shouldAddToMap) {

    if(structure instanceof Array) {
        //Iterates through an array, if the criteria matches, this will make it in the final hashmap structure
        structure.forEach(function (item) {
            if(item instanceof Array || item instanceof Object){
                convertStructureToMapBasedOnSearchCriteria(item, map, criteria, shouldAddToMap);
            }else if(typeof(item) == 'string' || item instanceof String){
                //If the current Obj.key is equal to criteria, then this will be added to the final map
                if(shouldAddToMap){
                    addToMap(item, map);
                }
            }
        });
    }else if(structure instanceof Object) {
        //Iterates through the properties of an object, and determines whether something should be added to the final map
        Object.keys(structure).forEach(function(key) {
            //If the property matches the key then it should be added to the final map
            if(key === criteria) {
                shouldAddToMap = true;
            } else {
                shouldAddToMap = false;
            }
            if(structure[key] instanceof Array || structure[key] instanceof Object) {
                convertStructureToMapBasedOnSearchCriteria(structure[key], map,criteria, shouldAddToMap);
            }else if(typeof(structure[key]) == 'string' || structure[key] instanceof String){

                if(shouldAddToMap) {
                    addToMap(structure[key], map);
                }
            }
        });
    }
}

//This method will search a map, if value not found add it with a value of one, if found increment the value
function addToMap(value, map){
    if(map[value] === null || map[value] === undefined) {
        map[value] = 1;
    }else{
        map[value] += 1;
    }
}

function writeResults(results) {
    var stream = fs.createWriteStream(config.resultsFile);
    stream.once('open', openStream);

    function openStream(fd){
        var buf = new Buffer(JSON.stringify(results));
        stream.write(buf);
        stream.end();
    }
}

function loadResults(callback) {
    fs.readFile(config.resultsFile, readFile);

    function readFile(err, data) {
        if(err) {
            return callback(err, null);
        }

        var str = data.toString();

        return callback(null, JSON.parse(str));
    }
}

module.exports.isValidSearch = isValidSearch;
module.exports.loadJSONFilesIntoObjectArray = loadJSONFilesIntoObjectArray;
module.exports.searchMapAndSort = searchMapAndSort;
module.exports.generateSearchTerms = generateSearchTerms;
module.exports.writeResults = writeResults;
module.exports.loadResults = loadResults;