import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/categories - List all categories
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    return NextResponse.json({ categories: result.rows });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// POST /api/categories - Create new category
export async function POST(request: Request) {
  try {
    const { name, slug } = await request.json();
    
    const result = await pool.query(
      'INSERT INTO categories (name, slug) VALUES ($1, $2) RETURNING *',
      [name, slug]
    );

    return NextResponse.json({ category: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
