import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Memories from './pages/Memories';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#E25555' }}>
          <h1>Something went wrong.</h1>
          <pre style={{ textAlign: 'left', background: '#eee', padding: '1rem', overflow: 'auto', maxWidth: '800px', margin: '0 auto' }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '1rem', cursor: 'pointer' }}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/memories"
            element={
              <ProtectedRoute>
                <Memories />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
