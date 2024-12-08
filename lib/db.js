import sql from 'mssql';

const dbConfig = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  },
};

export const poolPromise = sql
  .connect(dbConfig)
  .then((pool) => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch((err) => console.log('Database Connection Failed - ', err));

export default sql;
