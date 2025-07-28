'use client';
import Link from 'next/link';

export default function CustomerCard({ customer, onEdit, onDelete, showActions = true }) {
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

  return (
    <div className="customer-card">
      <div className="customer-header">
        <h3>{customer.name}</h3>
        <span 
          style={{ 
            backgroundColor: getStatusColor(customer.status),
            color: customer.status === 'pending' ? '#212529' : 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '3px',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}
        >
          {getStatusText(customer.status)}
        </span>
      </div>
      
      <div className="customer-body">
        <div className="customer-info">
          <span className="customer-label">Email:</span>
          <span className="customer-value">{customer.email}</span>
        </div>
        
        <div className="customer-info">
          <span className="customer-label">Phone:</span>
          <span className="customer-value">{customer.phone}</span>
        </div>
        
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
        
        {customer.address && (
          <div className="customer-info">
            <span className="customer-label">Address:</span>
            <span className="customer-value">{customer.address}</span>
          </div>
        )}
        
        {customer.notes && (
          <div className="customer-info">
            <span className="customer-label">Notes:</span>
            <span className="customer-value">{customer.notes}</span>
          </div>
        )}
        
        <div className="customer-info">
          <span className="customer-label">Created:</span>
          <span className="customer-value">
            {new Date(customer.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      {showActions && (
        <div className="customer-actions">
          <Link 
            href={`/user/${customer._id}`} 
            className="btn btn-primary"
            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            View Details
          </Link>
          
          {onEdit && (
            <button 
              onClick={() => onEdit(customer)}
              className="btn btn-warning"
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              Edit
            </button>
          )}
          
          {onDelete && (
            <button 
              onClick={() => onDelete(customer._id)}
              className="btn btn-danger"
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
} 