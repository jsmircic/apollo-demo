import { ApolloServer } from "apollo-server";

import { config } from "./config";
import resolvers from "./resolvers";
import typeDefs from "./schemas";

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: config.apollo.introspection,
  playground: config.apollo.playground
});

server
  .listen(config.port)
  .then(({ url }) => console.log(`We are up and running at ${url}. `));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
