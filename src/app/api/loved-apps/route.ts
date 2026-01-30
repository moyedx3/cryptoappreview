import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/loved-apps - List all loved apps
export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM loved_apps WHERE is_active = true ORDER BY display_order, rating DESC'
    );
    return NextResponse.json({ apps: result.rows });
  } catch (error) {
    console.error('Error fetching loved apps:', error);
    return NextResponse.json({ error: 'Failed to fetch loved apps' }, { status: 500 });
  }
}

// POST /api/loved-apps - Create new loved app
export async function POST(request: Request) {
  try {
    const { name, category, rating, description, image_url, display_order } = await request.json();
    
    const result = await pool.query(
      `INSERT INTO loved_apps (name, category, rating, description, image_url, display_order)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, category, rating, description, image_url, display_order || 0]
    );

    return NextResponse.json({ app: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating loved app:', error);
    return NextResponse.json({ error: 'Failed to create loved app' }, { status: 500 });
  }
}
