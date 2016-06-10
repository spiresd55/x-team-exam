const jsonSearchService = require('./jsonSearch.service.js');

function searchJSONFiles(lineReader, searchTerms) {
    if(!jsonSearchService.isValidSearch(searchTerms)){
        throw new Error('INVALID SEARCH TERMS');
    }

    jsonSearchService.generateSearchTerms(searchTerms, searchTermsCallback);


    function searchTermsCallback(terms) {
        console.log('Searching for the following terms `' + terms + '`');
        searchTerms = terms;
        jsonSearchService.loadJSONFilesIntoObjectArray(jsonFilesCallback);
    }

    function jsonFilesCallback(results) {
        results = jsonSearchService.searchMapAndSort(searchTerms, results);
        console.log('########## FINAL RESULTS ##########');

        if(results.length === 0){
            console.log("No tags found matching your search terms")
        }else {
            results.forEach(function (item) {
                console.log('%s: %d', item.term, item.count);
            });

            jsonSearchService.writeResults(results);
        }

        console.log();
        lineReader.prompt();
    }

}

module.exports.searchJSONFiles = searchJSONFiles;