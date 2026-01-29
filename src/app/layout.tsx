import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crypto App Review",
  description: "The internet's laziest crypto nerd. Reviews, scouts and analysis from the world of crypto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col text-black bg-[#D1FAE5]">
        {children}
      </body>
    </html>
  );
}
