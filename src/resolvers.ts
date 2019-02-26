export default {
  Query: {
    document: () => {
      return [
        { id: 1, name: "test", description: "test", opp: 1 },
        { id: 2, name: "test2", description: "test2", opp: 2 },
        { id: 3, name: "test3", description: "test3", opp: 3 }
      ];
    },

    testFn: (id: Number) => {
      return { name: "test3", description: "test3", opp: 3 };
    }
  },
  Document: {
    items: obj => {
      console.log({ resolveItemForm: obj });
      return [{ id: 1, name: "bla" }];
    }
  }
};
