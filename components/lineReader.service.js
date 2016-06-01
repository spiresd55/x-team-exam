const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*rl.question('What do you think of Node.js? ', (answer) => {
 // TODO: Log the answer in a database
 console.log('Thank you for your valuable feedback:', answer);

 rl.close();
 });*/
/*rl.setPrompt('search > ');
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
    console.log('Say what? I might have heard `' + line.trim() + '`');
    break;
}
rl.prompt();
}).on('close', () => {
    console.log('Have a great day!');
process.exit(0);
});*/

function beginReadingUserInput(showIntro, useCustomPrompt) {
    if (showIntro) {
        rl.write('#################Welcome to the JSON search experience#################\n');
        rl.write('This program will search through all the JSON files on the server. \n \n \n ');
        rl.write('#################                Options             ################# \n');
        rl.write('(1) Provide comma separated search terms to search for. \n');
        rl.write('(2) Type ":exit" to exit the program \n');
        rl.write('(3) Type ":add" to add a new JSON file to the server \n');
    }

    if(useCustomPrompt) {
        rl.setPrompt('search > ');
    }

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
        console.log('Say what? I might have heard `' + line.trim() + '`');
        break;
    }
    rl.prompt();
}).on('close', () => {
        console.log('Have a great day!');
    process.exit(0);
});
}

module.exports.beginReadingUserInput = beginReadingUserInput
