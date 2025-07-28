'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import CustomerForm from '../../components/CustomerForm';

export default function AdminCreate() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

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

      setSuccess('Customer created successfully!');
      setError('');
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div>
      <Header userType="admin" userName="Admin" />
      
      <main className="p-4">
        <div className="container">
          <div className="mb-4">
            <h1>Create New Customer</h1>
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          <CustomerForm
            onSubmit={handleCreateCustomer}
            onCancel={() => router.push('/admin/dashboard')}
          />
        </div>
      </main>
    </div>
  );
} 