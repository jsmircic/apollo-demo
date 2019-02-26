const defaultPort = 4000;

export const config = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION === "true",
    playground: process.env.APOLLO_PLAYGROUND === "true"
  },
  port: process.env.PORT || defaultPort
};
