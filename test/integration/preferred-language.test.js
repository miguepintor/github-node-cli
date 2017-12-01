'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../src/server');

chai.use(chaiHttp);

after(() => server.close());

describe('preferred-language.js', () => {
  it('for an existing user a preferred language is returned', (done) => {
    chai.request(server)
    .get('/Query/PreferredLanguage/miguepintor')
    .end((err, res) => {
      chai.expect(err).to.be.null;
      chai.expect(res).to.have.status(200);
      chai.expect(res.text).to.not.be.null;
      done();
    });
  });
});