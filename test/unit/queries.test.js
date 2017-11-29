'use strict';

const assert = require('assert');
const QueriesDefinitions = require('../../src/core/queries');

describe('queries.js', () => {
  it('if the user has no repository then the preferred language is undefined', () => {
    let output = {data : { user: { repositories: { nodes : []}}}};
    assert.ok(QueriesDefinitions.preferredLanguage.parseOutput(output) === undefined);
  });
});

describe('queries.js', () => {
  it('if the user has repositories then a preferred language is expected', () => {
    let output = {data : { user: { repositories: { nodes : [{ primaryLanguage : {name: 'JavaScript'}}, { primaryLanguage : {name: 'Java'}}, { primaryLanguage : {name: 'JavaScript'}}]}}}};
    assert.equal(QueriesDefinitions.preferredLanguage.parseOutput(output), 'JavaScript');
  });
});

describe('queries.js', () => {
  it('if the user has repositories without a preferred language then that repository should be ignored', () => {
    let output = {data : { user: { repositories: { nodes : [{ primaryLanguage : {name: 'JavaScript'}}, { primaryLanguage : null}, { primaryLanguage : {name: 'Java'}}, { primaryLanguage : null}, { primaryLanguage : {name: 'JavaScript'}}]}}}};
    assert.equal(QueriesDefinitions.preferredLanguage.parseOutput(output), 'JavaScript');
  });
});

describe('queries.js', () => {
  it('if the user has the same preference for several languages then the last ocurrence is the valid one', () => {
    let output = {data : { user: { repositories: { nodes : [
      { primaryLanguage : {name: 'JavaScript'}}, { primaryLanguage : {name: 'Java'}}, 
      { primaryLanguage : {name: 'JavaScript'}}, { primaryLanguage : {name: 'Java'}},
      { primaryLanguage : {name: 'Ruby'}}, { primaryLanguage : {name: 'Ruby'}}]}}}};
    assert.equal(QueriesDefinitions.preferredLanguage.parseOutput(output), 'Ruby');
  });
});