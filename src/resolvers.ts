import { openRealm } from "./db/realm";
import * as sql from "mssql";

let pool: sql.ConnectionPool;

const connectToPool = async () => {
  if (pool) return;

  pool = new sql.ConnectionPool({
    server: "128.1.0.27\\v2017",
    user: "f4b_appuser",
    password: "P4p&4t#1cA",
    database: "DocSysJLTest"
  });

  await pool.connect();
};

export default {
  Query: {
    vessels: async () => {
      await connectToPool();
      const results = await pool.query`SELECT BpCode AS id,BpName as name from dbo.BussPart bp WHERE bp.BpTyp=1600`;
      return results.recordset;
    },

    lines: async () => {
      await connectToPool();
      const results = await pool.query`SELECT l.LinijaOznaka as id, l.LinijaNaziv as name FROM BOOK.LinijaGlava l ORDER BY l.LinijaOznaka`;
      return results.recordset;
    },
    islands: async () => {
      await connectToPool();
      const results = await pool.query`SELECT BpCode AS id,BpName as name from dbo.BussPart bp WHERE bp.BpTyp=1500`;
      return results.recordset;
    },
    ports: async () => {
      await connectToPool();
      const results = await pool.query`SELECT p.PostajaOznaka as id,p.PostajaNaziv as name, p.PostajaAdresa  as CIMISId FROM BOOK.PostajaGlava p ORDER by p.PostajaOznaka`;

      return results.recordset;
    },
    lineTypes: async () => {
      await connectToPool();
      const results = await pool.query`SELECT l.LinijaTipOznaka as id, l.LinijaTipNaziv as name FROM BOOK.LinijaTip l ORDER BY l.LinijaTipOznaka`;
      return results.recordset;
    },
    linesByType: async (_, { lineTypeId }) => {
      await connectToPool();
      console.log(lineTypeId);
      const results = await pool.query`SELECT l.LinijaOznaka as id, l.LinijaNaziv as name  FROM BOOK.LinijaGlava l INNER JOIN BOOK.LinijaTip lt ON l.LinijaTipId=lt.LinijaTipId  WHERE lt.LinijaTipOznaka=${lineTypeId} ORDER BY l.LinijaOznaka`;
      return results.recordset;
    }
  },
  Line: {
    type: async obj => {
      await connectToPool();
      const results = await pool.query`SELECT lt.LinijaTipOznaka as id, lt.LinijaTipNaziv  as name FROM BOOK.LinijaTip lt INNER JOIN BOOK.LinijaGlava lg ON lt.LinijaTipId=lg.LinijaTipId WHERE lg.LinijaOznaka=${
        obj.id
      }`;
      return results.recordset[0];
    }
  },
  Island: {
    ports: async obj => {
      await connectToPool();
      const results = await pool.query`
      SELECT p.PostajaOznaka as id,p.PostajaNaziv as name,p.PostajaAdresa as CIMISId 
      FROM BOOK.PostajaGlava p
      INNER JOIN dbo.BussPart bp ON p.DProtocolIDOtok = bp.BussPartID
      WHERE bp.BpCode = ${obj.id}`;

      return results.recordset;
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
