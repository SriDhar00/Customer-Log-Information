import { NextResponse } from 'next/server';
import { initializeDatabase } from '../../lib/init-db';

export async function POST() {
  try {
    await initializeDatabase();
    
    return NextResponse.json({
      message: 'Database initialized successfully',
      accounts: {
        admin: 'admin@example.com / admin123',
        user: 'user@example.com / user123'
      }
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database' },
      { status: 500 }
    );
  }
} 