import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post("/select", AuthController.select);
router.post("/logout", AuthController.logout);
router.get("/me", AuthController.me);
router.post("/login", AuthController.login);

export default router;
