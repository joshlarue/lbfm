import { Inter } from "next/font/google";
import "./globals.css";
import Header from './components/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "lbfm",
  description: "a music rating and sharing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins" rel="stylesheet" /></head>
      <body className={inter.className}>
        <div className="flex flex-col items-start bg-base w-full min-h-screen">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
