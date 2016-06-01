const fs = require("fs"),
    path = require("path");

const p = "./data";



function isValidSearch(searchString) {
    return true;
}

function convertJSONObjectsOnFileIntoAMap() {

}

function loadJSONFilesIntoObjectArray(callback) {
    var objectArray = [];
    fs.readdir(p, function (err, files) {
       console.log('FILES');
        console.log(files);
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
                if (err) throw err;
                //A raw buffer is returned, this will convert it to JSON
                //console.log(data.toJSON());
                //console.log('String: ' + data.toString());
                var str = data.toString();
                try {
                    var obj = JSON.parse(str);
                    objectArray.push(obj);
                    console.log('valid JSON');
                    console.log(objectArray);
                }catch(error) {
                    console.error('ERROR OCCURED \n ' + error);
                }

                console.log(index);
                console.log(files.length);
               if(index === (files.length - 1 )) {
                   console.log('Made it in here');
                   callback(objectArray);
               }
               // console.log(JSON.parse(data.toString()));
            });
            console.log('first');
        });

       // console.log('second');

    });
}

module.exports.isValidSearch = isValidSearch;
module.exports.loadJSONFilesIntoObjectArray = loadJSONFilesIntoObjectArray;