// utils/emptyObjects/emptyUsers.ts (or your file path)

import type { User } from "../../types/users.types";

/**
 * Safe empty user object – used as fallback during loading states
 */
export const emptyUser: User = {
  id: 0,
  name: "",
  email: "",
  roleId: 0,
  Role: {
    id: 0,                  // ← required
    name: "",
    createdAt: "",          // ← required
    updatedAt: "",          // ← required
    Permissions: [],        // ← empty mutable array – safe for .map()
  },
};

/**
 * Empty users list – fallback when query data is undefined
 */
export const emptyUsersList: User[] = [];