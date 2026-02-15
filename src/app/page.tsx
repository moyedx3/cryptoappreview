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
}: {
  id: number;
  rating: number;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
}) => (
  <Link href={`/articles/${id}`} className="bg-white border-4 border-black flex flex-col brutalist-shadow-hover transition-all duration-200 hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[12px_12px_0px_0px_#000]">
    <div className="aspect-square bg-gray-300 border-b-4 border-black relative">
      <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
        <svg className="w-16 h-16 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      </div>
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

const LovedAppItem = ({
  rating,
  name,
  category,
}: {
  rating: number;
  name: string;
  category: string;
}) => (
  <li className="flex items-start gap-3 group cursor-pointer">
    <div className="w-12 h-12 bg-gray-300 border-2 border-black flex-shrink-0 relative">
      <div className="absolute -top-1 -right-1 bg-[#D1FAE5] text-[10px] font-bold border border-black w-5 h-5 flex items-center justify-center">
        {rating}
      </div>
    </div>
    <div>
      <h4 className="font-bold text-sm uppercase leading-tight group-hover:underline">{name}</h4>
      <p className="text-xs text-gray-500 uppercase">{category}</p>
    </div>
  </li>
);

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b-4 border-black sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <img src="/images/logo.svg" alt="Crypto App Review Logo" className="w-10 h-10" />
            <span className="font-display text-3xl uppercase tracking-wider hidden sm:block" style={customStyles.heading}>
              CRYPTO APP REVIEW
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="font-bold hover:underline hover:bg-[#D1FAE5] px-2 py-1 transition-colors text-sm uppercase tracking-widest">Review</Link>
            <a href="#" className="font-bold hover:underline hover:bg-[#D1FAE5] px-2 py-1 transition-colors text-sm uppercase tracking-widest">On the Radar</a>
            <a href="#" className="font-bold hover:underline hover:bg-[#D1FAE5] px-2 py-1 transition-colors text-sm uppercase tracking-widest">Guides</a>
            <a href="#" className="font-bold hover:underline hover:bg-[#D1FAE5] px-2 py-1 transition-colors text-sm uppercase tracking-widest">Contributor</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-black hover:text-gray-700 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a href="#" className="text-black hover:text-gray-700 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 border-2 border-black bg-[#D1FAE5]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-black text-[#D1FAE5] mt-12 py-12 border-t-4 border-black">
    <div className="max-w-[1440px] mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <span className="font-display text-4xl uppercase tracking-wider mb-4 block" style={customStyles.heading}>Crypto App Review</span>
          <p className="text-white text-sm max-w-xs">The internet&apos;s laziest crypto nerd. Reviews, scouts and analysis from the world of crypto.</p>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase mb-4 text-lg">Sections</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">App Reviews</a></li>
            <li><a href="#" className="hover:underline">Top Lists</a></li>
            <li><a href="#" className="hover:underline">Tutorials</a></li>
            <li><a href="#" className="hover:underline">Interviews</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase mb-4 text-lg">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Use</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase font-bold">
        <p>© 2025 Crypto App Review. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">Discord</a>
          <a href="#" className="hover:text-white">YouTube</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [lovedApps, setLovedApps] = useState<LovedApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/articles?limit=6').then(r => r.json()),
      fetch('/api/articles?featured=true&limit=1').then(r => r.json()),
      fetch('/api/loved-apps').then(r => r.json())
    ]).then(([articlesData, featuredData, lovedData]) => {
      setArticles(articlesData.articles || []);
      setFeaturedArticle(featuredData.articles?.[0] || null);
      setLovedApps(lovedData.apps || []);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching data:', err);
      setLoading(false);
    });
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thanks for subscribing!');
    setEmail('');
  };

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

  return (
    <>
      <Header />
      <main className="w-full flex-grow p-4 md:p-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-12">
            {/* Featured Review */}
            {featuredArticle && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-4 w-4 bg-black"></div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter" style={customStyles.heading}>Featured Review</h2>
                </div>

                <Link href={`/articles/${featuredArticle.id}`} className="block bg-white border-4 border-black brutalist-shadow group cursor-pointer hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="aspect-square w-full h-full bg-gray-200 border-b-4 md:border-b-0 md:border-r-4 border-black relative flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                        <svg className="w-32 h-32 text-[#D1FAE5]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H11v-4h2v4zm0-6H11V8h2v2z" />
                        </svg>
                      </div>
                      <div className="absolute top-4 left-4 bg-[#D1FAE5] border-2 border-black px-3 py-1 font-bold text-sm uppercase shadow-[4px_4px_0px_0px_#000]">
                        App of the Week
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col justify-between h-full bg-white">
                      <div>
                        <div className="mb-2">
                          <span className="inline-block bg-black text-white text-xs font-bold px-2 py-1 uppercase tracking-widest mb-2">
                            {featuredArticle.category_name}
                          </span>
                          <h1 className="font-display text-4xl md:text-5xl uppercase leading-none mb-2" style={customStyles.heading}>
                            {featuredArticle.title}
                          </h1>
                          <h2 className="font-display text-2xl md:text-3xl uppercase text-gray-500 leading-none mb-4" style={customStyles.heading}>
                            {featuredArticle.subtitle}
                          </h2>
                        </div>
                        <p className="font-sans text-lg leading-relaxed font-medium mb-6">
                          {featuredArticle.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold uppercase text-gray-400">Rating</span>
                          <span className="font-display text-4xl text-black bg-[#D1FAE5] px-2 py-1 inline-block -skew-x-6 border-2 border-black shadow-[4px_4px_0px_0px_#888]" style={customStyles.heading}>
                            {featuredArticle.rating}/10
                          </span>
                        </div>
                        <span className="bg-[#D1FAE5] border-2 border-black px-6 py-3 font-bold uppercase tracking-widest group-hover:bg-black group-hover:text-[#D1FAE5] transition-colors brutalist-shadow-sm">
                          Read Review
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* Latest Reviews */}
            <section>
              <div className="flex items-center justify-between mb-6 border-b-4 border-black pb-2">
                <h2 className="text-3xl font-black uppercase tracking-tighter" style={customStyles.heading}>Latest Reviews</h2>
                <a href="#" className="font-bold underline hover:bg-white px-1">View All</a>
              </div>

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
                    date={new Date(review.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  />
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setShowMoreReviews(!showMoreReviews)}
                  className="bg-white border-4 border-black px-8 py-3 font-display text-xl uppercase tracking-wider hover:bg-black hover:text-white transition-colors brutalist-shadow"
                  style={customStyles.heading}
                >
                  Load More Apps
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-white border-4 border-black p-6 brutalist-shadow">
              <div className="flex items-center justify-between mb-6 border-b-4 border-black pb-2">
                <h3 className="font-display text-2xl uppercase" style={customStyles.heading}>On the Radar 2025</h3>
                <svg className="w-6 h-6" fill="black" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <ul className="space-y-4">
                {lovedApps.map((app) => (
                  <LovedAppItem key={app.id} rating={app.rating} name={app.name} category={app.category} />
                ))}
              </ul>
              <a href="#" className="block mt-6 text-center text-xs font-bold uppercase tracking-widest border-2 border-black py-2 hover:bg-black hover:text-white transition-colors">
                View Full Leaderboard
              </a>
            </div>

            <div className="bg-black text-[#D1FAE5] p-6 brutalist-shadow border-4 border-black">
              <h3 className="font-display text-3xl uppercase mb-2" style={customStyles.heading}>Subscribe</h3>
              <p className="font-medium mb-4 text-white text-sm">Get the latest crypto app reviews and DeFi alpha delivered to your inbox.</p>
              <form className="space-y-3" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white text-black font-bold px-4 py-3 border-4 border-white focus:outline-none focus:border-[#D1FAE5] uppercase placeholder:text-gray-400"
                />
                <button type="submit" className="w-full bg-[#D1FAE5] text-black font-display text-xl uppercase py-2 border-4 border-[#D1FAE5] hover:bg-white hover:border-white transition-colors" style={customStyles.heading}>
                  Join List
                </button>
              </form>
            </div>

            <div className="bg-[#D1FAE5] border-4 border-black p-6 brutalist-shadow">
              <h3 className="font-display text-2xl uppercase mb-4" style={customStyles.heading}>Support the Site</h3>
              <p className="font-bold text-sm mb-4">Help keep the reviews objective by supporting our independent research.</p>
              <button className="w-full flex items-center justify-center gap-2 bg-black text-white font-bold uppercase py-3 border-2 border-black hover:bg-white hover:text-black transition-colors">
                <span>Donate Crypto</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </button>
            </div>

            <div className="bg-white border-4 border-black p-6 brutalist-shadow">
              <h3 className="font-display text-2xl uppercase mb-4 border-b-4 border-black pb-2" style={customStyles.heading}>Categories</h3>
              <div className="flex flex-wrap gap-2">
                {['DeFi', 'Exchange', 'Wallet', 'Lending', 'Staking', 'NFT Market', 'Bridges', 'Tools'].map(cat => (
                  <a key={cat} href="#" className="px-2 py-1 border-2 border-black text-xs font-bold uppercase hover:bg-black hover:text-white transition-colors">{cat}</a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
