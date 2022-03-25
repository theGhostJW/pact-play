import { Verifier, VerifierOptions } from '@pact-foundation/pact'
import axios from 'axios';
import http from 'http'
import { Server } from 'http';
import mochaPact from "mocha-pact"
import path from 'path';
import { describe, test } from 'mocha'
import { fullUrl, app, port, url } from '../lib/serverImplementation';
import { doesNotMatch } from 'assert';
const expect = require("chai").expect


describe('Pact Verification', () => {

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

  test('should validate the expectations of movie-consumer', async () => {
    return await new Verifier(options).verifyProvider()
  })

  after(done => {
    sv.close(done)
  })



})
