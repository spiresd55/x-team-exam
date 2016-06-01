const jsonSearchService = require('jsonSearch.service.js');

function searchJSONFiles(lineReader, searchTerms) {
    //TODO: Check for bad formatted search terms
    if(jsonSearchService.isValidSearch(searchTerms)){
        //TODO: If there is return the ERROR callback to the readline prompt
    }

    //Turn the search terms string into an array
    searchTerms = searchTerms.split(',');

    if(searchTerms.length === 0){

    }else {

    }
}