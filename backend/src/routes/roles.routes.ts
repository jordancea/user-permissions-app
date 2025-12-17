import { Router } from "express";
import { RoleController } from "../controllers/role.controller";
import { authenticated } from "../core/middleware/authenticated";
import { hasPermission } from "../core/middleware/hasPermission";

const router = Router();

router.get("/", authenticated, RoleController.list);
router.put("/:id", authenticated, hasPermission("roles:update"), RoleController.updatePermissions);

export default router;
