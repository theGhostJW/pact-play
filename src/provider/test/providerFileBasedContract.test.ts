import { Verifier, VerifierOptions } from '@pact-foundation/pact'
import { AxiosInstance } from 'axios';
import { Server } from 'http';
import mochaPact from "mocha-pact"
import path from 'path';
import {describe, test} from 'mocha'
import { fullUrl } from '../lib/serverImplementation';



const options : VerifierOptions = {
  provider: 'MyProvider',
  providerBaseUrl: fullUrl,
  pactUrls: [path.resolve(process.cwd(), "pact", "pacts", "myconsumer-myprovider.json")],
  providerVersion: '2.0.0',
  publishVerificationResult: true,
  timeout: 20000
};

const verifier = new Verifier(options);

describe.only('Pact Verification', () => {
 
  test('should validate the expectations of movie-consumer', () => {
    return verifier.verifyProvider()
  })



});
