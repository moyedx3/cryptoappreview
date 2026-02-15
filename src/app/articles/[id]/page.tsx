'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Article {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  rating: number;
  category_name: string;
  category_slug: string;
  image_url: string;
  published_at: string;
}

const customStyles = {
  heading: {
    fontFamily: "'Anton', sans-serif",
    letterSpacing: '0.05em',
  },
};

const Header = () => (
  <nav className="w-full bg-white border-b-4 border-black sticky top-0 z-50">
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <Link href="/" className="flex-shrink-0 flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="font-display text-3xl uppercase tracking-wider" style={customStyles.heading}>
            CRYPTO APP REVIEW
          </span>
        </Link>
        <Link href="/" className="font-bold hover:underline hover:bg-[#D1FAE5] px-4 py-2 transition-colors border-2 border-black">
          ← Back to Reviews
        </Link>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-black text-[#D1FAE5] mt-12 py-12 border-t-4 border-black">
    <div className="max-w-[1440px] mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase font-bold">
        <p>© 2025 Crypto App Review. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">Discord</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/articles/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setArticle(data.article);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching article:', err);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="font-display text-2xl">Loading...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl uppercase mb-4">Article Not Found</h1>
            <Link href="/" className="text-blue-600 hover:underline font-bold">
              ← Back to homepage
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="w-full flex-grow p-4 md:p-8 bg-[#D1FAE5]">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="bg-white border-4 border-black brutalist-shadow mb-8">
            <div className="aspect-video w-full bg-gray-200 border-b-4 border-black relative flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                <svg className="w-32 h-32 text-[#D1FAE5]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H11v-4h2v4zm0-6H11V8h2v2z" />
                </svg>
              </div>
              <div className="absolute top-4 right-4 bg-[#D1FAE5] border-4 border-black px-4 py-2 font-display text-3xl shadow-[4px_4px_0px_0px_#000]" style={customStyles.heading}>
                {article.rating}/10
              </div>
            </div>
            
            <div className="p-6 md:p-10">
              <span className="inline-block bg-black text-white text-xs font-bold px-3 py-1 uppercase tracking-widest mb-4">
                {article.category_name}
              </span>
              <h1 className="font-display text-5xl md:text-6xl uppercase leading-none mb-2" style={customStyles.heading}>
                {article.title}
              </h1>
              <h2 className="font-display text-2xl md:text-3xl uppercase text-gray-500 leading-none mb-6" style={customStyles.heading}>
                {article.subtitle}
              </h2>
              <p className="text-sm font-bold uppercase text-gray-400">
                Published {new Date(article.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white border-4 border-black brutalist-shadow p-6 md:p-10">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl font-medium leading-relaxed mb-8 text-gray-700 italic border-l-4 border-black pl-6">
                {article.description}
              </p>
              <div className="whitespace-pre-wrap font-medium leading-relaxed">
                {article.content || 'Full review content coming soon...'}
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link href="/" className="inline-block bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors brutalist-shadow">
              ← Back to All Reviews
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
