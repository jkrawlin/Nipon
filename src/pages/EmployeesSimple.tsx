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
  Person as PersonIcon,
} from '@mui/icons-material';

interface Employee {
  id: string;
  name: string;
  qatarId: string;
  passport: string;
  position: string;
  salary: number;
  joinDate: string;
  status: 'active' | 'inactive';
  documentExpiry: string;
}

const EmployeesSimple: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      qatarId: '28512345678',
      passport: 'QA1234567',
      position: 'Manager',
      salary: 15000,
      joinDate: '2023-01-15',
      status: 'active',
      documentExpiry: '2025-12-31',
    },
    {
      id: '2',
      name: 'Fatima Al-Zahra',
      qatarId: '28587654321',
      passport: 'QA7654321',
      position: 'Accountant',
      salary: 8000,
      joinDate: '2023-03-20',
      status: 'active',
      documentExpiry: '2025-06-15',
    },
    {
      id: '3',
      name: 'Mohammed Al-Thani',
      qatarId: '28511122334',
      passport: 'QA9988776',
      position: 'HR Specialist',
      salary: 7000,
      joinDate: '2023-06-10',
      status: 'active',
      documentExpiry: '2024-12-01',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: '',
    qatarId: '',
    passport: '',
    position: '',
    salary: 0,
    joinDate: '',
    documentExpiry: '',
  });

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      qatarId: '',
      passport: '',
      position: '',
      salary: 0,
      joinDate: '',
      documentExpiry: '',
    });
    setOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setOpen(true);
  };

  const handleSaveEmployee = () => {
    if (editingEmployee) {
      // Edit existing employee
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id 
          ? { ...editingEmployee, ...formData } as Employee
          : emp
      ));
    } else {
      // Add new employee
      const newEmployee: Employee = {
        ...formData,
        id: Date.now().toString(),
        status: 'active',
      } as Employee;
      setEmployees([...employees, newEmployee]);
    }
    setOpen(false);
  };

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const isDocumentExpiring = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return expiry <= thirtyDaysFromNow;
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Employee Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddEmployee}
        >
          Add Employee
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PersonIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="primary">
                    {employees.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Employees
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
                <PersonIcon color="success" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="success.main">
                    {employees.filter(emp => emp.status === 'active').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Employees
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
                <PersonIcon color="warning" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="warning.main">
                    {employees.filter(emp => isDocumentExpiring(emp.documentExpiry)).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expiring Documents
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
                <PersonIcon color="info" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4" color="info.main">
                    QAR {employees.reduce((total, emp) => total + emp.salary, 0).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Payroll
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Employee Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Qatar ID</TableCell>
              <TableCell>Passport</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Document Expiry</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.qatarId}</TableCell>
                <TableCell>{employee.passport}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>QAR {employee.salary.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={employee.status}
                    color={employee.status === 'active' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    {employee.documentExpiry}
                    {isDocumentExpiring(employee.documentExpiry) && (
                      <Chip label="Expiring Soon" color="warning" size="small" />
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEditEmployee(employee)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteEmployee(employee.id)}
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

      {/* Add/Edit Employee Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Position"
                value={formData.position || ''}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Qatar ID"
                value={formData.qatarId || ''}
                onChange={(e) => setFormData({ ...formData, qatarId: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Passport Number"
                value={formData.passport || ''}
                onChange={(e) => setFormData({ ...formData, passport: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Salary (QAR)"
                type="number"
                value={formData.salary || ''}
                onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Join Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.joinDate || ''}
                onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Document Expiry Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.documentExpiry || ''}
                onChange={(e) => setFormData({ ...formData, documentExpiry: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEmployee} variant="contained">
            {editingEmployee ? 'Update' : 'Add'} Employee
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeesSimple;
