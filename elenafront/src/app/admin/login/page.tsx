"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-admin';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Download, Smartphone, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const router = useRouter();

  // Cargar credenciales guardadas al cargar la página
  useEffect(() => {
    const savedEmail = localStorage.getItem('admin_email');
    const savedPassword = localStorage.getItem('admin_password');
    const savedRememberMe = localStorage.getItem('admin_remember') === 'true';
    
    if (savedRememberMe && savedEmail) {
      setEmail(savedEmail);
      setPassword(savedPassword || '');
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    // Verificar si ya está autenticado
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.push('/admin');
        }
      } catch (err) {
        console.error('Error checking auth:', err);
      }
    };
    checkAuth();
  }, [router]);

  // Detectar plataforma y si la app está instalada
  useEffect(() => {
    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    // Detectar Android
    const android = /Android/.test(navigator.userAgent);
    
    // Detectar si está en modo standalone (ya instalado)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as any).standalone === true ||
                       document.referrer.includes('android-app://');
    
    setIsIOS(iOS);
    setIsAndroid(android);
    setIsStandalone(standalone);
    
    // Mostrar banner si no está instalado y es mobile
    if ((iOS || android) && !standalone) {
      setShowInstallBanner(true);
    }

    // Escuchar evento beforeinstallprompt para Android
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Guardar credenciales si "recordar" está marcado
        if (rememberMe) {
          localStorage.setItem('admin_email', email);
          localStorage.setItem('admin_password', password);
          localStorage.setItem('admin_remember', 'true');
        } else {
          localStorage.removeItem('admin_email');
          localStorage.removeItem('admin_password');
          localStorage.removeItem('admin_remember');
        }
        router.push('/admin');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleInstallClick = async () => {
    // Android: usar el prompt nativo
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallBanner(false);
        setDeferredPrompt(null);
      }
    }
    // iOS: mostrar instrucciones (no hay API nativa)
  };

  return (
    <div className="min-h-screen bg-[#f6f6f7] flex flex-col">
      {/* Header minimalista */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="inline-block">
            <h1 className="text-xl font-semibold text-gray-900">Elena Benítez</h1>
            <p className="text-xs text-gray-500">Panel de administración</p>
          </Link>
        </div>
      </header>

      {/* Banner de instalación PWA */}
      {showInstallBanner && !isStandalone && (
        <div className="bg-gradient-to-r from-[#008060] to-[#006e52] text-white px-4 py-3 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Smartphone size={20} className="flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">
                  {isIOS ? 'Instala la app para acceso rápido' : 'Instala la app en tu dispositivo'}
                </p>
                {isIOS && (
                  <p className="text-xs opacity-90 mt-0.5">
                    Toca el botón Compartir → "Agregar a pantalla de inicio"
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAndroid && deferredPrompt ? (
                <button
                  onClick={handleInstallClick}
                  className="px-4 py-2 bg-white text-[#008060] rounded-md text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Download size={16} />
                  Instalar
                </button>
              ) : isIOS ? (
                <div className="flex items-center gap-2 text-xs opacity-90">
                  <Share2 size={16} />
                  <span>Usa el botón Compartir</span>
                </div>
              ) : null}
              <button
                onClick={() => setShowInstallBanner(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Cerrar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Iniciar sesión
              </h1>
              <p className="text-sm text-gray-600 mt-2">
                Ingresa tus credenciales para acceder al panel de administración
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  placeholder="admin@elenabenitez.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-gray-400" />
                    ) : (
                      <Eye size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#008060] focus:ring-[#008060] border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  Recordar inicio de sesión
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2.5 bg-[#008060] hover:bg-[#006e52] disabled:bg-gray-400 text-white text-sm font-medium rounded-md transition-colors"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Acceso restringido al personal autorizado
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer minimalista */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Elena Benítez. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Volver al sitio
              </Link>
              <a
                href="https://digita.com.py"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gray-900 transition-colors"
              >
                <span className="text-xs text-gray-500">Creado por</span>
                <img 
                  src="/digitalogo.png" 
                  alt="Digita Paraguay" 
                  className="h-4 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
