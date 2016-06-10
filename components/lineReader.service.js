const readline = require('readline');
const config = require('../config/index.js');
const jsonSearchController = require('../api/jsonSearch/jsonSearch.controller.js');
const jsonSearchService = require('../api/jsonSearch/jsonSearch.service.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function beginReadingUserInput(showIntro, useCustomPrompt) {
    if (showIntro) {
        rl.write(config.programIntro);
    }

    if(useCustomPrompt) {
        rl.setPrompt(config.programPrompt);
    }

    jsonSearchService.loadResults(function(err, results) {
       if(err){
           //TODO: It is most likely just the results.json file has not been created yet
           //console.log(err);
       }

       if(results){
           rl.write("\n#################           PREVIOUS RESULTS         ################ \n");

           results.forEach(function (item) {
               console.log('%s: %d', item.term, item.count);
           });
       }

        //Create empty space and prompt again
        console.log('');
        rl.prompt();

        rl.on('line', (line) => {
            switch(line.trim()) {
                case ':exit':
                    console.log('Exiting the program');
                    process.exit(0);
                    break;
                default:
                    jsonSearchController.searchJSONFiles(rl, line, handleResultsCallback);
                    break;
                }
            rl.prompt();
        }).on('close', () => {
            console.log('Thank you, for searching today!');
            process.exit(0);
         });
    });

    //TODO: Handle this
    function handleResultsCallback(err, results){
      if(err){
        console.log("BOOP");
      }

      if(results) {
        console.log('########## FINAL RESULTS ##########');

        if (results.length === 0) {
          console.log("No tags found matching your search terms")
        } else {
          results.forEach(function (item) {
            console.log('%s: %d', item.term, item.count);
          });

          jsonSearchService.writeResults(results);

        }
      }

        console.log();
        rl.prompt();

    }

}

module.exports.beginReadingUserInput = beginReadingUserInput
