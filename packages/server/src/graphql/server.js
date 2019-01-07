const express = require('express');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');
const schema = require('./schema');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  }),
);

app.listen(4444, () => {
  console.log('listening on port: 4444');
});
