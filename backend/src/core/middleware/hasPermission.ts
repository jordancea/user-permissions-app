import { Response, NextFunction } from "express";
import { AuthRequest } from "./authenticated";
import { User } from "../../models/user.model";
import { Role } from "../../models/role.model";
import { Permission } from "../../models/permission.model";

export function hasPermission(permissionKey: string) {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user?.sub) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        try {
            const user = await User.findByPk(req.user.sub, {
                include: [
                    {
                        model: Role,
                        as: "Role",
                        required: true,
                        include: [
                            {
                                model: Permission,
                                as: "Permissions",
                                attributes: ["key"],
                                through: { attributes: [] },
                            },
                        ],
                    },
                ],
            }) as User & { Role: Role & { Permissions: Permission[] } } | null;

            if (!user || !user.Role) {
                return res.status(403).json({ message: "Forbidden: no role assigned" });
            }

            const permissions = user.Role.Permissions.map((p) => p.key);

            if (!permissions.includes(permissionKey)) {
                return res.status(403).json({ message: "Forbidden: missing permission" });
            }

            next();
        } catch (error) {
            console.error("Permission check error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
}