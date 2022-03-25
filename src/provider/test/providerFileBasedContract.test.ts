import { Verifier, VerifierOptions } from '@pact-foundation/pact'
import axios from 'axios';
import http from 'http'
import { Server } from 'http';
import mochaPact from "mocha-pact"
import path from 'path';
import { describe, test } from 'mocha'
import { fullUrl, app, /* port, */ url } from '../lib/serverImplementation';
import { doesNotMatch } from 'assert';
import { setLogLevel } from '@pact-foundation/pact-node/src/logger';
const expect = require("chai").expect

/*
describe.only('Pact Verification', () => {

  let sv: http.Server;
  before(done => {
    sv = app.listen(port, () => {
      console.log(`Listening on port ${port}...`)
      app.emit("app_started")
      done()
    })
  })

  const callSimple = () => {
    return axios.request({
      method: "GET",
      baseURL: fullUrl,
      url: "/",
      headers: { Accept: "application/json" },
    })
  }

  it('should connect OK', done => {
    callSimple().then(response => {
      expect(response.status).to.eql(200)
      done()
    }, done)
  });

  const options: VerifierOptions = {
    provider: 'MyProvider',
    providerBaseUrl: fullUrl,
    pactUrls: [path.resolve(process.cwd(), "pact", "pacts", "myconsumer-myprovider.json")],
    providerVersion: '2.0.0',
    publishVerificationResult: true,
    timeout: 20000
  }

  test('expectations of MyConsumer', async () => {
    return await new Verifier(options).verifyProvider()
  })

  after(done => {
    sv.close(done)
  })
*/
const providerBaseUrl = 'http://127.0.0.1:3000/';
const pactBrokerToken = process.env.PACT_BROKER_TOKEN;

const port = process.env.PORT || 3000;

const options = {
  provider: 'movie-provider',
  providerBaseUrl,
  pactUrls: [path.resolve(process.cwd(), "pact", "pacts", "myconsumer-myprovider.json")],
  providerVersion: '1.0.0',
  publishVerificationResult: true,
  logLevel: 'info'
};


// having trouble getting logLevel to type check
// TODO fix  
// @ts-ignore
const verifier = new Verifier(options);

const callSimple = () => {
  return axios.request({
    method: "GET",
    baseURL: fullUrl,
    url: "/",
    headers: { Accept: "application/json" },
  })
}

describe.only('Pact Verification', () => {

  let sv: http.Server;
  before(done => {
    sv = app.listen(port, () => {
      console.log(`Listening on port ${port}...`)
      app.emit("app_started")
      done()
    })
  })

  beforeEach("set timeout", function (done) {
    this.timeout(30000); // A very long environment setup.
    setTimeout(done, 25000)
  })

  it('should connect OK', done => {
    callSimple().then(response => {
      expect(response.status).to.eql(200)
      done()
    }, done)
  });

  test('should validate the expectations of movie-consumer', done => {
    verifier.verifyProvider()
      .then(a => console.log(`This is a ${a}!!!`))
      done()
  });

  after(done => {
    sv.close(done)
  })




})
