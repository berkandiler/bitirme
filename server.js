const https = require('https');
const app= require('./app');
const port = process.env.PORT || 3000;
const server = https.createServer(app);
server.listen(port);
server.timeout = 15000;
console.log(`Listening on ${ port }`);


/*const http = require('http')
const app= require('./app');
const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
const server = http.createServer(app)

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/app'))
  .get('/cool', (req, res) => res.send(cool()))
  server.listen(PORT, () => console.log(`Listening on ${ PORT }`))*/