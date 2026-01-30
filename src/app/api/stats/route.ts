import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/stats - Get dashboard stats
export async function GET() {
  try {
    const articlesResult = await pool.query('SELECT COUNT(*) as total FROM articles');
    const publishedResult = await pool.query('SELECT COUNT(*) as total FROM articles WHERE is_published = true');
    const categoriesResult = await pool.query('SELECT COUNT(*) as total FROM categories');
    const subscribersResult = await pool.query('SELECT COUNT(*) as total FROM subscribers');

    return NextResponse.json({
      stats: {
        totalArticles: parseInt(articlesResult.rows[0].total),
        publishedArticles: parseInt(publishedResult.rows[0].total),
        categories: parseInt(categoriesResult.rows[0].total),
        subscribers: parseInt(subscribersResult.rows[0].total)
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
