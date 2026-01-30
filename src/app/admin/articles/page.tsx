'use client';

import { useEffect, useState } from 'react';

interface Article {
  id: number;
  title: string;
  subtitle: string;
  rating: number;
  category_name: string;
  is_published: boolean;
  is_featured: boolean;
  published_at: string;
  created_at: string;
}

export default function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles?published=false&limit=100')
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(articles.filter(a => a.id !== id));
      }
    } catch (err) {
      console.error('Error deleting article:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-4xl uppercase">Articles</h1>
        <a href="/admin/articles/new" className="bg-black text-white px-6 py-3 font-bold uppercase hover:bg-gray-800 transition-colors">
          + New Article
        </a>
      </div>

      <div className="bg-white border-4 border-black brutalist-shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-4 text-left font-bold uppercase text-sm">Title</th>
              <th className="px-6 py-4 text-left font-bold uppercase text-sm">Category</th>
              <th className="px-6 py-4 text-center font-bold uppercase text-sm">Rating</th>
              <th className="px-6 py-4 text-center font-bold uppercase text-sm">Status</th>
              <th className="px-6 py-4 text-right font-bold uppercase text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b-2 border-gray-200 last:border-b-0">
                <td className="px-6 py-4">
                  <div className="font-bold">{article.title}</div>
                  <div className="text-sm text-gray-500">{article.subtitle}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-gray-200 px-2 py-1 text-xs font-bold uppercase">
                    {article.category_name}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="font-display text-xl">{article.rating}/10</span>
                </td>
                <td className="px-6 py-4 text-center">
                  {article.is_published ? (
                    <span className="bg-green-200 text-green-800 px-2 py-1 text-xs font-bold uppercase">Published</span>
                  ) : (
                    <span className="bg-yellow-200 text-yellow-800 px-2 py-1 text-xs font-bold uppercase">Draft</span>
                  )}
                  {article.is_featured && (
                    <span className="ml-2 bg-[#D1FAE5] text-black px-2 py-1 text-xs font-bold uppercase">Featured</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <a href={`/admin/articles/${article.id}/edit`} className="text-blue-600 hover:underline font-bold mr-4">
                    Edit
                  </a>
                  <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:underline font-bold">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {articles.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No articles yet. <a href="/admin/articles/new" className="underline">Create your first article</a>.
          </div>
        )}
      </div>
    </div>
  );
}
