
import type {Metadata} from 'next';
import { Belleza, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const belleza = Belleza({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-belleza',
  display: 'swap',
});

const GTM_ID = 'GTM-K6TRCZN5';

export const metadata: Metadata = {
  title: 'INSD | Premier Design Courses in Delhi',
  description: 'Turn your creativity into a career with INSD Delhi\'s Graphic Design programs. Industry-oriented curriculum with 100% placement support.',
  icons: {
    icon: [
      {
        url: 'https://res.cloudinary.com/ddqqlfsjp/image/upload/v1778345780/INSD-Logo_Half-logo_wqbynu.jpg',
        type: 'image/jpeg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${belleza.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
        >
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body className="font-body antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <Toaster />
        <Script id="nopaperforms" strategy="afterInteractive">
          {`var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widgets.in4.nopaperforms.com/emwgts.js";
            document.body.appendChild(s);
          `}
        </Script>
      </body>
    </html>
  );
}
