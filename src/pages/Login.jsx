import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import '../index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded auth
    if (username.toLowerCase() === 'nazeeb' && password === 'love') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/memories');
    } else {
      setError('Wrong secret code! Try again ♥');
    }
  };

  return (
    <div className="full-screen flex-center" style={{ 
      background: 'linear-gradient(135deg, #FFE6E6 0%, #FF9E9E 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Hearts */}
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ repeat: Infinity, duration: 3 }}
        style={{ position: 'absolute', top: '10%', left: '10%', color: 'rgba(255,255,255,0.4)', fontSize: '3rem' }}
      >
        <FaHeart />
      </motion.div>
      <motion.div 
        animate={{ y: [0, -30, 0] }} 
        transition={{ repeat: Infinity, duration: 4, delay: 1 }}
        style={{ position: 'absolute', bottom: '20%', right: '15%', color: 'rgba(255,255,255,0.3)', fontSize: '4rem' }}
      >
        <FaHeart />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(255, 107, 107, 0.2)',
          width: '90%',
          maxWidth: '400px',
          textAlign: 'center'
        }}
      >
        <h1 style={{ marginBottom: '1.5rem', color: 'var(--color-primary-dark)' }}>For You</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>Enter the secret words to open my heart.</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Who are you?"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid #ddd',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem'
            }}
          />
          <input
            type="password"
            placeholder="Secret Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid #ddd',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem'
            }}
          />
          
          {error && <p style={{ color: '#E25555', fontSize: '0.9rem' }}>{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={{
              padding: '1rem',
              borderRadius: '10px',
              background: 'var(--color-primary)',
              color: 'white',
              fontWeight: '600',
              fontSize: '1.1rem',
              marginTop: '1rem'
            }}
          >
            Open <FaHeart style={{ marginLeft: '5px', verticalAlign: 'middle' }} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
