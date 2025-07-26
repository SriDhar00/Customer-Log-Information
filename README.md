# Customer Info Logger

A comprehensive customer information management system built with Next.js 15 and MongoDB Atlas. This application provides separate interfaces for administrators and regular users to manage customer data efficiently.

## Features

### Admin Features
- **Dashboard**: View customer analytics and statistics
- **Create Customers**: Add new customer records with comprehensive information
- **Edit Customers**: Modify existing customer data
- **Delete Customers**: Remove customer records
- **Profile Management**: Admin account settings

### User Features
- **Customer List**: View all customers with search and filter capabilities
- **Customer Details**: View detailed information for individual customers
- **Terms & Conditions**: Access application terms
- **User Profile**: Manage user account information

## Technology Stack

- **Frontend**: Next.js 15 (App Router)
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Authentication**: JWT with bcryptjs
- **Styling**: Custom CSS (No Tailwind)
- **File Format**: JavaScript (.js) only

## Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finacustomer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   MONGODB_DB=customer-logger
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Database Setup**
   - Create a MongoDB Atlas cluster
   - Get your connection string
   - Update the `MONGODB_URI` in your `.env.local` file

5. **Initialize Database**
   ```bash
   npm run dev
   ```
   Then visit: `http://localhost:3000/api/init` in your browser or use a tool like Postman to make a POST request to initialize the database with sample data.

## Default Accounts

After initialization, the following accounts will be created:

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123

### User Account
- **Email**: user@example.com
- **Password**: user123

## Project Structure

```
finacustomer/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── customers/         # Customer CRUD operations
│   │   └── init/              # Database initialization
│   ├── admin/                 # Admin pages
│   │   ├── login/            # Admin login
│   │   ├── dashboard/        # Admin dashboard
│   │   ├── create/           # Create customer
│   │   └── profile/          # Admin profile
│   ├── user/                 # User pages
│   │   ├── userLogin/        # User login
│   │   ├── listoflogger/     # Customer list
│   │   ├── [id]/             # Individual customer view
│   │   ├── terms&Conditions/ # Terms & conditions
│   │   └── userProfile/      # User profile
│   ├── components/           # Reusable components
│   │   ├── Header.js         # Navigation header
│   │   ├── CustomerForm.js   # Customer form component
│   │   └── CustomerCard.js   # Customer display card
│   ├── lib/                  # Utility functions
│   │   ├── database.js       # MongoDB connection
│   │   └── init-db.js        # Database initialization
│   ├── globals.css           # Global styles
│   ├── layout.js             # Root layout
│   └── page.js               # Home page
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## Usage

### Starting the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Admin Workflow

1. **Login**: Visit `/admin/login` and use admin credentials
2. **Dashboard**: View customer statistics and manage customers
3. **Create**: Add new customers with the create form
4. **Edit**: Modify existing customer information
5. **Delete**: Remove customer records (with confirmation)

### User Workflow

1. **Login**: Visit `/user/userLogin` and use user credentials
2. **Customer List**: Browse and search customers
3. **Customer Details**: View detailed customer information
4. **Terms**: Access application terms and conditions
5. **Profile**: View user account information

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create new customer
- `GET /api/customers/[id]` - Get specific customer
- `PUT /api/customers/[id]` - Update customer
- `DELETE /api/customers/[id]` - Delete customer

### Database
- `POST /api/init` - Initialize database with sample data

## Features

### Security
- JWT-based authentication
- Password hashing with bcryptjs
- HTTP-only cookies for token storage
- Input validation and sanitization

### Performance
- Optimized database queries
- Efficient component rendering
- Responsive design for all devices
- Fast page loading with Next.js

### User Experience
- Clean and modern UI design
- Intuitive navigation
- Search and filter functionality
- Responsive layout for mobile devices
- Loading states and error handling

## Customization

### Styling
The application uses custom CSS classes defined in `app/globals.css`. You can modify the styles to match your brand colors and design preferences.

### Database Schema
Customer documents include:
- `name` (required)
- `email` (required, unique)
- `phone` (required)
- `company` (optional)
- `position` (optional)
- `address` (optional)
- `status` (active/inactive/pending)
- `notes` (optional)
- `createdAt` (auto-generated)
- `updatedAt` (auto-generated)

### Adding New Features
1. Create new API routes in `app/api/`
2. Add new pages in `app/admin/` or `app/user/`
3. Create reusable components in `app/components/`
4. Update navigation in `app/components/Header.js`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify your MongoDB Atlas connection string
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure the database name is correct

2. **Authentication Issues**
   - Clear browser cookies
   - Verify JWT_SECRET is set in environment variables
   - Check if user accounts exist in database

3. **Build Errors**
   - Ensure all dependencies are installed
   - Check for syntax errors in JavaScript files
   - Verify environment variables are set

## Support

For support and questions:
- Email: support@customerlogger.com
- Documentation: Check this README file
- Issues: Create an issue in the repository

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Note**: This is a beginner-friendly application designed to demonstrate Next.js concepts and MongoDB integration. For production use, consider adding additional security measures, error handling, and testing.
"# Customer-Log-Information" 
