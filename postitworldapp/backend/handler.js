const handler = require('serverless-express/handler');
const graphql = require('./graphql');

exports.handler = handler(graphql);