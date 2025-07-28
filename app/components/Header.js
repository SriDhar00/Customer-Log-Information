'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header({ userType, userName }) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any stored tokens/cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'userType=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/');
  };

  const getNavItems = () => {
    if (userType === 'admin') {
      return [
        { href: '/admin/dashboard', label: 'Dashboard' },
        { href: '/admin/create', label: 'Create Customer' },
        { href: '/admin/profile', label: 'Profile' },
      ];
    } else if (userType === 'user') {
      return [
        { href: '/user/listoflogger', label: 'Customer List' },
        { href: '/user/terms&Conditions', label: 'Terms & Conditions' },
        { href: '/user/userProfile', label: 'Profile' },
      ];
    }
    return [];
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            Customer Info Logger
          </Link>
        </div>
        <nav>
          <ul className="nav-menu">
            {getNavItems().map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            {userName && (
              <li>
                <span>Welcome, {userName}</span>
              </li>
            )}
            <li>
              <button 
                onClick={handleLogout}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'white', 
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 