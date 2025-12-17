import {
  Box,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useCreateUser } from "../../../hooks/useUsers";
import { useUpdateUser } from "../../../hooks/useUsers";
import { useRoles } from "../../../hooks/useRoles";
import { useDialogStore } from "../../shared/CustomDialog/dialogStore";
import type { UserUpdatePayload, UserCreatePayload } from "../../../types/users.types";

interface UserFormValues {
  id?: number;
  name: string;
  email: string;
  roleId: number;
  password?: string;
}

interface UserFormProps {
  initialData?: Partial<UserFormValues>;
}

export const UserForm = ({ initialData = {} }: UserFormProps) => {
  const { closeDialog } = useDialogStore();
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { roles = [], isLoading: isLoadingRoles } = useRoles();

  const isEdit = !!initialData.id;
  const isPending = isEdit ? isUpdating : isCreating;

  const defaultRoleId = roles.length > 0 ? roles[0].id : 0;

  const { control, handleSubmit } = useForm<UserFormValues>({
    defaultValues: {
      name: initialData.name || "",
      email: initialData.email || "",
      roleId: initialData.roleId ?? defaultRoleId,
      password: isEdit ? undefined : "",
    },
  });

  const onSubmit = (values: UserFormValues) => {
    if (isEdit) {
      const updatePayload: UserUpdatePayload = {
        name: values.name,
        email: values.email,
        roleId: values.roleId,
        ...(values.password && { password: values.password }),
      };

      updateUser(
        {
          id: initialData.id!,
          payload: updatePayload,
        },
        {
          onSuccess: () => closeDialog(),
        }
      );
    } else {
      const createPayload: UserCreatePayload = {
        name: values.name,
        email: values.email,
        roleId: values.roleId,
        password: values.password!,
      };

      createUser(createPayload, {
        onSuccess: () => closeDialog(),
      });
    }
  };

  if (isLoadingRoles) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (roles.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error">No roles available.</Typography>
        <Button onClick={closeDialog} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Name"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Email"
            type="email"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      {!isEdit && (
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              error={!!fieldState.error}
              helperText={fieldState.error?.message || "Minimum 8 characters"}
            />
          )}
        />
      )}

      <Controller
        name="roleId"
        control={control}
        rules={{ required: "Role is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            label="Role"
            error={!!fieldState.error}
            helperText={fieldState.error?.message || " "}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
        <Button onClick={closeDialog} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? <CircularProgress size={20} /> : isEdit ? "Update" : "Create"}
        </Button>
      </Box>
    </Box>
  );
};