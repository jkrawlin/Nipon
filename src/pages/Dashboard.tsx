import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
} from '@mui/material';
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  AttachMoney as MoneyIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'warning' | 'error' | 'info' | 'success';
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, subtitle }) => {
  return (
    <Card elevation={3}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            sx={{
              backgroundColor: `${color}.main`,
              color: 'white',
              mr: 2,
            }}
          >
            {icon}
          </Avatar>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" color={`${color}.main`}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  // Demo data instead of fetching from Redux/Firebase
  const stats = {
    employees: {
      total: 25,
      active: 23,
      terminated: 2,
      documentsExpiringSoon: 3,
    },
    customers: {
      total: 15,
      active: 12,
      outstandingInvoices: 4,
      totalOutstanding: 45000,
    },
    payroll: {
      monthlyTotal: 375000,
      pendingPayments: 2,
      advancesOutstanding: 25000,
    },
    cashFlow: {
      currentBalance: 125000,
      monthlyInflow: 400000,
      monthlyOutflow: 275000,
      projectedBalance: 250000,
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Welcome to the Qatar Payroll Management System
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Employees"
            value={stats.employees.total}
            icon={<PeopleIcon />}
            color="primary"
            subtitle={`${stats.employees.active} active`}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Customers"
            value={stats.customers.active}
            icon={<BusinessIcon />}
            color="info"
            subtitle={`${stats.customers.total} total`}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Monthly Payroll"
            value={`QAR ${stats.payroll.monthlyTotal.toLocaleString()}`}
            icon={<MoneyIcon />}
            color="success"
            subtitle="Current month"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Expiring Documents"
            value={stats.employees.documentsExpiringSoon}
            icon={<WarningIcon />}
            color="warning"
            subtitle="Next 30 days"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cash Flow Summary
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Current Balance
                  </Typography>
                  <Typography variant="h6" color="primary.main">
                    QAR {stats.cashFlow.currentBalance.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Monthly Inflow
                  </Typography>
                  <Typography variant="body1" color="success.main">
                    +QAR {stats.cashFlow.monthlyInflow.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Monthly Outflow
                  </Typography>
                  <Typography variant="body1" color="error.main">
                    -QAR {stats.cashFlow.monthlyOutflow.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Alerts
              </Typography>
              
              {stats.employees.documentsExpiringSoon > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={<WarningIcon />}
                    label={`${stats.employees.documentsExpiringSoon} documents expiring soon`}
                    color="warning"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </Box>
              )}
              
              {stats.payroll.pendingPayments > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={<MoneyIcon />}
                    label={`${stats.payroll.pendingPayments} pending payments`}
                    color="info"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </Box>
              )}

              {stats.customers.outstandingInvoices > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={<BusinessIcon />}
                    label={`${stats.customers.outstandingInvoices} outstanding invoices`}
                    color="secondary"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
