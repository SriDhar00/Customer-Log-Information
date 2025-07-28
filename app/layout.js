import './globals.css';

export const metadata = {
  title: 'Customer Info Logger',
  description: 'A comprehensive customer information management system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
