// lib/session.js
import { promisifyStore } from 'next-session/lib/compat';
import { expressSession, Session } from 'next-session';
import session from 'express-session';
import MemoryStore from 'memorystore';

const MemoryStoreSession = MemoryStore(session);

export default function getSession(req, res) {
  return new Promise((resolve, reject) => {
    expressSession({
      secret: 'keyboard cat' ,
      resave: false,
      saveUninitialized: false,
      store: promisifyStore(new MemoryStoreSession({ checkPeriod: 86400000 })),
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000, // 1 day
      },
    })(req, res, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}
