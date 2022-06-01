const express = require('express')
const app = express()
const port = process.env.PORT || 3131
const screenshot = require('./screenshot')

app.get('/status', (req, res) => res.status(200).json({ status: 'ok' }))
app.get('/', function (req, res, next) {
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from("<form action='/screenshot'><input name=query></form>"))
  });

app.get('/screenshot', (req, res) => {
    const url = req.query.url
    ;(async () => {
      const buffer = await screenshot(url)
      res.setHeader('Content-Disposition', 'attachment; filename="screenshot.png"')
      res.setHeader('Content-Type', 'image/png')
      res.send(buffer)
    })()
  })

app.get('/test', (req, res) => {
    
    ;(async () => {
      const buffer = await screenshot('http://google.com/')
      res.setHeader('Content-Disposition', 'attachment; filename="screenshot.png"')
      res.setHeader('Content-Type', 'image/png')
      res.send(buffer)
    })()
  })

app.listen(port, () => console.log(`app listening on port ${port}!`))