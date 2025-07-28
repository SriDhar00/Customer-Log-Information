'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RegisterForm from '../../components/RegisterForm';

export default function AdminRegister() {
  const [showRegistration, setShowRegistration] = useState(true);
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegistrationSuccess = (data) => {
    setSuccess('Admin account created successfully! You can now login.');
    setShowRegistration(false);
    
    // Redirect to login after 3 seconds
    setTimeout(() => {
      router.push('/admin/login');
    }, 3000);
  };

  const handleCancel = () => {
    router.push('/admin/login');
  };

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
              Customer Info Logger
            </Link>
          </div>
        </div>
      </header>

      <main className="p-4">
        {showRegistration ? (
          <RegisterForm
            userType="admin"
            onSuccess={handleRegistrationSuccess}
            onCancel={handleCancel}
          />
        ) : (
          <div className="form-container">
            <div className="alert alert-success">
              {success}
            </div>
            <div className="text-center">
              <p>Redirecting to login page...</p>
              <Link href="/admin/login" className="btn btn-primary">
                Go to Login
              </Link>
            </div>
          </div>
        )}

        <div className="text-center mt-3">
          <p>Already have an account?</p>
          <Link href="/admin/login" className="btn btn-secondary">
            Admin Login
          </Link>
        </div>
      </main>
    </div>
  );
} 