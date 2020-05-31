const express = require('express');
const db = require('./models/index');
const models = require('./models/');
const app = express();

const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/', async (req, res) => {
  let result = await models.User.findAll();
  res.send(result);
});
app.post('/', async (req, res) => {
  let result = await models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });
  res.send(result);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
