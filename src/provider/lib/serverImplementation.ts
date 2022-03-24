
import express from 'express'

const url = "http://127.0.0.1"
const port = 8080
export const fullUrl =`${url}:${port}`

const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)







/*

import axios, { AxiosInstance } from "axios"



function mkServer(urlAndPort: string): AxiosInstance {

  axios.request({
    method: "GET",
    url: "/dogs/1",
    headers: { Accept: "application/json" },
  })

  axios.request({
    method: "GET",
    url: "/dogs",
    headers: { Accept: "application/json" },
  })

  return axios.create({
    baseURL: urlAndPort,
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
  });


}

export const app = mkServer(fullUrl)

*/

