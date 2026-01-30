'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalArticles: number;
  publishedArticles: number;
  categories: number;
  subscribers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data.stats);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h1 className="font-display text-4xl uppercase mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white border-4 border-black p-6 brutalist-shadow">
          <div className="text-sm font-bold uppercase text-gray-500 mb-2">Total Articles</div>
          <div className="font-display text-5xl">{stats?.totalArticles || 0}</div>
        </div>
        <div className="bg-white border-4 border-black p-6 brutalist-shadow">
          <div className="text-sm font-bold uppercase text-gray-500 mb-2">Published</div>
          <div className="font-display text-5xl text-green-600">{stats?.publishedArticles || 0}</div>
        </div>
        <div className="bg-white border-4 border-black p-6 brutalist-shadow">
          <div className="text-sm font-bold uppercase text-gray-500 mb-2">Categories</div>
          <div className="font-display text-5xl">{stats?.categories || 0}</div>
        </div>
        <div className="bg-white border-4 border-black p-6 brutalist-shadow">
          <div className="text-sm font-bold uppercase text-gray-500 mb-2">Subscribers</div>
          <div className="font-display text-5xl">{stats?.subscribers || 0}</div>
        </div>
      </div>

      <div className="bg-white border-4 border-black p-6 brutalist-shadow">
        <h2 className="font-display text-2xl uppercase mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <a href="/admin/articles/new" className="bg-black text-white px-6 py-3 font-bold uppercase hover:bg-gray-800 transition-colors">
            Write New Article
          </a>
          <a href="/admin/articles" className="border-4 border-black px-6 py-3 font-bold uppercase hover:bg-gray-100 transition-colors">
            Manage Articles
          </a>
        </div>
      </div>
    </div>
  );
}
