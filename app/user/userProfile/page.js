'use client';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: 'Regular User',
    email: 'user@example.com',
    role: 'User',
    permissions: ['View Customers', 'View Customer Details'],
    lastLogin: new Date().toLocaleDateString(),
    memberSince: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString() // 30 days ago
  });

  return (
    <div>
      <Header userType="user" userName="User" />
      
      <main className="p-4">
        <div className="container">
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-avatar">
                U
              </div>
              <h2>User Profile</h2>
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
                  <span className="customer-label">Member Since:</span>
                  <span className="customer-value">{profile.memberSince}</span>
                </div>
                
                <div className="customer-info">
                  <span className="customer-label">Last Login:</span>
                  <span className="customer-value">{profile.lastLogin}</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>User Permissions</h3>
              </div>
              <div className="card-body">
                <p>As a regular user, you have the following permissions:</p>
                <ul>
                  {profile.permissions.map((permission, index) => (
                    <li key={index}>{permission}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>User Capabilities</h3>
              </div>
              <div className="card-body">
                <ul>
                  <li>View customer list and search customers</li>
                  <li>View detailed customer information</li>
                  <li>Filter customers by status</li>
                  <li>Access Terms & Conditions</li>
                  <li>View your profile information</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Account Security</h3>
              </div>
              <div className="card-body">
                <div className="customer-info">
                  <span className="customer-label">Password Last Changed:</span>
                  <span className="customer-value">30 days ago</span>
                </div>
                
                <div className="customer-info">
                  <span className="customer-label">Two-Factor Authentication:</span>
                  <span className="customer-value">Not enabled</span>
                </div>
                
                <div className="customer-info">
                  <span className="customer-label">Account Status:</span>
                  <span className="customer-value" style={{ color: '#28a745', fontWeight: '600' }}>
                    Active
                  </span>
                </div>
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

            <div className="card">
              <div className="card-header">
                <h3>Support & Help</h3>
              </div>
              <div className="card-body">
                <p>If you need assistance or have questions:</p>
                <ul>
                  <li>Email: support@customerlogger.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Hours: Monday - Friday, 9 AM - 5 PM EST</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 