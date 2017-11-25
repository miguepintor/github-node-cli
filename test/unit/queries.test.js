'use strict';

const assert = require('assert');
const QueriesDefinitions = require('../../src/core/queries');

describe('queries.js', () => {
  it('if the user has no repository then the preferred language is undefined', () => {
    let output = {data : { user: { repositories: { nodes : []}}}};
    assert.ok(!QueriesDefinitions.preferredLanguage.parseOutput(output));
  });
});

describe('queries.js', () => {
  it('if the user has repositories then a preferred language is expected', () => {
    let output = {data : { user: { repositories: { nodes : [{ primaryLanguage : {name: 'JavaScript'}},{ primaryLanguage : {name: 'JavaScript'}}]}}}};
    assert.equal(QueriesDefinitions.preferredLanguage.parseOutput(output), 'JavaScript');
  });
});