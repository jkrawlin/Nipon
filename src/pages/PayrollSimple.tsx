import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Payment as PaymentIcon,
  Download as DownloadIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material';

const PayrollSimple = () => {
  const [payrollRecords, setPayrollRecords] = useState([
    {
      id: '1',
      employeeName: 'Ahmed Al-Rashid',
      employeeId: 'EMP001',
      month: '2024-08',
      basicSalary: 15000,
      allowances: 2000,
      deductions: 1500,
      netSalary: 15500,
      status: 'paid',
      payDate: '2024-08-31',
    },
    {
      id: '2',
      employeeName: 'Fatima Al-Zahra',
      employeeId: 'EMP002',
      month: '2024-08',
      basicSalary: 8000,
      allowances: 1200,
      deductions: 800,
      netSalary: 8400,
      status: 'pending',
      payDate: '',
    },
    {
      id: '3',
      employeeName: 'Mohammed Al-Thani',
      employeeId: 'EMP003',
      month: '2024-08',
      basicSalary: 7000,
      allowances: 1000,
      deductions: 700,
      netSalary: 7300,
      status: 'paid',
      payDate: '2024-08-31',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleProcessPayment = (recordId) => {
    setPayrollRecords(payrollRecords.map(record => 
      record.id === recordId 
        ? { ...record, status: 'paid', payDate: new Date().toISOString().split('T')[0] }
        : record
    ));
  };

  const handleGenerateReport = () => {
    alert('Payroll report generated! (This would download a PDF in a real application)');
  };

  const handlePrintReceipt = (record) => {
    alert(`Receipt printed for ${record.employeeName} - ${record.month}`);
  };

  const totalBasicSalary = payrollRecords.reduce((total, record) => total + record.basicSalary, 0);
  const totalAllowances = payrollRecords.reduce((total, record) => total + record.allowances, 0);
  const totalDeductions = payrollRecords.reduce((total, record) => total + record.deductions, 0);
  const totalNetPayroll = payrollRecords.reduce((total, record) => total + record.netSalary, 0);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Payroll Management
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleGenerateReport}
            sx={{ mr: 2 }}
          >
            Generate Report
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Process New Payroll
          </Button>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PaymentIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="primary">
                    QAR {totalBasicSalary.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Basic Salary
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PaymentIcon color="success" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="success.main">
                    QAR {totalAllowances.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Allowances
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PaymentIcon color="error" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="error.main">
                    QAR {totalDeductions.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Deductions
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PaymentIcon color="info" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="info.main">
                    QAR {totalNetPayroll.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Net Payroll
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Payroll Summary */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment Status Summary
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Paid Employees:</Typography>
                <Chip 
                  label={payrollRecords.filter(r => r.status === 'paid').length} 
                  color="success" 
                  size="small" 
                />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Pending Payments:</Typography>
                <Chip 
                  label={payrollRecords.filter(r => r.status === 'pending').length} 
                  color="warning" 
                  size="small" 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Month Overview
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                August 2024 Payroll
              </Typography>
              <Typography variant="h5" color="primary">
                QAR {totalNetPayroll.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total amount to be disbursed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Payroll Records Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Basic Salary</TableCell>
              <TableCell>Allowances</TableCell>
              <TableCell>Deductions</TableCell>
              <TableCell>Net Salary</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrollRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.employeeName}</TableCell>
                <TableCell>{record.employeeId}</TableCell>
                <TableCell>{record.month}</TableCell>
                <TableCell>QAR {record.basicSalary.toLocaleString()}</TableCell>
                <TableCell>QAR {record.allowances.toLocaleString()}</TableCell>
                <TableCell>QAR {record.deductions.toLocaleString()}</TableCell>
                <TableCell>
                  <Typography fontWeight="bold" color="primary">
                    QAR {record.netSalary.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={record.status}
                    color={record.status === 'paid' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {record.status === 'pending' && (
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => handleProcessPayment(record.id)}
                      sx={{ mr: 1 }}
                    >
                      Pay
                    </Button>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => handlePrintReceipt(record)}
                    color="primary"
                  >
                    <ReceiptIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* New Payroll Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Process New Payroll</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Payroll Processing Options
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              This feature would integrate with employee data to automatically calculate payroll
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Select Month"
                  type="month"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department (Optional)"
                  placeholder="All departments"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            onClick={() => {
              alert('Payroll would be processed for selected employees');
              setOpen(false);
            }} 
            variant="contained"
          >
            Process Payroll
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PayrollSimple;
