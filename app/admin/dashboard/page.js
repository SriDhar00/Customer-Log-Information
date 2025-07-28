'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import CustomerCard from '../../components/CustomerCard';
import CustomerForm from '../../components/CustomerForm';

export default function AdminDashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    pending: 0
  });
  const router = useRouter();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data);
      
      // Calculate stats
      const stats = {
        total: data.length,
        active: data.filter(c => c.status === 'active').length,
        inactive: data.filter(c => c.status === 'inactive').length,
        pending: data.filter(c => c.status === 'pending').length
      };
      setStats(stats);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCustomer = async (customerData) => {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create customer');
      }

      setShowCreateForm(false);
      fetchCustomers(); // Refresh the list
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditCustomer = async (customerData) => {
    try {
      const response = await fetch(`/api/customers/${editingCustomer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update customer');
      }

      setEditingCustomer(null);
      fetchCustomers(); // Refresh the list
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    if (!confirm('Are you sure you want to delete this customer?')) {
      return;
    }

    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete customer');
      }

      fetchCustomers(); // Refresh the list
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div>
        <Header userType="admin" userName="Admin" />
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <Header userType="admin" userName="Admin" />
      
      <main className="dashboard">
        <div className="container">
          <div className="d-flex justify-between align-center mb-4">
            <h1>Admin Dashboard</h1>
            <button 
              onClick={() => setShowCreateForm(true)}
              className="btn btn-primary"
            >
              Create New Customer
            </button>
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          {/* Stats Cards */}
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Total Customers</h3>
              <div className="dashboard-number">{stats.total}</div>
            </div>
            <div className="dashboard-card">
              <h3>Active</h3>
              <div className="dashboard-number">{stats.active}</div>
            </div>
            <div className="dashboard-card">
              <h3>Inactive</h3>
              <div className="dashboard-number">{stats.inactive}</div>
            </div>
            <div className="dashboard-card">
              <h3>Pending</h3>
              <div className="dashboard-number">{stats.pending}</div>
            </div>
          </div>

          {/* Create/Edit Form */}
          {(showCreateForm || editingCustomer) && (
            <div className="card mb-4">
              <div className="card-header">
                <h3>{editingCustomer ? 'Edit Customer' : 'Create New Customer'}</h3>
              </div>
              <div className="card-body">
                <CustomerForm
                  customer={editingCustomer}
                  onSubmit={editingCustomer ? handleEditCustomer : handleCreateCustomer}
                  onCancel={() => {
                    setShowCreateForm(false);
                    setEditingCustomer(null);
                  }}
                />
              </div>
            </div>
          )}

          {/* Customers List */}
          <div className="card">
            <div className="card-header">
              <h3>Customer List</h3>
            </div>
            <div className="card-body">
              {customers.length === 0 ? (
                <div className="text-center p-4">
                  <p>No customers found. Create your first customer!</p>
                </div>
              ) : (
                <div className="customer-grid">
                  {customers.map((customer) => (
                    <CustomerCard
                      key={customer._id}
                      customer={customer}
                      onEdit={setEditingCustomer}
                      onDelete={handleDeleteCustomer}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 