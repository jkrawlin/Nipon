# Qatar Payroll Management System

A comprehensive web application for managing payroll, employee records, and customer relationships for Qatar-based companies.

## Features

- **Employee Management**: Complete employee profiles with passport and Qatar ID tracking
- **Payroll System**: Salary tracking, advance payments, and transaction history
- **Notification System**: Automated alerts for document expiry dates
- **Customer Management**: Client database with invoicing capabilities
- **Receipt Printing**: Professional invoices and receipts with QR codes
- **Document Management**: Secure file uploads for employee documents
- **Multi-language Support**: English and Arabic support
- **Real-time Notifications**: Firebase-powered notification system

## Tech Stack

- **Frontend**: React.js with TypeScript, Material-UI
- **Backend**: Firebase (Firestore, Authentication, Storage, Cloud Functions)
- **State Management**: Redux Toolkit
- **PDF Generation**: jsPDF, pdf-lib
- **Charts**: Recharts
- **Testing**: Jest, Cypress

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd qatar-payroll-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with Firebase configuration:
```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm start
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── store/              # Redux store configuration
├── services/           # Firebase and API services
├── utils/              # Helper functions
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── i18n/               # Internationalization files
└── styles/             # Global styles and themes
```

## Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication, Firestore Database, and Storage
3. Set up security rules for Firestore and Storage
4. Deploy Cloud Functions for notifications

## Deployment

Build and deploy to Firebase Hosting:

```bash
npm run build
firebase deploy
```

## Testing

Run unit tests:
```bash
npm test
```

Run E2E tests:
```bash
npm run cypress:run
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
