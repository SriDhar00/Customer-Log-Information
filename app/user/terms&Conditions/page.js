'use client';
import Header from '../../components/Header';

export default function TermsAndConditions() {
  return (
    <div>
      <Header userType="user" userName="User" />
      
      <main className="p-4">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h1>Terms & Conditions</h1>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <h3>1. Acceptance of Terms</h3>
                <p>
                  By accessing and using the Customer Info Logger system, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </div>

              <div className="mb-4">
                <h3>2. Use License</h3>
                <p>
                  Permission is granted to temporarily access the Customer Info Logger system for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul>
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained in the system</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </div>

              <div className="mb-4">
                <h3>3. Data Privacy</h3>
                <p>
                  We are committed to protecting your privacy and the privacy of our customers. All customer information is stored securely and accessed only by authorized personnel.
                </p>
                <ul>
                  <li>Customer data is encrypted during transmission</li>
                  <li>Access is restricted to authorized users only</li>
                  <li>Regular security audits are conducted</li>
                  <li>Data is backed up regularly</li>
                </ul>
              </div>

              <div className="mb-4">
                <h3>4. User Responsibilities</h3>
                <p>
                  As a user of this system, you are responsible for:
                </p>
                <ul>
                  <li>Maintaining the confidentiality of your login credentials</li>
                  <li>Reporting any security concerns immediately</li>
                  <li>Using the system in accordance with these terms</li>
                  <li>Not sharing your account with others</li>
                </ul>
              </div>

              <div className="mb-4">
                <h3>5. Prohibited Activities</h3>
                <p>
                  The following activities are strictly prohibited:
                </p>
                <ul>
                  <li>Unauthorized access to customer data</li>
                  <li>Sharing customer information with unauthorized parties</li>
                  <li>Attempting to breach system security</li>
                  <li>Using the system for illegal purposes</li>
                </ul>
              </div>

              <div className="mb-4">
                <h3>6. System Availability</h3>
                <p>
                  We strive to maintain high system availability but cannot guarantee uninterrupted access. The system may be temporarily unavailable for maintenance or due to technical issues.
                </p>
              </div>

              <div className="mb-4">
                <h3>7. Limitation of Liability</h3>
                <p>
                  In no event shall the Customer Info Logger system or its suppliers be liable for any damages arising out of the use or inability to use the system.
                </p>
              </div>

              <div className="mb-4">
                <h3>8. Changes to Terms</h3>
                <p>
                  We reserve the right to modify these terms at any time. Users will be notified of any changes, and continued use of the system constitutes acceptance of the new terms.
                </p>
              </div>

              <div className="mb-4">
                <h3>9. Contact Information</h3>
                <p>
                  If you have any questions about these Terms & Conditions, please contact us at:
                </p>
                <ul>
                  <li>Email: support@customerlogger.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Address: 123 Business St, City, State 12345</li>
                </ul>
              </div>

              <div className="mb-4">
                <h3>10. Governing Law</h3>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the system is operated.
                </p>
              </div>

              <div className="alert alert-info">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 