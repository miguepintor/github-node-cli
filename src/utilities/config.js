
'use strict';

const nconf = require('nconf');
const path  = require('path');
const nconfYaml  = require('nconf-yaml');

const DEFAULT_CONFIG_FILE = path.resolve(__dirname, '../../config/config.yml');

const config = nconf
  .argv()
  .env()
  .file({ file: DEFAULT_CONFIG_FILE, format: nconfYaml });

/**
 * Retrieves configuration property value.
 * @param {string} keyPath Configuration property path, e.g. db.host.
 * @return {*} Value strored by given path.
 */
const get = function (keyPath) {
  return config.get(keyPath);
};

module.exports.get = get;

