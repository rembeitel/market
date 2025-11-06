import express from "express";
const router = express.Router();
export default router;

const bcrypt = require("bcrypt");

async function hashPassword(plainTextPassword) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
  return hashedPassword;
}

import {
  createUser,
  getUserByUsernameAndPassword,
  getUserById,
} from "#db/queries/users";
import { createToken } from "#utils/jwt";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    if (!user) return res.status(400).send("Invalide username or password");
    const token = await createToken({ id: user.id });
    res.status(201).send(token);
  }
);

router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) return res.status(400).send("Invalid username or password");
    const token = await createToken({ id: user.id });
    res.send(token);
  }
);
