import { k2DFont } from '@/fonts';
import './styles/globals.css';
import { Providers } from './Providers';

export const metadata = {
  title: "EcoMarket | Home",
  metadataBase: new URL("https://ecomarket.xyz"),
  description: "Open Marketplace for Recycled Materials",
  keyword: [
      "Recycle",
      "Ecomarket",
  ],
  openGraph: {
      title: "Open Marketplace for Recycled Materials",
      description:
          "Open Marketplace for Recycled Materials",

      url: "https://ecomarket.xyz",
      siteName: "EcoMarket",
      images: [
          {
              url: "https://www.ecomarket.xyz/images/ecomarket-logo.png",
              width: 800,
              height: 600,
          },
          {
              url: "https://www.ecomarket.xyz/images/ecomarket-logo.png",
              width: 1800,
              height: 1600,
              alt: "EcoMarket Dashboard",
          },
      ],
      locale: "en_US",
      type: "website",
  },
  icons: {
      icon: [
          { url: "/images/favicon/favicon-16x16.png", size: "16x16" },
          { url: "/images/favicon/favicon-32x32.png", size: "32x32" },
      ],
      shortcut: "/images/favicon/favicon-32x32.png",
      apple: "/images/favicon/apple-touch-icon.png",
      andriod: [
          {
              url: "/images/favicon/android-chrome-192x192.png",
              size: "192x192",
          },
          {
              url: "/images/favicon/android-chrome-512x512.png",
              size: "512x512",
          },
      ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${k2DFont.variable} ${k2DFont.className} `}
        suppressHydrationWarning={true}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
