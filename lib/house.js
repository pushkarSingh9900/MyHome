import sql, { poolPromise } from './db';

export async function getHouses(filter) {
  try {
    const pool = await poolPromise;
    let query = 'SELECT * FROM Houses WHERE 1=1';
    const request = pool.request(); // Use the same request for binding parameters

    // Apply filters dynamically
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
    if (filter.maxDistance) {
      query += ' AND DistanceFromLakehead <= @MaxDistance';
      request.input('MaxDistance', sql.Float, filter.maxDistance); // Ensure correct data type
    }

    // Order by distance if "closest" filter is set
    if (filter.closest) {
      query += ' ORDER BY DistanceFromLakehead ASC';
    }

    // Execute the query using the same request object
    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    console.error('Error fetching houses from the database:', err);
    throw err;
  }
}
