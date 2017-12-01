'use strict';

const QueriesDefinitions = require('../core/queries');
const QueryManager = require('../core/query-manager');

module.exports = async function (request, response) {
  try {    
    let username = request.params.username;
    let language = await QueryManager.doAQuery(QueriesDefinitions.preferredLanguage.addArgs(username));
    response.send(language);
  }catch (e) {
    response.status(500).send({ status: 500, message: e.message });
  } 
};