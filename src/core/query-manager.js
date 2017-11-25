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
   * @return {void}
   */
  static async doAQuery(query){
    try{
      let output = await api.query(query.getContent(), {});
      console.log(query.parseOutput(output));
    } catch (err) {
      console.log(err.message);
    } 
  }
}

module.exports = QueryManager;