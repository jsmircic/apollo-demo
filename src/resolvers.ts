export default {
  Query: {
    vessels: async (_parent, _, context) => {
      const results = await context.f4bDs.queryVessels();
      return results;
    },
    lines: async (_parent, _, context) => {
      const results = await context.f4bDs.queryLines();
      return results;
    },
    islands: async (_parent, _, context) => {
      const results = await context.f4bDs.queryIslands();
      return results;
    },
    ports: async (_parent, _, context) => {
      const results = await context.f4bDs.queryPorts();
      return results;
    },
    lineTypes: async (_parent, _, context) => {
      const results = await context.f4bDs.queryLineTypes();
      return results;
    },
    linesByType: async (_, { lineTypeId }, _context) => {
      const results = _context.f4bDs.queryLinesByType(lineTypeId);
      return results;
    },
    vesselItinerary: async (
      parent,
      { vesselId, startDate, pageNumber },
      context
    ) => {
      console.log(parent);
      const results = await context.f4bDs.queryVesselItinerary(
        vesselId,
        startDate,
        pageNumber
      );
      return results;
    }
  },
  Line: {
    type: async (obj, _, context) => {
      const results = await context.f4bDs.queryLineTypeByLineId();
      return results;
    }
  },
  Island: {
    ports: async (obj, _, context) => {
      const results = await context.f4bDs.queryPortsByIslandId(obj.id);
      return results;
    }
  },
  Journey: {
    departurePort: async (parent, _, context) => {
      const results = await context.f4bDs.queryPortById(parent.departurePortId);
      return results;
    },
    destinationPort: async (parent, _, context) => {
      const results = await context.f4bDs.queryPortById(
        parent.destinationPortId
      );
      return results;
    },
    vessel: async (parent, _, context) => {
      console.log({ vesselParent: parent });
      const results = await context.f4bDs.queryVesselById(parent.vesselId);
      return results;
    },
    line: async (parent, _, context) => {
      const results = await context.f4bDs.queryLineById(parent.lineId);
      return results;
    }
  }
  // Mutation: {
  //   addPatient: async (parent, args) => {
  //     console.log({ parent, args });
  //     const realm = await openRealm();
  //     realm.write(() => {
  //       realm.create("Patient", args, true);
  //     });
  //     return args;
  //   }
  // }
  // Document: {
  //   items: obj => {
  //     console.log({ resolveItemForm: obj });
  //     return [{ id: 1, name: "bla" }];
  //   }
  // }
};
