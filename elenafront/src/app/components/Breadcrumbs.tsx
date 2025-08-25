"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: '🏠 Inicio', href: '/' }
    ];

    if (pathSegments.length === 0) {
      breadcrumbs[0].current = true;
      return breadcrumbs;
    }

    const segmentMap: { [key: string]: string } = {
      'servicios': '🎯 Servicios',
      'contacto': '📍 Contacto',
      'carrito': '🛒 Carrito',
      'galeria': '🖼️ Galería',
      'nosotros': '👥 Nosotros'
    };

    pathSegments.forEach((segment, index) => {
      const isLast = index === pathSegments.length - 1;
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      const label = segmentMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      
      breadcrumbs.push({
        label,
        href,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // No mostrar breadcrumbs en la página principal
  if (pathname === '/') return null;

  return (
    <nav aria-label="Navegación de migas de pan" className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 text-gray-400 mx-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              
              {item.current ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Schema.org Breadcrumb markup para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.label.replace(/[🏠🎯📍🛒🖼️👥]/g, '').trim(),
              "item": `https://elenabenitez.com${item.href}`
            }))
          })
        }}
      />
    </nav>
  );
}
