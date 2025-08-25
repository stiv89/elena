import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizaciones para SEO y rendimiento
  experimental: {
    optimizeCss: true,
  },
  
  // Compresión y optimizaciones
  compress: true,
  
  // Configuración de imágenes optimizada
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'elenabenitez.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Headers para SEO y seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          }
        ]
      },
      // Cache para recursos estáticos
      {
        source: '/public/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },
  
  // Redirects para SEO
  async redirects() {
    return [
      {
        source: '/inicio',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/salon',
        destination: '/',
        permanent: true,
      },
      {
        source: '/peluqueria',
        destination: '/',
        permanent: true,
      },
    ]
  },
  
  // Configuración de trailing slash
  trailingSlash: false,
  
  // Configuración de build para producción
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
