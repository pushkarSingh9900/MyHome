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
