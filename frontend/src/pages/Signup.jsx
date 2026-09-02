import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';
import AuthButton from '../components/AuthButton';
import CodevoraLogo from '../components/CodevoraLogo';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // UI States
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  // Toggle Password Visibilities
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  // Client-Side Validation
  const validateForm = () => {
    const newErrors = {};
    const username = formData.username.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    if (!username) {
      newErrors.username = 'Username is required.';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    }

    if (!email) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid Gmail / Email format (e.g. abc@gmail.com).';
      }
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler connecting to AuthContext backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await signup(
        formData.username.trim(),
        formData.email.trim(),
        formData.password
      );

      setSuccessMessage('Account created successfully! Redirecting to login...');
      
      // Redirect to login page after short success notification
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setGeneralError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper single-card">
        
        {/* CENTERED SIGNUP FORM PANEL */}
        <div className="form-panel centered">
          
          {/* Custom Brand Logo Header */}
          <Link to="/" className="brand-header centered-header" style={{ textDecoration: 'none' }}>
            <div className="brand-icon-wrapper">
              <CodevoraLogo size={52} />
            </div>
            <h1 className="brand-title">AthlosLab</h1>
          </Link>

          <div className="form-header">
            <h2 className="form-title">Create Your Account</h2>
            <p className="form-subtitle">Join AthlosLab to master C, C++, Java, and Python</p>
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

          {/* Signup Form Element */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            
            <InputField
              id="username"
              label="Username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g. alex_coder"
              icon={User}
              error={errors.username}
              autoComplete="username"
              required
            />

            <InputField
              id="email"
              label="Gmail / Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="abc@gmail.com"
              icon={Mail}
              error={errors.email}
              autoComplete="email"
              required
            />

            <InputField
              id="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password (min 6 chars)"
              icon={Lock}
              error={errors.password}
              isPassword={true}
              isPasswordVisible={isPasswordVisible}
              onTogglePassword={togglePasswordVisibility}
              autoComplete="new-password"
              required
            />

            <InputField
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              icon={Lock}
              error={errors.confirmPassword}
              isPassword={true}
              isPasswordVisible={isConfirmPasswordVisible}
              onTogglePassword={toggleConfirmPasswordVisibility}
              autoComplete="new-password"
              required
            />

            <AuthButton
              type="submit"
              isLoading={isLoading}
              loadingText="Creating account..."
              icon={UserPlus}
            >
              Create Free Account
            </AuthButton>
          </form>

          <div className="form-footer">
            <span>Already have an account?</span>
            <Link to="/login">
              Sign In
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Signup;
