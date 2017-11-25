'use strict';

const cmd = require('commander');
const QueriesDefinitions = require('./core/queries');
const QueryManager = require('./core/query-manager');

cmd
.version('0.0.1')
.description('Github node cli');

cmd
.command('tokenOwner')
.alias('to')
.description('Tells the owner of the GitHub token')
.action(async function(){
  await QueryManager.doAQuery(QueriesDefinitions.tokenOwner);
});

cmd
.command('guessPrefLanguage <username>')
.alias('gpl')
.description('Guess of the GitHub user\'s favourite programming language')
.action(async function(username){
  await QueryManager.doAQuery(QueriesDefinitions.preferredLanguage.addArgs(username));
});

cmd.parse(process.argv);