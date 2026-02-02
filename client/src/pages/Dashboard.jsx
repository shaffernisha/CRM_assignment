import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Logo from '../components/Logo';
import CustomerModal from '../components/CustomerModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchCustomers();
  }, [navigate]);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowModal(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await api.delete(`/customers/${id}`);
        fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Failed to delete customer');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingCustomer(null);
    fetchCustomers();
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-left">
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <Logo size={35} />
          <h2 className="header-title">CRM System</h2>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-content fade-in">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back!</h1>
          <p className="welcome-subtitle">Here is what's happening today.</p>
        </div>

        <button className="add-customer-btn" onClick={handleAddCustomer}>
          + Add Customer
        </button>

        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">ACTIVE LEADS</p>
            <p className="stat-value blue">{customers.length}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">TOTAL CUSTOMERS</p>
            <p className="stat-value green">{customers.length}</p>
          </div>
        </div>

        <div className="customer-section">
          <div className="section-header">
            <h2 className="section-title">Customer Directory</h2>
            <button className="filter-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            </button>
          </div>

          {customers.length === 0 ? (
            <div className="empty-state">
              <p>No customers yet. Click "Add Customer" to get started!</p>
            </div>
          ) : (
            <div className="customer-list">
              {customers.map((customer) => (
                <div key={customer._id} className="customer-card">
                  <div className="customer-avatar">
                    {customer.customerName?.charAt(0).toUpperCase() || 'C'}
                  </div>
                  <div className="customer-info">
                    <h3 className="customer-name">{customer.customerName}</h3>
                    <p className="customer-email">{customer.email} • {customer.phone}</p>
                    <p className="customer-company">{customer.company}</p>
                  </div>
                  <div className="customer-actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEditCustomer(customer)}
                      title="Edit Customer"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteCustomer(customer._id)}
                      title="Delete Customer"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {customers.length > 0 && (
            <div className="view-all-section">
              <button className="view-all-btn">View All Customers</button>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <CustomerModal
          customer={editingCustomer}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Dashboard;