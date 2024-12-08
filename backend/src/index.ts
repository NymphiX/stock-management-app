import { ApolloServer } from 'apollo-server';
import typeDefs from './schema/typeDefs';
import productResolver from './resolvers/productResolver';
import warehouseResolver from './resolvers/warehouseResolver';
import dotenv from 'dotenv';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers: [productResolver, warehouseResolver],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});