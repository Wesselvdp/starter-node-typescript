import 'module-alias/register';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import * as Sentry from '@sentry/node';
import { typeDefs, resolvers } from './graphql';
import mongoose from 'mongoose';

// Load env variables from .env file when in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 3001;
const app = express();

// Sentry for error tracking
Sentry.init({
  dsn:
    'https://c25a38690f4a4509ab93e4a1e34d8856@o261660.ingest.sentry.io/5565660',
  environment: process.env.NODE_ENV || 'production',
});

// Graphql server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => req,
  playground: process.env.NODE_ENV === 'development',
});

// Middleware
server.applyMiddleware({
  app,
  path: '/',
  cors: true, // disables the apollo-server-express cors to allow the cors middleware use
});

// Mongodb
const { mongoUserPass, mongoUserName, mongoDBName } = process.env;
const uri = `mongodb+srv://${mongoUserName}:${mongoUserPass}@cluster0.2xrum.mongodb.net/${mongoDBName}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected!');
});

app.listen(port, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `Server is running on port ${port} 🚀 http://localhost:${port}/graphql`,
    );
  }
});
