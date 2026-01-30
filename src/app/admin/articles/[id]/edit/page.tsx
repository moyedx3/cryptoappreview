'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Article {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  rating: number;
  category_id: number;
  image_url: string;
  is_featured: boolean;
  is_published: boolean;
}

export default function EditArticle() {
  const router = useRouter();
  const params = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Article>>({});

  useEffect(() => {
    Promise.all([
      fetch('/api/categories').then(res => res.json()),
      fetch(`/api/articles/${params.id}`).then(res => res.json())
    ]).then(([catsData, articleData]) => {
      setCategories(catsData.categories);
      setFormData(articleData.article);
      setLoading(false);
    });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/articles/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        router.push('/admin/articles');
      } else {
        alert('Failed to update article');
      }
    } catch (err) {
      console.error('Error updating article:', err);
      alert('Failed to update article');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h1 className="font-display text-4xl uppercase mb-8">Edit Article</h1>

      <form onSubmit={handleSubmit} className="bg-white border-4 border-black p-8 brutalist-shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="md:col-span-2">
            <label className="block font-bold uppercase text-sm mb-2">Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full border-4 border-black px-4 py-3 font-bold"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold uppercase text-sm mb-2">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle || ''}
              onChange={e => setFormData({...formData, subtitle: e.target.value})}
              className="w-full border-4 border-black px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-sm mb-2">Category</label>
            <select
              value={formData.category_id || ''}
              onChange={e => setFormData({...formData, category_id: parseInt(e.target.value)})}
              className="w-full border-4 border-black px-4 py-3"
              required
            >
              <option value="">Select category...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold uppercase text-sm mb-2">Rating (1-10)</label>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.rating || 8}
              onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}
              className="w-full border-4 border-black px-4 py-3"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold uppercase text-sm mb-2">Short Description</label>
            <textarea
              value={formData.description || ''}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full border-4 border-black px-4 py-3 h-24"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold uppercase text-sm mb-2">Full Content</label>
            <textarea
              value={formData.content || ''}
              onChange={e => setFormData({...formData, content: e.target.value})}
              className="w-full border-4 border-black px-4 py-3 h-64 font-mono text-sm"
              placeholder="Full review content..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold uppercase text-sm mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image_url || ''}
              onChange={e => setFormData({...formData, image_url: e.target.value})}
              className="w-full border-4 border-black px-4 py-3"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_featured || false}
                onChange={e => setFormData({...formData, is_featured: e.target.checked})}
                className="w-5 h-5 border-4 border-black"
              />
              <span className="font-bold uppercase">Featured</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_published || false}
                onChange={e => setFormData({...formData, is_published: e.target.checked})}
                className="w-5 h-5 border-4 border-black"
              />
              <span className="font-bold uppercase">Published</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-black text-white px-8 py-3 font-bold uppercase hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Update Article'}
          </button>
          <a href="/admin/articles" className="border-4 border-black px-8 py-3 font-bold uppercase hover:bg-gray-100 transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
