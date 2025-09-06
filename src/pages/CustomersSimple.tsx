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
  Edit as EditIcon,
  Delete as DeleteIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

const CustomersSimple = () => {
  const [customers, setCustomers] = useState([
    {
      id: '1',
      name: 'Qatar National Bank',
      contactPerson: 'Ahmed Al-Kuwari',
      email: 'ahmed.k@qnb.com',
      phone: '+974 4407 4407',
      status: 'active',
      outstandingAmount: 25000,
    },
    {
      id: '2',
      name: 'Ooredoo Qatar',
      contactPerson: 'Sarah Al-Mahmoud',
      email: 'sarah.m@ooredoo.qa',
      phone: '+974 4444 0000',
      status: 'active',
      outstandingAmount: 15000,
    },
    {
      id: '3',
      name: 'Qatar Airways',
      contactPerson: 'Mohammed Al-Thani',
      email: 'mohammed.t@qatarairways.com',
      phone: '+974 4021 4444',
      status: 'active',
      outstandingAmount: 0,
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    outstandingAmount: 0,
  });

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setFormData({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      outstandingAmount: 0,
    });
    setOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setFormData(customer);
    setOpen(true);
  };

  const handleSaveCustomer = () => {
    if (editingCustomer) {
      setCustomers(customers.map(cust => 
        cust.id === editingCustomer.id 
          ? { ...editingCustomer, ...formData }
          : cust
      ));
    } else {
      const newCustomer = {
        ...formData,
        id: Date.now().toString(),
        status: 'active',
      };
      setCustomers([...customers, newCustomer]);
    }
    setOpen(false);
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(cust => cust.id !== id));
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Customer Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCustomer}
        >
          Add Customer
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <BusinessIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="primary">
                    {customers.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Customers
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
                <BusinessIcon color="success" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="success.main">
                    {customers.filter(cust => cust.status === 'active').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Customers
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
                <BusinessIcon color="warning" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="warning.main">
                    {customers.filter(cust => cust.outstandingAmount > 0).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Outstanding Invoices
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
                <BusinessIcon color="error" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="error.main">
                    QAR {customers.reduce((total, cust) => total + cust.outstandingAmount, 0).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Outstanding
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Customer Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Outstanding Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.contactPerson}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <Typography color={customer.outstandingAmount > 0 ? 'error.main' : 'success.main'}>
                    QAR {customer.outstandingAmount.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={customer.status}
                    color={customer.status === 'active' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEditCustomer(customer)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteCustomer(customer.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Customer Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Person"
                value={formData.contactPerson || ''}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Outstanding Amount (QAR)"
                type="number"
                value={formData.outstandingAmount || ''}
                onChange={(e) => setFormData({ ...formData, outstandingAmount: Number(e.target.value) })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveCustomer} variant="contained">
            {editingCustomer ? 'Update' : 'Add'} Customer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomersSimple;
