# github-node-cli

This project is a basic command cli for github api 4.

Right now, the only useful command is to retrieve the GitHub user's favourite programming language. 

## How to use

1. Clone this repository: `git clone https://github.com/miguepintor/github-node-cli`
2. Download dependencies:
```bash
npm install
```
3. Gets doc:
```bash
gulp build
```
4. Run it from src folder:
```bash
node .\github.js -h
```

## Available commands

  Usage: github [options] [command]

  Github node cli


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    tokenOwner|to                     Tells the owner of the GitHub token
    guessPrefLanguage|gpl <username>  Guess of the GitHub user's favourite programming language

## Example of usage 
```bash
node .\github.js gpl miguepintor
```
```bash
node .\github.js tokenOwner
```
## Linting

```bash
gulp lint
```

Code that will be validated:

- all **\*.js** files in **src** folder
- all **\*.js** files in **test** folder
- **gulpfile.js**

## Running tests and generating code coverage report

```bash
gulp test
```

Test cases stored in files **test/\*\*/\*.test.js** will be run only

Coverage reports will be generated and stored in folder **docs/coverage**

## Generating jsdoc

```bash
gulp jsdoc
```

Documentation will be generated for **\*.js** files from **src** folder and stored in folder **docs/jsdoc**

## Running all tasks

```bash
gulp
# or
gulp build
```

## Printing all available tasks and theirs arguments

```bash
gulp help
```

## Directory Layout

```
  docs/                  --> build results
    coverage              --> code coverage reports
    jsdoc                 --> documentation generated for source code
  config/
    config.yml            --> application configuration file
  src/                    --> source files for the application
    utilities/
      config.js           --> configuration module
    core/
      queries.js           --> queries file
      query-manager.js     --> helper to use queries
    github.js              --> entry point
  test/                   --> test files for the application
    integration/          --> integration tests
    unit/                 --> unit tests
    .eslintrc             --> configuration file for eslint; these rules
                              will be applied for files in this folder
                              only; created because test cases contain
                              global functions which exports by
                              mocha(describe, it, beforeEach, etc)
  .editorconfig           --> configuration file for code editors to keep style
  .eslintrc               --> configuration file for eslint
  gulpfile.js             --> list of all gulp tasks
  package.json            --> list of project dependencies
```
