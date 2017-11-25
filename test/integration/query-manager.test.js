'use strict';

const QueriesDefinitions = require('../../src/core/queries');
const QueryManager = require('../../src/core/query-manager');

describe('query-manager.js', () => {
  it('should run a query without errors',  async () => {
    await QueryManager.doAQuery(QueriesDefinitions.tokenOwner);
  });
});