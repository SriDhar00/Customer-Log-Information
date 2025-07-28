'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    lastLogin: new Date().toLocaleDateString()
  });

  return (
    <div>
      <Header userType="admin" userName="Admin" />
      
      <main className="p-4">
        <div className="container">
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-avatar">
                A
              </div>
              <h2>Admin Profile</h2>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Profile Information</h3>
              </div>
              <div className="card-body">
                <div className="customer-info">
                  <span className="customer-label">Name:</span>
                  <span className="customer-value">{profile.name}</span>
                </div>
                
                <div className="customer-info">
                  <span className="customer-label">Email:</span>
                  <span className="customer-value">{profile.email}</span>
                </div>
                
                <div className="customer-info">
                  <span className="customer-label">Role:</span>
                  <span className="customer-value">{profile.role}</span>
                </div>
                
                <div className="customer-info">
                  <span className="customer-label">Last Login:</span>
                  <span className="customer-value">{profile.lastLogin}</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Admin Capabilities</h3>
              </div>
              <div className="card-body">
                <ul>
                  <li>Create and manage customer records</li>
                  <li>View customer analytics and statistics</li>
                  <li>Edit and delete customer information</li>
                  <li>Access to all system features</li>
                  <li>User management and permissions</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>System Information</h3>
              </div>
              <div className="card-body">
                <div className="customer-info">
                  <span className="customer-label">System Version:</span>
                  <span className="customer-value">1.0.0</span>
                </div>
                
                <div className="customer-info">
                  <span className="customer-label">Database:</span>
                  <span className="customer-value">MongoDB Atlas</span>
                </div>
                
                <div className="customer-info">
                  <span className="customer-label">Framework:</span>
                  <span className="customer-value">Next.js 15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 