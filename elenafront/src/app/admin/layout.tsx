"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-admin';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FolderTree, 
  ShoppingBag, 
  BarChart3,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ChevronLeft,
  Bell,
  Users,
  Image as ImageIcon,
  MapPin,
  FileText,
  Settings
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  
  // Si estamos en la página de login, no aplicar el layout protegido
  const isLoginPage = pathname === '/admin/login';

  // En mobile, el sidebar está cerrado por defecto
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize(); // Verificar tamaño inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cambiar el título del documento y agregar meta tags PWA
  useEffect(() => {
    document.title = 'Admin - Elena Benítez';
    
    // Agregar meta tags para PWA
    const addMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Meta tags para PWA iOS
    addMetaTag('apple-mobile-web-app-capable', 'yes');
    addMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    addMetaTag('apple-mobile-web-app-title', 'Elena Admin');
    
    // Meta tags para PWA Android
    addMetaTag('mobile-web-app-capable', 'yes');
    addMetaTag('theme-color', '#008060');
    addMetaTag('application-name', 'Elena Admin');
    
    // Viewport optimizado para PWA - Deshabilitar zoom en mobile
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover');
    
    // Agregar estilos CSS para prevenir zoom
    let style = document.getElementById('admin-no-zoom-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'admin-no-zoom-style';
      style.textContent = `
        * {
          touch-action: manipulation;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
        input, textarea, select {
          -webkit-user-select: text;
          user-select: text;
          touch-action: auto;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Prevenir zoom con gestos táctiles adicionales
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    // Prevenir zoom con doble toque
    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };
    
    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('touchmove', preventZoom, { passive: false });
    document.addEventListener('touchend', preventDoubleTapZoom, { passive: false });
    
    return () => {
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('touchmove', preventZoom);
      document.removeEventListener('touchend', preventDoubleTapZoom);
    };
  }, []);

  useEffect(() => {
    // Si estamos en la página de login, no verificar autenticación
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    // Verificar autenticación
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/admin/login');
        } else if (session) {
          setUser(session.user);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [router, isLoginPage]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Si estamos en la página de login, renderizar solo el contenido sin el layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f6f7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#008060]"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirigirá a login
  }

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    // { href: '/admin/banners', icon: Bell, label: 'Banners' },
    { href: '/admin/categorias', icon: FolderTree, label: 'Categorías' },
    { href: '/admin/servicios', icon: ShoppingBag, label: 'Servicios' },
    // { href: '/admin/equipo', icon: Users, label: 'Equipo' },
    // { href: '/admin/galeria', icon: ImageIcon, label: 'Galería' },
    { href: '/admin/configuracion', icon: Settings, label: 'Configuración' },
    // { href: '/admin/contacto', icon: MapPin, label: 'Contacto' },
    // { href: '/admin/footer', icon: FileText, label: 'Footer' },
    // { href: '/admin/estadisticas', icon: BarChart3, label: 'Estadísticas' },
  ];

  // Función para cerrar sidebar en mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f7] flex">
      {/* Overlay para mobile con blur transparente */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-white/10 backdrop-blur-md z-40 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-gray-200 flex flex-col fixed h-screen z-50 transition-all duration-300 ease-in-out shadow-lg ${
          sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-16'
        }`}
      >
        {/* Header con botón toggle */}
        <div className={`border-b border-gray-200 flex items-center ${sidebarOpen ? 'p-4 justify-between' : 'p-3 justify-center'}`}>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-semibold text-gray-900 truncate">Elena Benítez</h1>
              <p className="text-xs text-gray-500 mt-0.5">Panel de administración</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-600 hover:text-gray-900 flex-shrink-0"
            aria-label={sidebarOpen ? 'Ocultar sidebar' : 'Mostrar sidebar'}
          >
            {sidebarOpen ? (
              <ChevronLeft size={18} className="md:hidden" />
            ) : (
              <Menu size={18} />
            )}
            {sidebarOpen && (
              <ChevronLeft size={18} className="hidden md:block" />
            )}
          </button>
        </div>
        
        <nav className={`flex-1 overflow-y-auto ${sidebarOpen ? 'p-3 space-y-1' : 'p-2 space-y-1'}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className={`flex items-center rounded-md font-medium transition-colors group ${
                  sidebarOpen ? 'gap-2.5 px-2.5 py-2 text-sm' : 'justify-center px-2 py-2.5'
                } ${
                  isActive
                    ? 'bg-[#f0fdf4] text-[#008060]'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-[#008060]' : 'text-gray-500'}`} />
                {sidebarOpen && (
                  <>
                    <span className="truncate">{item.label}</span>
                    {isActive && <ChevronRight size={16} className="ml-auto text-[#008060] flex-shrink-0" />}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        <div className={`border-t border-gray-200 ${sidebarOpen ? 'p-3 space-y-2' : 'p-2'}`}>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors ${
              sidebarOpen ? 'gap-2.5 px-2.5 py-2 text-sm justify-start' : 'justify-center px-2 py-2.5'
            }`}
            title={!sidebarOpen ? 'Cerrar sesión' : ''}
          >
            <LogOut size={18} className="text-gray-500 flex-shrink-0" />
            {sidebarOpen && <span>Cerrar sesión</span>}
          </button>
          {sidebarOpen && (
            <div className="px-2.5 py-2">
              <p className="text-xs text-gray-500 truncate mb-2">{user.email}</p>
              <div className="pt-2 border-t border-gray-200">
                <a
                  href="https://digita.com.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <span className="text-xs text-gray-400">Creado por</span>
                  <img 
                    src="/digitalogo.png" 
                    alt="Digita Paraguay" 
                    className="h-3.5 w-auto"
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${
        sidebarOpen ? 'md:ml-64 ml-0' : 'md:ml-16 ml-0'
      }`}>
        {/* Botón para abrir sidebar en mobile cuando está cerrado */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-3 left-3 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-50 transition-all md:hidden"
            aria-label="Abrir menú"
          >
            <Menu size={20} className="text-gray-700" />
          </button>
        )}
        <main className={`max-w-7xl mx-auto transition-all duration-300 ${
          !sidebarOpen ? 'p-4 md:p-8 pt-14 md:pt-8' : 'p-4 md:p-8'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
}
