const express = require("serverless-express/express");
const { postgraphile } = require("postgraphile");
const PgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector");

const graphql = express();

graphql.use(
  postgraphile(
    "postgres://tqecwwdr:lRbs06Rq3VxMLqE1o1ASJTaAkoNluCpH@kesavan.db.elephantsql.com/tqecwwdr",
    "public",
    {
      dynamicJson: true,
      graphiql: true,
      enhanceGraphiql: true,
      appendPlugins:[PgSimplifyInflectorPlugin],
      graphqlRoute: '/',
    }
  )
);

graphql.listen(3008);

module.exports = graphql;