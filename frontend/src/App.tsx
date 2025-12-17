
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { theme } from './theme';
import { queryClient } from './config/queryClient';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import { Alert } from './components/shared/Alert';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { PublicRoute } from './components/shared/PublicRoute';



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Alert />
        <BrowserRouter>
          <Routes>
            <Route path="/"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;