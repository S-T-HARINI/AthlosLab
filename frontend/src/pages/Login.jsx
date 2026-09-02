import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, AlertCircle, CheckCircle2, LogIn, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';
import AuthButton from '../components/AuthButton';
import CodevoraLogo from '../components/CodevoraLogo';

// Google Multicolor Brand Icon
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false,
  });

  // UI States
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: val }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Client-Side Validation Logic
  const validateForm = () => {
    const newErrors = {};
    const identifier = formData.identifier.trim();
    const password = formData.password.trim();

    if (!identifier) {
      newErrors.identifier = 'Username or Gmail (e.g. abc@gmail.com) is required.';
    } else if (identifier.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        newErrors.identifier = 'Please enter a valid Gmail / Email address (e.g. abc@gmail.com).';
      }
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission connected to AuthContext login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.identifier.trim(), formData.password);
      setSuccessMessage('Login successful! Redirecting to Home...');
      
      // Redirect to Home after JWT token is received and saved
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setGeneralError(err.message || 'Invalid username/email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger Google Auth Modal Demo
  const handleGoogleClick = () => {
    setShowGoogleModal(true);
  };

  const handleSelectGoogleAccount = (selectedEmail) => {
    setShowGoogleModal(false);
    setFormData((prev) => ({ ...prev, identifier: selectedEmail }));
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper single-card">
        
        {/* CENTERED LOGIN FORM PANEL */}
        <div className="form-panel centered">
          
          {/* Custom Brand Logo Header -> Navigates to Home (/) */}
          <Link to="/" className="brand-header centered-header" style={{ textDecoration: 'none' }}>
            <div className="brand-icon-wrapper">
              <CodevoraLogo size={52} />
            </div>
            <h1 className="brand-title">AthlosLab</h1>
          </Link>

          <div className="form-header">
            <h2 className="form-title">Initialize Session</h2>
            <p className="form-subtitle">Enter your credentials or sign in with Google</p>
          </div>

          {/* General Error Banner */}
          {generalError && (
            <div className="alert-error-banner" role="alert" style={{ marginBottom: '1.25rem' }}>
              <AlertCircle size={18} />
              <span>{generalError}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="alert-success-banner" role="status" style={{ marginBottom: '1.25rem' }}>
              <CheckCircle2 size={18} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            type="button"
            className="google-auth-btn"
            onClick={handleGoogleClick}
          >
            <GoogleIcon />
            <span>Sign in with Google</span>
          </button>

          {/* Divider */}
          <div className="social-divider">
            <span>or sign in with credentials</span>
          </div>

          {/* Form Element */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            
            <InputField
              id="identifier"
              label="Username or Gmail"
              name="identifier"
              type="text"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="abc@gmail.com or username"
              icon={User}
              error={errors.identifier}
              autoComplete="username"
              required
            />

            <InputField
              id="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              icon={Lock}
              error={errors.password}
              isPassword={true}
              isPasswordVisible={isPasswordVisible}
              onTogglePassword={togglePasswordVisibility}
              autoComplete="current-password"
              required
            />

            <div className="form-options-row">
              <label className="remember-checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="custom-checkbox"
                />
                <span>Remember session</span>
              </label>

              <a href="#forgot-password" onClick={(e) => e.preventDefault()} className="forgot-link">
                Forgot password?
              </a>
            </div>

            <AuthButton
              type="submit"
              isLoading={isLoading}
              loadingText="Authenticating..."
              icon={LogIn}
            >
              Sign In
            </AuthButton>
          </form>

          <div className="form-footer">
            <span>Don't have an account?</span>
            <Link to="/signup">
              Sign Up
            </Link>
          </div>

        </div>

      </div>

      {/* SIMULATED GOOGLE OAUTH POPUP MODAL */}
      {showGoogleModal && (
        <div className="modal-backdrop" onClick={() => setShowGoogleModal(false)}>
          <div className="google-oauth-modal" onClick={(e) => e.stopPropagation()}>
            <div className="google-modal-header">
              <div className="google-modal-brand">
                <GoogleIcon />
                <span>Sign in with Google — google.com</span>
              </div>
              <button
                className="google-modal-close"
                onClick={() => setShowGoogleModal(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="google-modal-body">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <GoogleIcon />
              </div>
              <h3>Choose an account</h3>
              <p>to continue to <strong>AthlosLab</strong></p>

              <div
                className="google-account-card"
                onClick={() => handleSelectGoogleAccount('abc@gmail.com')}
              >
                <div className="account-avatar">A</div>
                <div className="account-info">
                  <span className="account-name">Alex Developer</span>
                  <span className="account-email">abc@gmail.com</span>
                </div>
              </div>

              <div
                className="google-account-card"
                onClick={() => handleSelectGoogleAccount('dev.master@gmail.com')}
              >
                <div className="account-avatar" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>D</div>
                <div className="account-info">
                  <span className="account-name">Dev Master</span>
                  <span className="account-email">dev.master@gmail.com</span>
                </div>
              </div>

            </div>

            <div className="google-modal-footer">
              <span>To continue, Google will share your name, email address, and profile picture with AthlosLab.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
