import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchEmployees } from '../store/slices/employeeSlice';
import { Employee } from '../types';

const Employees: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  const dispatch = useAppDispatch();
  const { employees, loading } = useAppSelector(state => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAddNew = () => {
    setSelectedEmployee(null);
    setOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'terminated': return 'error';
      case 'suspended': return 'warning';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="h6">Loading employees...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Employee Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add Employee
        </Button>
      </Box>

      <Grid container spacing={3}>
        {employees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee.id}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ mr: 2 }}>
                    <PersonIcon />
                  </Avatar>
                  <Box flexGrow={1}>
                    <Typography variant="h6">
                      {employee.personalInfo.firstName} {employee.personalInfo.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {employee.employmentInfo.jobTitle}
                    </Typography>
                  </Box>
                </Box>
                
                <Box mb={2}>
                  <Chip
                    label={employee.employmentInfo.employmentStatus}
                    color={getStatusColor(employee.employmentInfo.employmentStatus) as any}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" mb={1}>
                  Employee ID: {employee.employmentInfo.employeeId}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Salary: {employee.employmentInfo.currency} {employee.employmentInfo.baseSalary.toLocaleString()}
                </Typography>

                <Box display="flex" justifyContent="flex-end">
                  <IconButton size="small" onClick={() => handleEdit(employee)}>
                    <ViewIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleEdit(employee)}>
                    <EditIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {employees.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <PersonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No employees found
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Get started by adding your first employee
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddNew}
            >
              Add First Employee
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Employee Form Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  defaultValue={selectedEmployee?.personalInfo.firstName || ''}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  defaultValue={selectedEmployee?.personalInfo.lastName || ''}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  defaultValue={selectedEmployee?.personalInfo.email || ''}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  defaultValue={selectedEmployee?.personalInfo.phone || ''}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  defaultValue={selectedEmployee?.employmentInfo.jobTitle || ''}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Base Salary"
                  type="number"
                  defaultValue={selectedEmployee?.employmentInfo.baseSalary || ''}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained">
            {selectedEmployee ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Employees;
