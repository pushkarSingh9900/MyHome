import sql, { poolPromise } from './db';

export async function getUserByEmail(email) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('Email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE Email = @Email');
    return result.recordset[0];
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  }
}

export async function validateUser(email, password) {
  const user = await getUserByEmail(email);
  if (user) {
    if (password === user.Password) {
      return user;
    }
  }
  return null;
}
export async function getUserById(id) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('Id', sql.Int, id)
        .query('SELECT * FROM Users WHERE Id = @Id');
      return result.recordset[0];
    } catch (err) {
      console.error('SQL error', err);
      throw err;
    }
  }
  export async function updateUser(id, updates) {
    try {
      const pool = await poolPromise;
      const request = pool.request().input('Id', sql.Int, id);
  
      let updateQuery = 'UPDATE Users SET ';
      const setClauses = [];
      for (const [key, value] of Object.entries(updates)) {
        const paramName = key;
        setClauses.push(`${key} = @${paramName}`);
        request.input(paramName, sql.NVarChar, value);
      }
      updateQuery += setClauses.join(', ');
      updateQuery += ' WHERE Id = @Id';
  
      await request.query(updateQuery);
    } catch (err) {
      console.error('SQL error', err);
      throw err;
    }
  }
