import { render, screen } from '@testing-library/react';
import App from './App';

// Mock Firebase
jest.mock('./config/firebase', () => ({
  auth: {},
  db: {},
  storage: {},
  functions: {},
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
}));

test('renders without crashing', () => {
  render(<App />);
  // Just check that the app renders without throwing
  expect(true).toBe(true);
});
