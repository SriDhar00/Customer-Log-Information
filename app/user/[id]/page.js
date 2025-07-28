'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';

export default function CustomerDetail() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      fetchCustomer(params.id);
    }
  }, [params.id]);

  const fetchCustomer = async (id) => {
    try {
      const response = await fetch(`/api/customers/${id}`);
      if (!response.ok) {
        throw new Error('Customer not found');
      }
      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#28a745';
      case 'inactive':
        return '#dc3545';
      case 'pending':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div>
        <Header userType="user" userName="User" />
        <div className="loading">Loading customer details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header userType="user" userName="User" />
        <div className="container p-4">
          <div className="alert alert-error">
            {error}
          </div>
          <button 
            onClick={() => router.push('/user/listoflogger')}
            className="btn btn-primary"
          >
            Back to Customer List
          </button>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div>
        <Header userType="user" userName="User" />
        <div className="container p-4">
          <div className="alert alert-error">
            Customer not found
          </div>
          <button 
            onClick={() => router.push('/user/listoflogger')}
            className="btn btn-primary"
          >
            Back to Customer List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header userType="user" userName="User" />
      
      <main className="p-4">
        <div className="container">
          <div className="mb-4">
            <button 
              onClick={() => router.push('/user/listoflogger')}
              className="btn btn-secondary mb-3"
            >
              ← Back to Customer List
            </button>
          </div>

          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-avatar">
                {customer.name.charAt(0).toUpperCase()}
              </div>
              <h2>{customer.name}</h2>
              <span 
                style={{ 
                  backgroundColor: getStatusColor(customer.status),
                  color: customer.status === 'pending' ? '#212529' : 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                {getStatusText(customer.status)}
              </span>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Contact Information</h3>
              </div>
              <div className="card-body">
                <div className="customer-info">
                  <span className="customer-label">Email:</span>
                  <span className="customer-value">{customer.email}</span>
                </div>
                
                <div className="customer-info">
                  <span className="customer-label">Phone:</span>
                  <span className="customer-value">{customer.phone}</span>
                </div>
                
                {customer.address && (
                  <div className="customer-info">
                    <span className="customer-label">Address:</span>
                    <span className="customer-value">{customer.address}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Professional Information</h3>
              </div>
              <div className="card-body">
                {customer.company && (
                  <div className="customer-info">
                    <span className="customer-label">Company:</span>
                    <span className="customer-value">{customer.company}</span>
                  </div>
                )}
                
                {customer.position && (
                  <div className="customer-info">
                    <span className="customer-label">Position:</span>
                    <span className="customer-value">{customer.position}</span>
                  </div>
                )}
              </div>
            </div>

            {customer.notes && (
              <div className="card">
                <div className="card-header">
                  <h3>Notes</h3>
                </div>
                <div className="card-body">
                  <p>{customer.notes}</p>
                </div>
              </div>
            )}

            <div className="card">
              <div className="card-header">
                <h3>Account Information</h3>
              </div>
              <div className="card-body">
                <div className="customer-info">
                  <span className="customer-label">Customer ID:</span>
                  <span className="customer-value">{customer._id}</span>
                </div>
                
                <div className="customer-info">
                  <span className="customer-label">Created:</span>
                  <span className="customer-value">
                    {new Date(customer.createdAt).toLocaleDateString()} at {new Date(customer.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                
                {customer.updatedAt && customer.updatedAt !== customer.createdAt && (
                  <div className="customer-info">
                    <span className="customer-label">Last Updated:</span>
                    <span className="customer-value">
                      {new Date(customer.updatedAt).toLocaleDateString()} at {new Date(customer.updatedAt).toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 