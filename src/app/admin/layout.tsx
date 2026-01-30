export const metadata = {
  title: 'Admin - Crypto App Review',
  description: 'Content management dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-black text-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-display text-2xl uppercase tracking-wider">Admin Panel</span>
            </div>
            <div className="flex space-x-4">
              <a href="/admin" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">Dashboard</a>
              <a href="/admin/articles" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">Articles</a>
              <a href="/admin/articles/new" className="px-3 py-2 bg-[#D1FAE5] text-black rounded-md text-sm font-medium hover:bg-white">+ New Article</a>
              <a href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">View Site</a>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
