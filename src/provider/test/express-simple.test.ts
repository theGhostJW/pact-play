import { app, port } from './express-simple-server';
import http from 'http'
import axios from "axios"
const expect = require("chai").expect

const callSimple = () => {
  return axios.request({
    method: "GET",
    baseURL: `http://127.0.0.1:${port}`,
    url: "/",
    headers: { Accept: "application/json" },
  })
}


describe.skip('simple demo', () => {
  let server: http.Server;
  before((done) => {
    server = app.listen(port, () => {
      console.log('App has started');
      done();
    });
  });


  it('should pass', done => {
    callSimple().then(response => {
      expect(response.status).to.eql(200)
      done()
    }, done)
  });


  after(done => {
    server.close(done);
    console.log('App has closed');
  });

});

