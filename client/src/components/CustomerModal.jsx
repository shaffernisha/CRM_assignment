import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const CustomerModal = ({ customer, onClose }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    company: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (customer) {
      setFormData({
        customerName: customer.customerName || '',
        email: customer.email || '',
        phone: customer.phone || '',
        company: customer.company || ''
      });
    }
  }, [customer]);

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
    if (!formData.customerName || !formData.email || !formData.phone) {
      setError('Name, email, and phone are required');
      setLoading(false);
      return;
    }

    try {
      if (customer) {
        // Update existing customer
        await api.put(`/customers/${customer._id}`, formData);
      } else {
        // Create new customer
        await api.post('/customers', formData);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save customer');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.className === 'modal-backdrop') {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container fade-in">
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>✕</button>
          <h2 className="modal-title">{customer ? 'Edit Customer' : 'Add Customer'}</h2>
          <button className="modal-save" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>

        <div className="modal-body">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="customer-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="customerName"
                placeholder="e.g. Sana Yusra"
                value={formData.customerName}
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
                placeholder="e.g. yusra@example.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="e.g. +91 00000 00000"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Company</label>
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              />
            </div>

            <button type="submit" className="save-customer-btn" disabled={loading}>
              {loading ? 'Saving Customer...' : 'Save Customer'}
            </button>

            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;