const expect = require("chai").expect
import { InteractionObject } from "@pact-foundation/pact"
import { pactWith } from "mocha-pact"
import { getMeDogs, getMeDog } from "../lib/mockService"

const port = 8992

pactWith(
  {
    port,
    consumer: "MyConsumer",
    provider: "MyProvider",
  },
  provider => {
    let url = "http://127.0.0.1"

    const EXPECTED_BODY = [
      {
        dog: 1,
      },
      {
        dog: 2,
      },
    ]

    describe("get /dogs", () => {
      before(done => {
        const interaction: InteractionObject = {
          state: "i have a list of dogs",
          uponReceiving: "a request for all dogs",
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
        }
        provider.addInteraction(interaction).then(() => {
          done()
        })
      })

      it("returns the correct response", done => {
        const urlAndPort = {
          url: url,
          port: port,
        }
        getMeDogs(urlAndPort).then(response => {
          expect(response.data).to.eql(EXPECTED_BODY)
          done()
        }, done)
      })
    })

    describe("get /dog/1", () => {
      before(done => {
        const interaction: InteractionObject = {
          state: "i have a list of dogs",
          uponReceiving: "a request for a single dog",
          withRequest: {
            method: "GET",
            path: "/dogs/1",
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
        }
        provider.addInteraction(interaction).then(() => {
          done()
        })
      })

      it("returns the correct response", done => {
        const urlAndPort = {
          url: url,
          port: port,
        }
        getMeDog(urlAndPort).then(response => {
          expect(response.data).to.eql(EXPECTED_BODY)
          done()
        }, done)
      })
    })
  }
)
