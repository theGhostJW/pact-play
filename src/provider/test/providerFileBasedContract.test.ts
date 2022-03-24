import { Verifier, VerifierOptions } from '@pact-foundation/pact'
import { AxiosInstance } from 'axios';
import http from 'http'
import { Server } from 'http';
import mochaPact from "mocha-pact"
import path from 'path';
import { describe, test } from 'mocha'
import { fullUrl, app, port } from '../lib/serverImplementation';
import { doesNotMatch } from 'assert';



const options: VerifierOptions = {
  provider: 'MyProvider',
  providerBaseUrl: fullUrl,
  pactUrls: [path.resolve(process.cwd(), "pact", "pacts", "myconsumer-myprovider.json")],
  providerVersion: '2.0.0',
  publishVerificationResult: true,
  timeout: 20000
};

const verifier = new Verifier(options);

describe.only('Pact Verification', () => {

  let sv: http.Server;
  before(done => {
    sv = app.listen(port, () => {
      console.log(`Listening on port ${port}...`)
      app.emit("app_started")
      done()
    })
  })

  test('should validate the expectations of movie-consumer', done => {
    verifier
      .verifyProvider()
      .finally(done)
      done()
  })

  after(done => {
    sv.close(done)
  })



})
