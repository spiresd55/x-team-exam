const jsonSearchService = require('./jsonSearch.service.js');

function searchJSONFiles(lineReader, searchTerms, callback) {
    //TODO: Propagate this error correctly
    console.log("HERE I AM");
    console.log(searchTerms);
    if(!jsonSearchService.isValidSearch(searchTerms)){
        throw new Error('INVALID SEARCH TERMS');
    }

    jsonSearchService.generateSearchTerms(searchTerms, searchTermsCallback);

    function searchTermsCallback(err, terms) {
        if(err){
            return callback(err, null);
        }
        console.log('Searching for the following terms `' + terms + '`');
        searchTerms = terms;
        jsonSearchService.loadJSONFilesIntoObjectArray(jsonFilesCallback);
    }

    function jsonFilesCallback(err, results) {
        if(err){
          return callback(err, null);
        }

        results = jsonSearchService.searchMapAndSort(searchTerms, results);

        return callback(null, results);
        /*console.log('########## FINAL RESULTS ##########');

        if(results.length === 0){
            console.log("No tags found matching your search terms")
        }else {
            results.forEach(function (item) {
                console.log('%s: %d', item.term, item.count);
            });

            jsonSearchService.writeResults(results);

        }*/

        //console.log();
        //lineReader.prompt();
    }

}

module.exports.searchJSONFiles = searchJSONFiles;