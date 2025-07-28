'use client';
import { useState } from 'react';

export default function CustomerForm({ customer = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    address: customer?.address || '',
    company: customer?.company || '',
    position: customer?.position || '',
    notes: customer?.notes || '',
    status: customer?.status || 'active'
  });

  const [errors, setErrors] = useState({});

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
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {customer ? 'Edit Customer' : 'Create New Customer'}
      </h2>
      
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
            placeholder="Enter full name"
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
            placeholder="Enter email address"
          />
          {errors.email && <div className="alert alert-error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          {errors.phone && <div className="alert alert-error">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="company">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="form-input"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="position">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            className="form-input"
            value={formData.position}
            onChange={handleChange}
            placeholder="Enter job position"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            className="form-textarea"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            className="form-textarea"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter any additional notes"
            rows="4"
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary btn-block">
            {customer ? 'Update Customer' : 'Create Customer'}
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