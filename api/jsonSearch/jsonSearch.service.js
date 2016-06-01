const fs = require("fs"),
    path = require("path");

const p = "./data";



function isValidSearch(searchString) {
    return true;
}

function searchJSONInFileSystem() {
    loadJSONFilesIntoObjectArray(function(result) {
        console.log('THE RESULT IS: ');
        console.log(result);

        searchTerms = searchTerms.split(',');

        if(searchTerms.length === 0){

        }else {

        }
    });
}

function loadJSONFilesIntoObjectArray(callback) {
    var objectArray = [];
    fs.readdir(p, function (err, files) {
        //If there is an error reading the directory then throw an error
        if (err) {
            throw err;
        }

        files.map(function (file) {
            return path.join(p, file);
        }).filter(function (file) {
            return fs.statSync(file).isFile();
        }).forEach(function (file, index) {
            console.log("%s (%s)", file, path.extname(file));
            fs.readFile(file, (err, data) => {
                //TODO: CATCH THIS ERROR
                if (err) throw err;

               //A raw buffer is returned, this will convert it to JSON
                var str = data.toString();
                try {
                    //If the string converts to JSON correctly then add it to the objects array
                    var obj = JSON.parse(str);
                    objectArray.push(obj);
                }catch(error) {
                    //This most likely means there was an issue parsing non valid JSON, this logs the error and continues
                    console.error('ERROR OCCURED \n ' + error);
                }

               //If at the final object in the array, then send a callback with a valid response
               if(index === (files.length - 1 )) {
                   callback(objectArray);
               }

            });
        });
    });
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

//This method will search a hashmap, if value not found add it with a value of one, if found increment the value
function addToMap(value, map){
    if(map[value] === null || map[value] === undefined) {
        map[value] = 1;
    }else{
        map[value] += 1;
    }
}


module.exports.isValidSearch = isValidSearch;
module.exports.loadJSONFilesIntoObjectArray = loadJSONFilesIntoObjectArray;