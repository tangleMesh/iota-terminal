const express = require ("express");
const Configuration = require ("./config");
const packageJson = require ("./package.json");

const app = express ();

app.use("/", express.static('build/default/interface'));
// app.use("/node_modules", express.static('./node_modules'));

app.get('/status', (req, res) => res.send({
  version: packageJson.version,
  app: "iota-terminal",
}));

app.listen(Configuration.PORT, () => console.log(`Example app listening on port ${Configuration.PORT}!`))