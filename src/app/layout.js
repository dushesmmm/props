import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import HeaderTransparent from "./UI/HeaderTransparent/HeaderTransparent";
import Footer from "./UI/Footer/Footer";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

const playfair = Playfair_Display({
  subsets: ['cyrillic', 'latin'],
  weight: '400',
  variable: '--font-playfair',
  display: 'swap'
});

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <HeaderTransparent/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
