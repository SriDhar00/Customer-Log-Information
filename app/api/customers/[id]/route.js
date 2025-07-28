import { NextResponse } from 'next/server';
import { getCollection } from '../../../lib/database';
import { ObjectId } from 'mongodb';

// GET single customer by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid customer ID' },
        { status: 400 }
      );
    }

    const collection = await getCollection('customers');
    const customer = await collection.findOne({ _id: new ObjectId(id) });

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);

  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer' },
      { status: 500 }
    );
  }
}

// PUT update customer
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updateData = await request.json();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid customer ID' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!updateData.name || !updateData.email || !updateData.phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    const collection = await getCollection('customers');
    
    // Check if email already exists for other customers
    const existingCustomer = await collection.findOne({
      email: updateData.email,
      _id: { $ne: new ObjectId(id) }
    });
    
    if (existingCustomer) {
      return NextResponse.json(
        { error: 'Customer with this email already exists' },
        { status: 400 }
      );
    }

    const updatedCustomer = {
      ...updateData,
      updatedAt: new Date()
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedCustomer }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Customer updated successfully',
      customer: updatedCustomer
    });

  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json(
      { error: 'Failed to update customer' },
      { status: 500 }
    );
  }
}

// DELETE customer
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid customer ID' },
        { status: 400 }
      );
    }

    const collection = await getCollection('customers');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Customer deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting customer:', error);
    return NextResponse.json(
      { error: 'Failed to delete customer' },
      { status: 500 }
    );
  }
} 