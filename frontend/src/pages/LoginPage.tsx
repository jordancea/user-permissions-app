import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";


interface LoginFormValues {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { mutate: loginMutate, isPending } = useLogin();

    const { control, handleSubmit } = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: LoginFormValues) => {
        loginMutate(data, {
            onSuccess: () => {
                navigate("/dashboard", { replace: true });
            },
        });
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                p: { xs: 2, sm: 3 },
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    p: { xs: 4, sm: 6 },
                    width: "100%",
                    maxWidth: 440,
                    borderRadius: 3,
                    textAlign: "center",
                }}
            >
                <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
                    Welcome Back
                </Typography>
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Login to access your Application
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: "Email is required" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                autoComplete="email"
                                label="Email"
                                type="email"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: "Password is required" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Password"
                                type="password"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={isPending}>
                        {isPending ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginPage;