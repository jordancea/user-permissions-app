import bcrypt from "bcrypt";
import { sequelize } from "../models";
import { Role } from "../models/role.model";
import { Permission } from "../models/permission.model";
import { User } from "../models/user.model";
import "../models";

async function seed() {
    try {
        await sequelize.sync({ force: true });
        console.log("Database synced");

        const permissions = await Permission.bulkCreate(
            [
                { key: "user:create", description: "Create users" },
                { key: "user:update", description: "Update users" },
                { key: "user:delete", description: "Delete users" },
                { key: "roles:update", description: "Update role permissions" },
                { key: "content:edit", description: "Edit content" },
                { key: "content:view", description: "View content" }
            ],
            { returning: true }
        );

        const permMap = permissions.reduce<Record<string, Permission>>(
            (acc, perm) => {
                acc[perm.key] = perm;
                return acc;
            },
            {}
        );
        const admin = await Role.create({ name: "Admin" });
        const editor = await Role.create({ name: "Editor" });
        const viewer = await Role.create({ name: "Viewer" });

        await admin.setPermissions([
            permMap["user:create"],
            permMap["user:update"],
            permMap["user:delete"],
            permMap["roles:update"],
            permMap["content:view"]
        ]);

        await editor.setPermissions([permMap["content:edit"], permMap["content:view"]]);
        await viewer.setPermissions([permMap["content:view"]]);

        const passwordHash = await bcrypt.hash("password", 10);

        await User.bulkCreate([
            { name: "Admin User", email: "admin@test.com", password: passwordHash, roleId: admin.id },
            { name: "Editor User", email: "editor@test.com", password: passwordHash, roleId: editor.id },
            { name: "Viewer User", email: "viewer@test.com", password: passwordHash, roleId: viewer.id }
        ]);

        console.log("Users created");
        console.log("Database seeding completed successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
}

seed();
