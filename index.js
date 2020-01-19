const express = require ("express");
const Configuration = require ("./config");
const packageJson = require ("./package.json");
const bodyParser = require('body-parser');
const LocalIpMiddleware = require ("./server/middlewares/local-ip.middleware");

const app = express ();
app.use(bodyParser.json());

app.get('/api/status', LocalIpMiddleware, (req, res) => res.send({
  version: packageJson.version,
  app: "iota-terminal",
}));

//Add Wifi-Routes
const wifiRouter = require ('./server/wifi/wifi.router');
app.use ("/api/wifi", LocalIpMiddleware, wifiRouter);

//Route everything to index.html expect /api
app.get ('/shared_bundle_1.js', (req, res) => {
  res.sendFile(__dirname + '/build/default/shared_bundle_1.js');
});
app.get ('/*', (req, res) => {
  res.sendFile(__dirname + '/build/default/interface/index.html');
});

app.listen(Configuration.PORT, () => console.log(`Example app listening on port ${Configuration.PORT}!`))