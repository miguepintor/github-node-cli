'use strict';

const assert = require('assert');
const {get} = require('../../src/utilities/config');

describe('config.js', () => {
  it('should be possible to retrieve value', () => {
    assert.equal(get('name'), 'github-node-cli');
  });
});

describe('config.js', () => {
  it('github token has to be defined', () => {
    assert.ok(get('github-api-token'));
  });
});
