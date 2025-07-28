const fs = require('fs');
const path = require('path');

console.log('🚀 Customer Info Logger Setup');
console.log('==============================\n');

// Check if .env.local already exists
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists. Skipping environment setup.');
} else {
  console.log('📝 Creating .env.local file...');
  
  const envContent = `# MongoDB Atlas Connection String
# Replace with your actual MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/customer-logger?retryWrites=true&w=majority

# Database Name (optional, defaults to 'customer-logger')
MONGODB_DB=customer-logger

# JWT Secret Key
# Generate a strong secret key for production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=development
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!');
}

console.log('\n📋 Next Steps:');
console.log('1. Update the MONGODB_URI in .env.local with your MongoDB Atlas connection string');
console.log('2. Change the JWT_SECRET to a strong secret key');
console.log('3. Run: npm run dev');
console.log('4. Visit: http://localhost:3000/api/init to initialize the database');
console.log('5. Login with:');
console.log('   - Admin: admin@example.com / admin123');
console.log('   - User: user@example.com / user123');
console.log('\n�� Happy coding!'); 