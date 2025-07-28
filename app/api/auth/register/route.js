import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getCollection } from '../../../lib/database';

export async function POST(request) {
  try {
    const { name, email, password, userType } = await request.json();

    // Validate required fields
    if (!name || !email || !password || !userType) {
      return NextResponse.json(
        { error: 'Name, email, password, and user type are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const collection = await getCollection(userType === 'admin' ? 'admins' : 'users');
    
    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: userType,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newUser);

    return NextResponse.json({
      message: 'User registered successfully',
      user: {
        id: result.insertedId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 