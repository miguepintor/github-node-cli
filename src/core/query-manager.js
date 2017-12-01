'use strict';

const GithubGraphQLApi = require('node-github-graphql');
const {get} = require('../utilities/config');
const api = new GithubGraphQLApi({
  token: get('github-api-token')
});

/**
 * Manages the queries.
 */
class QueryManager{
  /**
   * Executes a query.
   * @param {object} query Query object to be executed.
   * @return {string} Parsed query result or error.
   */
  static async doAQuery(query){
    try{
      let output = await api.query(query.getContent(), {});
      let parsedOutput = query.parseOutput(output);

      if (process.env.NODE_ENV !== 'test') {
        //avoid logs on test
        console.log(parsedOutput);
      }

      return parsedOutput;
    } catch (err) {
      //the library is internally login the errors
      return err;
    } 
  }
}

module.exports = QueryManager;