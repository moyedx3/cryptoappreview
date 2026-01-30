import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/articles - List all articles
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const published = searchParams.get('published');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = `
      SELECT a.*, c.name as category_name, c.slug as category_slug
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
    `;
    const conditions = [];
    const params = [];

    if (category) {
      conditions.push(`c.slug = $${params.length + 1}`);
      params.push(category);
    }

    if (featured === 'true') {
      conditions.push('a.is_featured = true');
    }

    if (published !== 'false') {
      conditions.push('a.is_published = true');
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ` ORDER BY a.is_featured DESC, a.published_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    return NextResponse.json({ articles: result.rows });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

// POST /api/articles - Create new article
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, subtitle, description, content, rating, category_id, image_url, is_featured, is_published } = body;

    const result = await pool.query(
      `INSERT INTO articles (title, subtitle, description, content, rating, category_id, image_url, is_featured, is_published, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CASE WHEN $9 THEN CURRENT_TIMESTAMP ELSE NULL END)
       RETURNING *`,
      [title, subtitle, description, content, rating, category_id, image_url, is_featured || false, is_published || false]
    );

    return NextResponse.json({ article: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
