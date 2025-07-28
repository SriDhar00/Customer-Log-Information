'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import CustomerCard from '../../components/CustomerCard';

export default function UserCustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div>
        <Header userType="user" userName="User" />
        <div className="loading">Loading customers...</div>
      </div>
    );
  }

  return (
    <div>
      <Header userType="user" userName="User" />
      
      <main className="p-4">
        <div className="container">
          <div className="mb-4">
            <h1>Customer List</h1>
            <p>View and manage customer information</p>
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          {/* Search and Filter */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex gap-2" style={{ flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <label className="form-label">Search Customers</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Search by name, email, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div style={{ minWidth: '150px' }}>
                  <label className="form-label">Filter by Status</label>
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-3">
            <p>
              Showing {filteredCustomers.length} of {customers.length} customers
            </p>
          </div>

          {/* Customers Grid */}
          {filteredCustomers.length === 0 ? (
            <div className="card">
              <div className="card-body text-center p-4">
                <p>No customers found matching your criteria.</p>
              </div>
            </div>
          ) : (
            <div className="customer-grid">
              {filteredCustomers.map((customer) => (
                <CustomerCard
                  key={customer._id}
                  customer={customer}
                  showActions={false} // Users can only view, not edit/delete
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 