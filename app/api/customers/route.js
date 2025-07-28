import { NextResponse } from 'next/server';
import { getCollection } from '../../lib/database';

// GET all customers
export async function GET() {
  try {
    const collection = await getCollection('customers');
    const customers = await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

// POST create new customer
export async function POST(request) {
  try {
    const customerData = await request.json();
    
    // Validate required fields
    if (!customerData.name || !customerData.email || !customerData.phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    const collection = await getCollection('customers');
    
    // Check if email already exists
    const existingCustomer = await collection.findOne({ email: customerData.email });
    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Customer with this email already exists' },
        { status: 400 }
      );
    }

    // Add creation timestamp
    const newCustomer = {
      ...customerData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(newCustomer);
    
    return NextResponse.json({
      message: 'Customer created successfully',
      customer: { ...newCustomer, _id: result.insertedId }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
} 