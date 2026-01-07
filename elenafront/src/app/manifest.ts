import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Elena Benítez - Admin Panel',
    short_name: 'Elena Admin',
    description: 'Panel de administración para Elena Benítez Peluquería',
    start_url: '/admin',
    display: 'standalone',
    background_color: '#f6f6f7',
    theme_color: '#008060',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/logoheader.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logoheader.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logoheader.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logoheader.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logoheader.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logoheader.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logoheader.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logoheader.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['business', 'productivity'],
    screenshots: [],
    shortcuts: [
      {
        name: 'Servicios',
        short_name: 'Servicios',
        description: 'Gestionar servicios',
        url: '/admin/servicios',
        icons: [{ src: '/logoheader.png', sizes: '192x192' }],
      },
      {
        name: 'Categorías',
        short_name: 'Categorías',
        description: 'Gestionar categorías',
        url: '/admin/categorias',
        icons: [{ src: '/logoheader.png', sizes: '192x192' }],
      },
      {
        name: 'Configuración',
        short_name: 'Config',
        description: 'Configuración del sitio',
        url: '/admin/configuracion',
        icons: [{ src: '/logoheader.png', sizes: '192x192' }],
      },
    ],
  }
}

