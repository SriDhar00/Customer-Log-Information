'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [activeTab, setActiveTab] = useState('admin');

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="logo">Customer Info Logger</div>
          <nav>
            <ul className="nav-menu">
              <li><Link href="/admin/login">Admin Login</Link></li>
              <li><Link href="/admin/register">Admin Register</Link></li>
              <li><Link href="/user/userLogin">User Login</Link></li>
              <li><Link href="/user/register">User Register</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="p-4">
        <div className="text-center mb-4">
          <h1 className="form-title">Welcome to Customer Info Logger</h1>
          <p className="mb-4">Manage your customer information efficiently and securely</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Admin Panel</h3>
            <p>Complete control over customer data and system management</p>
            <div className="mt-3">
              <Link href="/admin/login" className="btn btn-primary">
                Admin Access
              </Link>
              <br />
              <Link href="/admin/register" className="btn btn-success mt-2">
                Register as Admin
              </Link>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>User Portal</h3>
            <p>View and manage customer information with user-friendly interface</p>
            <div className="mt-3">
              <Link href="/user/userLogin" className="btn btn-primary">
                User Access
              </Link>
              <br />
              <Link href="/user/register" className="btn btn-success mt-2">
                Register as User
              </Link>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Features</h2>
          </div>
          <div className="card-body">
            <div className="dashboard-grid">
              <div>
                <h4>Admin Features</h4>
                <ul>
                  <li>Create and manage customer records</li>
                  <li>Dashboard with analytics</li>
                  <li>Edit customer information</li>
                  <li>Profile management</li>
                </ul>
              </div>
              <div>
                <h4>User Features</h4>
                <ul>
                  <li>View customer list</li>
                  <li>Detailed customer information</li>
                  <li>Terms & Conditions</li>
                  <li>User profile management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
