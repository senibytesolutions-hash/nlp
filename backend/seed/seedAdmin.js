// Creates (or resets the password of) the first admin account.
//
// Usage:  npm run seed:admin
//
// Reads ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD from .env (see .env.example).
// Defaults to admin@nlp.org / admin123 if not set — CHANGE THESE before running
// against a real deployment, and change the password again after first login.

import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

const run = async () => {
  const email = (process.env.ADMIN_SEED_EMAIL || "admin@nlp.org").toLowerCase().trim();
  const password = process.env.ADMIN_SEED_PASSWORD || "admin123";

  await connectDB();

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await Admin.findOneAndUpdate(
    { email },
    { email, passwordHash },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log("----------------------------------------------------");
  console.log("Admin account ready:");
  console.log(`  email:    ${admin.email}`);
  console.log(`  password: ${password}`);
  console.log("Change this password after your first login.");
  console.log("----------------------------------------------------");

  await mongoose.connection.close();
  process.exit(0);
};

run().catch((error) => {
  console.error("Failed to seed admin account:", error.message);
  process.exit(1);
});
