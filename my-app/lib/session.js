// lib/session.js
import session from 'express-session';

export const sessionMiddleware = session({
  secret: 'DataIsImp',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, 
});

export function withSession(handler) {
  return (req, res) => {
    sessionMiddleware(req, res, () => {
      handler(req, res);
    });
  };
}
