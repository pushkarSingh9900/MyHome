import sql, { poolPromise } from './db';

export async function getHouses(filter) {
  try {
    const pool = await poolPromise;
    let query = 'SELECT * FROM Houses WHERE 1=1';
    const request = pool.request();

    
    if (filter.location) {
      query += ' AND Location = @Location';
      request.input('Location', sql.NVarChar, filter.location);
    }
    if (filter.minPrice) {
      query += ' AND Price >= @MinPrice';
      request.input('MinPrice', sql.Decimal, filter.minPrice);
    }
    if (filter.maxPrice) {
      query += ' AND Price <= @MaxPrice';
      request.input('MaxPrice', sql.Decimal, filter.maxPrice);
    }
    if (filter.bedrooms) {
      query += ' AND Bedrooms = @Bedrooms';
      request.input('Bedrooms', sql.Int, filter.bedrooms);
    }
    

    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}
