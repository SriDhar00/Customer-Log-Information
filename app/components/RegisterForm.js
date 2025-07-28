'use client';
import { useState } from 'react';

export default function RegisterForm({ userType, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: userType
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        Register as {userType === 'admin' ? 'Administrator' : 'User'}
      </h2>
      
      {errors.general && (
        <div className="alert alert-error">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-input ${errors.name ? 'border-red-500' : ''}`}
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.name && <div className="alert alert-error">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-input ${errors.email ? 'border-red-500' : ''}`}
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
          {errors.email && <div className="alert alert-error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-input ${errors.password ? 'border-red-500' : ''}`}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password (min 6 characters)"
          />
          {errors.password && <div className="alert alert-error">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password *
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`form-input ${errors.confirmPassword ? 'border-red-500' : ''}`}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <div className="alert alert-error">{errors.confirmPassword}</div>}
        </div>

        <div className="d-flex gap-2">
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
          {onCancel && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
} 