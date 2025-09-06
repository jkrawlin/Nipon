import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1976d2' }}>Qatar Payroll System</h1>
      <p>Welcome to the Qatar Payroll Management Platform</p>
      <p>The application is working! 🎉</p>
      
      <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '5px' }}>
          Dashboard
        </button>
        <button style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '5px' }}>
          Employees
        </button>
        <button style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '5px' }}>
          Customers
        </button>
        <button style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '5px' }}>
          Payroll
        </button>
      </div>
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
        <h3>Features:</h3>
        <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
          <li>Employee Management with Qatar ID/Passport tracking</li>
          <li>Salary and Transaction Management</li>
          <li>Document Expiry Notifications</li>
          <li>Customer Database</li>
          <li>Receipt Printing</li>
          <li>Cash Flow Tracking</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
