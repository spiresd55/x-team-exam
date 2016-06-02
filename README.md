Node.js exam
====

Project Setup
----

- Clone local repo of project: git clone https://github.com/spiresd55/x-team-exam.git
- Run the following commands: npm install, npm install gulp-cli --g
- The server can be started in the following ways: gulp serve, gulp, or node server.js
  - Note: Gulp serve allows nodemon to restart the server everytime there is a code change
- To run tests run the following commands: gulp test

Project Notes
----

- I only wrote one test case to 100%, just to show an example of a unit test
  - If this was a official feature branch then I would write 100% code coverage for all code
  - Test files follow this pattern **.spec.js
  - When running gulp test istanbul will display a nice report
  - More detailed reports can be found in the coverage/ directory
- Results for previous searches are stored in a file called results.json
- The gulp file enforces 100%. If this project was deployed to travis.cli. 100% code coverage would be necessary
- As a javascript developer, I also have experience building angularjs web apps. I am more of a full stack developer.
- The package.json file includes things besides the nodejs core modules, but the things included were used to add gulp tasks(Testing, and starting the server)

Quick practical exam for node.js candidates.

Requirements
----

- allow the user to supply a CLI argument containing a comma-separated list of tags
  - if no argument is given, load `tags.txt` to get an array of tags.
- for each of these tags, find out how many times that tag appears within the objects in `data/*.json` (_note:_ objects can be nested).
- final output should be formatted like this (sorted by most popular tag first):

```
pizza     15
spoon     2
umbrella  0
cats      0
```

- cache the result so that subsequent runs can return the result immediately without needing to process the files.
- use only core modules
- use the asynchronous variants of the file IO functions (eg. use `fs.readFile` not `fs.readFileSync`).
- if any of the data files contain invalid JSON, log the error with `console.error` and continue, ignoring that file.
- you can use any version of node, however your solution must use plain callbacks rather than promises.
