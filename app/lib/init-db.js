import bcrypt from 'bcryptjs';
import { getCollection } from './database';

export async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    // Initialize admins collection
    const adminsCollection = await getCollection('admins');
    
    // Check if admin already exists
    const existingAdmin = await adminsCollection.findOne({ email: 'admin@example.com' });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await adminsCollection.insertOne({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log('Admin account created: admin@example.com / admin123');
    } else {
      console.log('Admin account already exists');
    }

    // Initialize users collection
    const usersCollection = await getCollection('users');
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: 'user@example.com' });
    
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('user123', 10);
      
      await usersCollection.insertOne({
        name: 'Regular User',
        email: 'user@example.com',
        password: hashedPassword,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      console.log('User account created: user@example.com / user123');
    } else {
      console.log('User account already exists');
    }

    // Initialize customers collection with sample data
    const customersCollection = await getCollection('customers');
    
    // Check if sample customers already exist
    const existingCustomers = await customersCollection.countDocuments();
    
    if (existingCustomers === 0) {
      const sampleCustomers = [
        {
          name: 'John Smith',
          email: 'john.smith@company.com',
          phone: '+1 (555) 123-4567',
          company: 'Tech Solutions Inc.',
          position: 'CEO',
          address: '123 Business St, New York, NY 10001',
          status: 'active',
          notes: 'Key decision maker for enterprise solutions',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@startup.com',
          phone: '+1 (555) 234-5678',
          company: 'Innovation Labs',
          position: 'CTO',
          address: '456 Innovation Ave, San Francisco, CA 94102',
          status: 'active',
          notes: 'Interested in AI and machine learning solutions',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Michael Brown',
          email: 'michael.brown@corp.com',
          phone: '+1 (555) 345-6789',
          company: 'Global Enterprises',
          position: 'IT Director',
          address: '789 Corporate Blvd, Chicago, IL 60601',
          status: 'pending',
          notes: 'Evaluating new software solutions',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Emily Davis',
          email: 'emily.davis@consulting.com',
          phone: '+1 (555) 456-7890',
          company: 'Strategic Consulting Group',
          position: 'Senior Consultant',
          address: '321 Consulting Way, Boston, MA 02101',
          status: 'inactive',
          notes: 'Previous client, may re-engage in Q2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'David Wilson',
          email: 'david.wilson@retail.com',
          phone: '+1 (555) 567-8901',
          company: 'Retail Solutions LLC',
          position: 'Operations Manager',
          address: '654 Retail Rd, Miami, FL 33101',
          status: 'active',
          notes: 'Looking for inventory management solutions',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      await customersCollection.insertMany(sampleCustomers);
      console.log('Sample customers created');
    } else {
      console.log('Sample customers already exist');
    }

    console.log('Database initialization completed successfully!');
    
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
} 