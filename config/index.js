// This file will contain custom configurations for the project
//In a production project, this file could be overwritten by environmental properties
var config = {
    programIntro: '#################Welcome to the JSON search experience#################\n' +
    'This program will search through all the JSON files on the server. \n \n \n' +
    '#################                Options             ################# \n' +
    '(1) Provide comma separated search terms to search for. \n' +
    '(2) Type ":exit" to exit the program \n',
    programPrompt: 'search >',
    searchCriteria: 'tags',
    jsonDirectory: './data',
    resultsFile: 'results.json'
}

module.exports = config;
