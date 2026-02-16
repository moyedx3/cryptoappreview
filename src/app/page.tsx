'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  rating: number;
  category_name: string;
  category_slug: string;
  image_url: string;
  published_at: string;
}

interface LovedApp {
  id: number;
  name: string;
  category: string;
  rating: number;
}

const customStyles = {
  heading: {
    fontFamily: "'Anton', sans-serif",
    letterSpacing: '0.05em',
  },
};

const ReviewCard = ({
  id,
  rating,
  category,
  title,
  subtitle,
  description,
  date,
  image_url,
}: {
  id: number;
  rating: number;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  image_url?: string;
}) => (
  <Link href={`/articles/${id}`} className="bg-white border-4 border-black flex flex-col brutalist-shadow-hover transition-all duration-200 hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[12px_12px_0px_0px_#000]">
    <div className="aspect-square bg-gray-300 border-b-4 border-black relative overflow-hidden">
      {image_url ? (
        <img src={image_url} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
          <svg className="w-16 h-16 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2-.9-2-2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
        </div>
      )}
      <div className="absolute top-2 right-2 bg-[#D1FAE5] border-2 border-black rounded-full w-12 h-12 flex items-center justify-center font-display text-xl shadow-[2px_2px_0px_0px_#000]">
        {rating}
      </div>
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <span className="text-xs font-bold uppercase text-gray-500 mb-1">{category}</span>
      <h3 className="font-display text-2xl uppercase leading-none mb-1" style={customStyles.heading}>
        {title}
      </h3>
      <h4 className="font-bold text-lg leading-tight mb-3">{subtitle}</h4>
      <p className="text-sm font-medium mb-4 line-clamp-3">{description}</p>
      <div className="mt-auto pt-4 border-t-2 border-gray-100">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{date}</span>
      </div>
    </div>
  </Link>
);

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles?limit=6')
      .then(r => r.json())
      .then(data => {
        setArticles(data.articles || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="font-display text-2xl text-center py-20">Loading...</div>;
  }

  return (
    <main className="w-full flex-grow p-4 md:p-8">
      <div className="max-w-[1440px] mx-auto">
        <h1 className="font-display text-4xl uppercase mb-8" style={customStyles.heading}>Latest Reviews</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((review) => (
            <ReviewCard
              key={review.id}
              id={review.id}
              rating={review.rating}
              category={review.category_name}
              title={review.title}
              subtitle={review.subtitle}
              description={review.description}
              date={new Date(review.published_at).toLocaleDateString()}
              image_url={review.image_url}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
