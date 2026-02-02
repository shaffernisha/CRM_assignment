import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import Logo from '../components/Logo';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await api.post('/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container fade-in">
        <div className="register-header">
          <Logo size={50} />
        </div>

        <div className="register-content">
          <div className="hero-section">
            <h1 className="hero-title">
              <span className="hero-highlight">WORLD'S FAVORITE</span>
              <br />
              <span className="hero-main">CRM</span>
            </h1>
            <p className="hero-subtitle">for accelerated growth</p>
            <p className="hero-description">
              Our CRM helps 250,000+ businesses run their day-to-day operations better. 
              Close more deals and grow your business effortlessly.
            </p>
          </div>

          <div className="register-form-section">
            <h2 className="form-title">Get started with your free trial</h2>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  disabled={loading}
                />
              </div>

              <div className="form-group password-group">
                <label className="form-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'CREATING ACCOUNT...' : 'GET STARTED'}
              </button>
            </form>

            <div className="form-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="link">Sign In</Link>
              </p>
            </div>
          </div>
        </div>

        <footer className="register-footer">
          <p>© 2026 BlueTrack CRM. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Register;