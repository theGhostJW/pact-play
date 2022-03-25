
import express from 'express'

export const url = "http://127.0.0.1"
export const port = 3000
export const fullUrl = `${url}:${port}`

export const app = express()

app.get('/', (req, res) => {
  res.sendStatus(200);
});


app.get('/dogs/1', function (_req, res) {
  res.setHeader("Accept", "application/json")
  res.sendStatus(200)
})

app.get('/dogs', function (_req, res) {
  res.setHeader("Accept", "application/json")
  res.sendStatus(200)
})

if (require.main === module) {
  app.listen(port, () => {
    console.log('App has started');
  });
}

// export const server =
//   app.listen(port, () => {
//     console.log(`Listening on port ${port}...`)
//     app.emit("app_started")
//   }
//   );


// export const shutdown = (done: any) => {
//   server.close(done);
// }