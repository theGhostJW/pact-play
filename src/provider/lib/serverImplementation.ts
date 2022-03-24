
import express from 'express'

const url = "http://127.0.0.1"
export const port = 3001
export const fullUrl = `${url}:${port}`

export const app = express()

app.get('/dogs/1', function (_req, res) {
  res.setHeader("Accept", "application/json")
  res.sendStatus(200)
})

app.get('/dogs', function (_req, res) {
  res.setHeader("Accept", "application/json")
  res.sendStatus(200)
})

// export const server =
//   app.listen(port, () => {
//     console.log(`Listening on port ${port}...`)
//     app.emit("app_started")
//   }
//   );


// export const shutdown = (done: any) => {
//   server.close(done);
// }