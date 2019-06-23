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

export const f4bDs = {
  queryVessels: async () => {
    await connectToPool();
    const results = await pool.query`SELECT TOP 3 BpCode AS id,BpName as name from dbo.BussPart bp WHERE bp.BpTyp=1600`;
    return results.recordset;
  },
  queryVesselById: async (vesselId: string) => {
    await connectToPool();
    const results = await pool.query`SELECT BpCode AS id,BpName as name from dbo.BussPart bp WHERE bp.BpTyp=1600 AND bp.BpCode=${vesselId}`;
    return results.recordset[0];
  },
  queryLines: async () => {
    await connectToPool();
    const results = await pool.query`SELECT l.LinijaOznaka as id, l.LinijaNaziv as name FROM BOOK.LinijaGlava l ORDER BY l.LinijaOznaka`;
    return results.recordset;
  },
  queryIslands: async () => {
    await connectToPool();
    const results = await pool.query`SELECT BpCode AS id,BpName as name from dbo.BussPart bp WHERE bp.BpTyp=1500`;
    return results.recordset;
  },
  queryPorts: async () => {
    await connectToPool();
    const results = await pool.query`SELECT p.PostajaOznaka as id,p.PostajaNaziv as name, p.PostajaAdresa  as CIMISId FROM BOOK.PostajaGlava p ORDER by p.PostajaOznaka`;
    return results.recordset;
  },
  queryLineTypes: async () => {
    await connectToPool();
    const results = await pool.query`SELECT l.LinijaTipOznaka as id, l.LinijaTipNaziv as name FROM BOOK.LinijaTip l ORDER BY l.LinijaTipOznaka`;
    return results.recordset;
  },
  queryLinesByType: async (lineTypeId: string) => {
    await connectToPool();
    const results = await pool.query`SELECT l.LinijaOznaka as id, l.LinijaNaziv as name  FROM BOOK.LinijaGlava l INNER JOIN BOOK.LinijaTip lt ON l.LinijaTipId=lt.LinijaTipId  WHERE lt.LinijaTipOznaka=${lineTypeId} ORDER BY l.LinijaOznaka`;
    return results.recordset;
  },
  queryLineTypeByLineId: async (lineId: string) => {
    await connectToPool();
    const results = await pool.query`SELECT lt.LinijaTipOznaka as id, lt.LinijaTipNaziv  as name FROM BOOK.LinijaTip lt INNER JOIN BOOK.LinijaGlava lg ON lt.LinijaTipId=lg.LinijaTipId WHERE lg.LinijaOznaka=${lineId}`;
    return results.recordset[0];
  },
  queryPortsByIslandId: async islandId => {
    await connectToPool();
    const results = await pool.query`
    SELECT p.PostajaOznaka as id,p.PostajaNaziv as name,p.PostajaAdresa as CIMISId 
    FROM BOOK.PostajaGlava p
    INNER JOIN dbo.BussPart bp ON p.DProtocolIDOtok = bp.BussPartID
    WHERE bp.BpCode = ${islandId}`;

    return results.recordset;
  },
  queryVesselItinerary: async (vesselId, startDate, pageNumber) => {
    await connectToPool();
    const offset = (pageNumber - 1) * 50;
    const results = await pool.query`
    SELECT 
    ${vesselId} as vesselId,
    ps.ItemId as id,
    luka.PostajaOznaka AS departurePortId,
    pss.PostajaOznaka as destinationPortId,
    ps.PolazakVrijeme AS departureTime,    
    pss.DolazakVrijeme AS arrivalTime,
    lin.LinijaOznaka as lineId
    FROM 
    BOOK.PutovanjeGlava pg INNER JOIN BOOK.PutovanjeStavka ps 
    ON pg.DProtocolID = ps.DProtocolID
    INNER JOIN dbo.BussPart bpBrod ON bpBrod.BussPartID = pg.DProtocolIDPrijevoznoSredstvo
    INNER JOIN BOOK.PostajaGlava luka ON luka.DProtocolID = ps.DProtocolIDPostaja
    INNER JOIN BOOK.LinijaGlava lin ON lin.DProtocolID  = pg.DProtocolIDLinija
    outer apply (
        select top 1	sps.ItemID,
                        sps.DProtocolIDPostaja,
                        spostaja.PostajaOznaka,
                        spostaja.PostajaAdresa as PostajaCimisOznaka,
                        spostaja.PostajaNaziv,
                        coalesce(spostaja_drzava.CountryCodeAlpha2, 'HR') as PostajaDrzavaOznaka,
                        sps.RedniBroj,
                        sps.DolazakVrijeme,
                        sps.UkrcajVrijeme,
                        sps.PolazakVrijeme,
                        sps.DolazakVrijemeBrod
        from BOOK.PutovanjeStavka sps 
                inner join BOOK.PostajaGlava spostaja
                    on spostaja.DProtocolID = sps.DProtocolIDPostaja
                    left join CatCountry spostaja_drzava
                        on spostaja_drzava.CountryID = spostaja.PostajaDrzavaID
        where sps.DProtocolID = pg.DProtocolID and sps.RedniBroj > ps.RedniBroj
        order by sps.RedniBroj
        ) pss

    WHERE bpBrod.BpCode=${vesselId} AND pg.PutovanjeVrijemePocetka>=${startDate}
    ORDER BY pg.PutovanjeVrijemePocetka
    OFFSET ${offset} ROWS FETCH NEXT 50 ROWS ONLY;
    `;

    console.log({ rec: results.recordset });
    return results.recordset;
  },
  queryPortById: async portId => {
    const results = await pool.query`
    SELECT p.PostajaOznaka as id,p.PostajaNaziv as name,p.PostajaAdresa as CIMISId 
    FROM BOOK.PostajaGlava p    
    WHERE p.PostajaOznaka = ${portId}`;

    return results.recordset[0];
  },
  queryLineById: async lineId => {
    const results = await pool.query`
    SELECT l.LinijaOznaka as id, l.LinijaNaziv as name FROM BOOK.LinijaGlava l WHERE l.LinijaOznaka=${lineId}`;
    return results.recordset[0];
  }
};
