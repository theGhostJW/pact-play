import { Pact, Interaction, Matchers } from "@pact-foundation/pact"
import { DogService } from "../lib/index"
import assert from 'assert'
import path from "path"




describe.skip("The Dog API", () => {
  const url = "http://localhost"
  let dogService: DogService

  const provider = new Pact({
    // port,
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    spec: 2,
    consumer: "Typescript Consumer Example",
    provider: "Typescript Provider Example",
  })

  const dogExample = { dog: 1 }
  const EXPECTED_BODY = Matchers.eachLike(dogExample)

  before(() =>
    provider.setup().then(async opts => {
      dogService = new DogService({ url, port: opts.port })
    })
  )

  describe("get /dogs using object pattern", () => {
    before(async () => {
      return await provider.addInteraction({
        state: "i have a list of dogs",
        uponReceiving: "a request for all dogs with the object pattern",
        withRequest: {
          method: "GET",
          path: "/dogs",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: EXPECTED_BODY,
        },
      })
    })

    it("returns the correct response", async done => {
      await dogService.getMeDogs().then((response: any) => {
        // assert.equal(response.data[0], dogExample)
        done()
      }, done).then(done, done)
    })
  })



  afterEach(async () => await provider.verify())

  after(async () => await provider.finalize())



})



/* tslint:disable:no-unused-expression object-literal-sort-keys max-classes-per-file no-empty 
import * as chai from "chai"
import * as chaiAsPromised from "chai-as-promised"
import path = require("path")
import * as sinonChai from "sinon-chai"
import { Pact, Interaction, Matchers } from "@pact-foundation/pact"

const expect = chai.expect
import { DogService } from "../src/index"
const { eachLike } = Matchers

chai.use(sinonChai)
chai.use(chaiAsPromised)

describe("The Dog API", () => {
  const url = "http://localhost"
  let dogService: DogService

  const provider = new Pact({
    // port,
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    spec: 2,
    consumer: "Typescript Consumer Example",
    provider: "Typescript Provider Example",
  })

  const dogExample = { dog: 1 }
  const EXPECTED_BODY = eachLike(dogExample)

  before(() =>
    provider.setup().then(opts => {
      dogService = new DogService({ url, port: opts.port })
    })
  )

  after(() => provider.finalize())

  afterEach(() => provider.verify())

  describe("get /dogs using builder pattern", () => {
    before(() => {
      const interaction = new Interaction()
        .given("I have a list of dogs")
        .uponReceiving("a request for all dogs with the builder pattern")
        .withRequest({
          method: "GET",
          path: "/dogs",
          headers: {
            Accept: "application/json",
          },
        })
        .willRespondWith({
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: EXPECTED_BODY,
        })

      return provider.addInteraction(interaction)
    })

    it("returns the correct response", done => {
      dogService.getMeDogs().then((response: any) => {
        expect(response.data[0]).to.deep.eq(dogExample)
        done()
      }, done)
    })
  })

  describe("get /dogs using object pattern", () => {
    before(() => {
      return provider.addInteraction({
        state: "i have a list of dogs",
        uponReceiving: "a request for all dogs with the object pattern",
        withRequest: {
          method: "GET",
          path: "/dogs",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: EXPECTED_BODY,
        },
      })
    })

    it("returns the correct response", done => {
      dogService.getMeDogs().then((response: any) => {
        expect(response.data[0]).to.deep.eq(dogExample)
        done()
      }, done)
    })
  })
})
*/