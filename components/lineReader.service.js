const readline = require('readline');
const config = require('../config/index.js');
const jsonSearchController = require('../api/jsonSearch/jsonSearch.controller.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function beginReadingUserInput(showIntro, useCustomPrompt) {
    if (showIntro) {
        rl.write(config.programIntro);
        //console.log(config.programIntro);
    }

    if(useCustomPrompt) {
        //rl.setPrompt('search > ');
        rl.setPrompt(config.programPrompt);
    }

    //Create empty space and prompt again
    console.log('');
    rl.prompt();

    rl.on('line', (line) => {
        switch(line.trim()) {
            case ':add':
                console.log('Adding new files to the server!');
                break;
            case ':exit':
                console.log('Exiting the program');
                process.exit(0);
                break;
            default:
                console.log('Searching for the following terms `' + line.trim() + '`');
                jsonSearchController.searchJSONFiles(rl, line);
                break;
        }
        rl.prompt();
    }).on('close', () => {
        console.log('Thank you, for searching today!');
        process.exit(0);
    });
}

module.exports.beginReadingUserInput = beginReadingUserInput
