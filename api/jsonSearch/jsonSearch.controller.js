const jsonSearchService = require('./jsonSearch.service.js');

function searchJSONFiles(lineReader, searchTerms) {
    if(!jsonSearchService.isValidSearch(searchTerms)){
        throw new Error('INVALID SEARCH TERMS');
    }

    try {
        jsonSearchService.loadJSONFilesIntoObjectArray(function (results) {

            jsonSearchService.generateSearchTerms(searchTerms, function (terms) {

                console.log('Searching for the following terms `' + terms + '`');

                results = jsonSearchService.searchMapAndSort(terms, results);
                console.log('########## FINAL RESULTS ##########');

                results.forEach(function (item) {
                    console.log('%s: %d', item.term, item.count);
                });

                jsonSearchService.writeResults(results);

                console.log();
                lineReader.prompt();
            });

        });
    }catch(error){
        console.error('Something went wrong \n ' + error);
    }
}

module.exports.searchJSONFiles = searchJSONFiles;