import AdminLayoutClient from './layout-client';

export const metadata = {
  title: 'Admin - Crypto App Review',
  description: 'Content management dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
