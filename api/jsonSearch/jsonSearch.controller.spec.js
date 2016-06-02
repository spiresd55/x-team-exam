var proxyquire = require('proxyquire').noCallThru();

var mockJsonSearchService = {
    isValidSearch: function(search) {
        if(search === 'test' || search === 'one') {
            return true
        }else {
            return false;
        }
    },
    loadJSONFilesIntoObjectArray: function(cb){
        var mockResults = [
            {term: 'test', count: 4},
            {term: 'test2', count: 6}
        ];
        cb(mockResults);
    },
    generateSearchTerms: function(terms, cb) {
        if(terms ==='one') {
            throw new Error('test error');
        }
        expect(terms).toBe('test');
        cb('test');
    },
    searchMapAndSort: function(terms, results) {
        expect(terms).toBe('test');
        expect(results.length).toBe(2);
        return results;
    },
    writeResults: function(results) {
        expect(results.length).toBe(2);
    }
};

var mockLineReader = {
    prompt: function() {

    }
};

var jsonSearchController = proxyquire('./jsonSearch.controller.js',{
    './jsonSearch.service.js': mockJsonSearchService
});

describe('JSON Search Controller Test Specification', function(){
    it('should successfully search the JSON', function(){
        jsonSearchController.searchJSONFiles(mockLineReader, 'test');
    });
    it('should error out', function(){
        try {
            jsonSearchController.searchJSONFiles(mockLineReader, 'test2');
        }catch(err) {
            expect(err).toBeDefined();
        }
    });

    it('should catch error within fucntion', function(){
        jsonSearchController.searchJSONFiles(mockLineReader, 'one');

    });
});
