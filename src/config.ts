const defaultPort = 4000;

export const config = {
  apollo: {
    introspection: true,
    playground: true
  },
  port: process.env.PORT || defaultPort
};
