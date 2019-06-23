import { ApolloServer } from "apollo-server";

import { config } from "./config";
import resolvers from "./resolvers";
import typeDefs from "./schemas";
import { f4bDs } from "./db/f4bDs";

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: config.apollo.introspection,
  playground: config.apollo.playground,
  context: ({ req }) => ({
    f4bDs
  })
});

server
  .listen(config.port)
  .then(({ url }) => console.log(`We are up and running at ${url}. `));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
