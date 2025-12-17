import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticated } from "../core/middleware/authenticated";
import { hasPermission } from "../core/middleware/hasPermission";


const router = Router();

router.get("/", authenticated, UserController.list);
router.post("/", authenticated, hasPermission("user:create"), UserController.create);
router.put("/:id", authenticated, hasPermission("user:update"), UserController.update);
router.delete("/:id", authenticated, hasPermission("user:delete"), UserController.remove);

export default router;
