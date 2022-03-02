const express = require('express');
const bodyParser = require('body-parser');
const route = require('./server/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const distDir = `${__dirname}/dist/`;

app.use(express.static(distDir));

app.use('/api/dg-apps', route);

app.use('/*', (req, res) => {
  res.sendFile(distDir);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
