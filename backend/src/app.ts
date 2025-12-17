import express from "express";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./config/swagger.json";
import cookieParser from 'cookie-parser';
dotenv.config();

import userRoutes from "./routes/users.routes";
import roleRoutes from "./routes/roles.routes";
import authRoutes from "./routes/auth.routes";
import { sequelize } from "./models";

declare module "express-session" {
  interface SessionData {
    user?: {
      id: number;
      email: string;
      roleId: number;
      Role?: {
        name: string;
        Permissions: { key: string }[];
      };
    };
  }
}

const app = express();

app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

const SequelizeStore = connectSessionSequelize(session.Store);
const store = new (SequelizeStore as any)({
  db: sequelize
});

app.use(session({
  secret: process.env.SESSION_SECRET || "keyboardcat",
  resave: false,
  saveUninitialized: false,
  store
}));

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => res.json({ ok: true }));

export default app;
