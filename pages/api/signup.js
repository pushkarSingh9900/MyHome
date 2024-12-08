// pages/api/signup.js

import { poolPromise } from "../../lib/db";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    try {
      // Validate email ends with '@lakeheadu.ca'
      if (!email.endsWith('@lakeheadu.ca')) {
        return res.status(400).json({ message: 'Email must end with @lakeheadu.ca' });
      }

      const pool = await poolPromise;

      // Check if user already exists
      const userResult = await pool.request()
        .input("Email", email)
        .query("SELECT Id FROM Users WHERE Email = @Email");

      if (userResult.recordset.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Insert the user into the database
      const insertResult = await pool.request()
        .input("Name", name)
        .input("Email", email)
        .input("Password", password) // Plain text password
        .query(
          "INSERT INTO Users (Name, Email, Password) OUTPUT INSERTED.Id VALUES (@Name, @Email, @Password)"
        );

      // Get the newly created user ID
      const userId = insertResult.recordset[0].Id;

      // Set authentication cookie
      res.setHeader(
        "Set-Cookie",
        serialize("auth", String(userId), {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 1 week
        })
      );

      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error registering user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
