import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import EmployeesSimple from './pages/EmployeesSimple';
import CustomersSimple from './pages/CustomersSimple';
import PayrollSimple from './pages/PayrollSimple';

// Create a simple theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Navigation component
const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Employees', path: '/employees' },
    { label: 'Customers', path: '/customers' },
    { label: 'Payroll', path: '/payroll' },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Qatar Payroll System
        </Typography>
        {navItems.map((item) => (
          <Button
            key={item.path}
            color="inherit"
            onClick={() => navigate(item.path)}
            variant={location.pathname === item.path ? 'outlined' : 'text'}
            sx={{ ml: 1, color: 'white', borderColor: 'white' }}
          >
            {item.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

// Main layout component
const Layout = ({ children }) => {
  return (
    <Box>
      <Navigation />
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        {children}
      </Container>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/employees" element={<EmployeesSimple />} />
                  <Route path="/customers" element={<CustomersSimple />} />
                  <Route path="/payroll" element={<PayrollSimple />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
