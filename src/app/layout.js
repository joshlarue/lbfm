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
      <body className={inter.className}>
        <div className="flex bg-base w-full min-h-screen">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
