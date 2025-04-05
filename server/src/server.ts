import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { resolvers } from './schemas/resolvers.js';
import { typeDefs } from './schemas/typeDefs.js';
import { authMiddleware } from './utils/auth.js';
import db from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

//here is to create the apollo server
const server = new ApolloServer ({
  typeDefs,
  resolvers,
});

//here is to start the apollo server
const startApolloServer = async () => {
  await server.start();
  app.use(
    '/graphql',
    expressMiddleware(server, {context: authMiddleware}
    )
  )


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
};

startApolloServer();