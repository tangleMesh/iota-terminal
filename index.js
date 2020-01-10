const express = require ("express");
const Configuration = require ("./config");
const packageJson = require ("./package.json");

const app = express ();

app.get('/api/status', (req, res) => res.send({
  version: packageJson.version,
  app: "iota-terminal",
}));

//Route everything to index.html expect /api
app.get ('/*', (req, res) => {
  res.sendFile(__dirname + '/build/default/interface/index.html');
});

app.listen(Configuration.PORT, () => console.log(`Example app listening on port ${Configuration.PORT}!`))