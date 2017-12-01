'use strict';

/**
 * Represents a query.
 */
class Query{
 
  /**
   * Creates a query.
   * @param {function} content Function which returns the query string.
   * @param {function} outputParserFunction Function to parse the expected output object after run the query.
   */
  constructor(content, outputParserFunction){
    this._content = content;
    this._outputParserFunction = outputParserFunction;
  }

  /**
   * Apply the content function tu return the query string.
   * @return {string} Query string.
   */
  getContent(){
    return this._content.apply(this, this._args);
  }

  /**
   * Parses the expected output object to retrieve a summary string.
   * @param {object} output Output object which comes from the API.
   * @return {string} Summary string.
   */
  parseOutput(output){
    return this._outputParserFunction(output);
  }

  /**
   * Adds the necessary arguments to the query.
   * @return {object} Returns itself with arguments.
   */
  addArgs(){
    this._args = arguments;
    return this;
  }
}

/**
 * Object containing the current queries.
 */
const queries = {
  tokenOwner: new Query(
    () => {return `{viewer{login}}`;},
    (output) => {return output.data.viewer.login;}),
  preferredLanguage: new Query( 
    (username) => {
      return `{user(login:"${username}"){
        repositories(first:100){
          nodes {
            primaryLanguage{
              name
            }
          }
        }
      }}`;
    },
    (output) => {
      let language;

      let counts = {};
      //iterates over all the user repos collecting the ocurrences in an object called counts.
      for(let repo of output.data.user.repositories.nodes) {
        if(repo.primaryLanguage && repo.primaryLanguage.name){
          let language = repo.primaryLanguage.name;
          let ocurrences = counts[language];
          if(ocurrences){
            counts[language] = ++ocurrences;
          } else {
            counts[language] = 1;
          }
        }
      }

      let keys = Object.keys(counts);
      if(keys.length > 0) {
        //reduce the object (counts) to the max.
        language = keys.reduce(function(a, b){ return counts[a] > counts[b] ? a : b; });
      }

      return language;
    })  
};

module.exports = queries;
