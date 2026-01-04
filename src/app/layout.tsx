import type { Metadata, Viewport } from 'next'
import { Geist, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#050508' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://codyavila.com'),
  title: 'Cody Avila | Technical Product Manager — Seattle',
  description: 'Technical Product Manager with experience scaling to 141M+ users, specializing in Payments, Media, and Scalable Architecture. Full-stack PM bridging revenue strategy and engineering execution.',
  keywords: [
    'Technical Product Manager',
    'Product Manager Seattle',
    'Technical Product Leader',
    'Product Strategy',
    'Engineering Leadership',
    'SaaS Product Management',
    'Enterprise Software PM',
    'Payments Product Manager',
    'Media Platform PM',
    'AI-Ready Systems',
    'Revenue Optimization',
    'Cody Avila',
  ],
  authors: [{ name: 'Cody Avila' }],
  creator: 'Cody Avila',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://codyavila.com',
    siteName: 'Cody Avila Portfolio',
    title: 'Cody Avila | Technical Product Manager — Seattle',
    description: 'Technical PM scaling to 141M+ users. Specializing in Payments, Media, and Scalable Architecture. Revenue-focused product leadership.',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Cody Avila - Technical Product Manager specializing in Payments, Media & Scale',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cody Avila | Technical Product Manager — Seattle',
    description: 'Technical PM scaling to 141M+ users. Payments, Media, and Scalable Architecture expert.',
    images: ['/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token',
  },
}

// Script to prevent theme flash on initial load
const themeScript = `
  (function() {
    try {
      const theme = localStorage.getItem('portfolio-theme');
      const contrast = localStorage.getItem('portfolio-contrast');
      const colorblind = localStorage.getItem('portfolio-colorblind');
      const root = document.documentElement;
      
      // Apply theme
      if (theme === 'light') {
        root.classList.add('light');
      } else if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        // System preference
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
          root.classList.add('light');
        } else {
          root.classList.add('dark');
        }
      }
      
      // Apply contrast
      if (contrast === 'high' || (!contrast && window.matchMedia('(prefers-contrast: high)').matches)) {
        root.classList.add('high-contrast');
      }
      
      // Apply colorblind mode
      if (colorblind && colorblind !== 'none') {
        root.classList.add('colorblind-' + colorblind);
      }
    } catch (e) {}
  })();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // JSON-LD Structured Data for 2026 SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Cody Avila',
    jobTitle: 'Technical Product Manager',
    description: 'Technical Product Manager with experience scaling to 141M+ users, specializing in Payments, Media, and Scalable Architecture. Full-stack PM bridging revenue strategy and engineering execution.',
    url: 'https://codyavila.com',
    sameAs: [
      'https://linkedin.com/in/codyavila',
      'https://github.com/codyavila',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seattle',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
    knowsAbout: [
      'Product Management',
      'Product Strategy',
      'Payments Systems',
      'Media Platforms',
      'Revenue Optimization',
      'AI-Ready Architecture',
      'Agile/Scrum',
      'System Architecture',
      'API Design',
      'React',
      'Node.js',
      'User Research',
      'Data Analytics',
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Software Engineering Immersive',
      credentialCategory: 'Certificate',
      educationalLevel: 'Professional',
      recognizedBy: {
        '@type': 'Organization',
        name: 'General Assembly',
      },
    },
    worksFor: {
      '@type': 'Organization',
      name: 'BLOX Digital',
      description: 'Platform serving 2,000+ media organizations with 141M monthly users and 6.8B annual pageviews',
    },
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent theme flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        
        {/* Preconnect to font providers */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {/* Skip to content link for accessibility */}
          <a href="#top" className="skip-link">
            Skip to main content
          </a>
          
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
