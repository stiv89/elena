"use client";
import { useState, useEffect, useRef } from "react";
import siteData from "../siteData.json";

interface SearchSuggestion {
  text: string;
  categoria: string;
  servicio?: string;
  precio?: string;
  type: 'service' | 'category' | 'suggestion';
}

interface SmartSearchBarProps {
  onSearchResult: (categoria: string, servicio?: string) => void;
}

export default function SmartSearchBar({ onSearchResult }: SmartSearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Sugerencias predefinidas basadas en intenciones comunes
  const intentSuggestions = [
    "verme más joven",
    "prepararme para una boda",
    "cuidar mi cabello",
    "arreglar mis uñas",
    "depilar mis cejas",
    "maquillarme para una fiesta",
    "relajarme y consentirme",
    "cambiar mi look",
    "cuidar mi piel",
    "lucir radiante"
  ];

  // Generar sugerencias inteligentes
  const generateSuggestions = (searchQuery: string): SearchSuggestion[] => {
    const results: SearchSuggestion[] = [];
    const queryLower = searchQuery.toLowerCase().trim();
    
    if (!queryLower) {
      // Mostrar sugerencias de intención cuando no hay query
      return intentSuggestions.slice(0, 5).map(suggestion => ({
        text: suggestion,
        categoria: "",
        type: 'suggestion' as const
      }));
    }

    // Buscar servicios específicos
    siteData.servicios.forEach(categoria => {
      categoria.servicios.forEach(servicio => {
        const servicioLower = servicio.nombre.toLowerCase();
        const categoriaLower = categoria.categoria.toLowerCase();
        
        if (servicioLower.includes(queryLower) || 
            categoriaLower.includes(queryLower) ||
            servicio.descripcion?.toLowerCase().includes(queryLower)) {
          results.push({
            text: servicio.nombre,
            categoria: categoria.categoria,
            servicio: servicio.nombre,
            precio: servicio.precio,
            type: 'service'
          });
        }
      });
    });

    // Buscar por categorías
    siteData.servicios.forEach(categoria => {
      const categoriaLower = categoria.categoria.toLowerCase();
      const descripcionLower = categoria.descripcion.toLowerCase();
      
      if (categoriaLower.includes(queryLower) || 
          descripcionLower.includes(queryLower)) {
        results.push({
          text: categoria.categoria,
          categoria: categoria.categoria,
          type: 'category'
        });
      }
    });

    // Buscar sugerencias por palabras clave
    const keywordMap: { [key: string]: string[] } = {
      "joven": ["Tratamientos Faciales", "Maquillaje"],
      "boda": ["Maquillaje", "Cejas y Pestañas"],
      "cabello": ["Lavados y Cuidado Capilar"],
      "uñas": ["Manos y Pies"],
      "cejas": ["Cejas y Pestañas"],
      "maquillaje": ["Maquillaje"],
      "relax": ["Tratamientos Faciales"],
      "look": ["Maquillaje", "Cejas y Pestañas"],
      "piel": ["Tratamientos Faciales"],
      "fiesta": ["Maquillaje", "Cejas y Pestañas"],
      "radiante": ["Tratamientos Faciales", "Maquillaje"]
    };

    Object.entries(keywordMap).forEach(([keyword, categorias]) => {
      if (queryLower.includes(keyword)) {
        categorias.forEach(categoria => {
          if (!results.some(r => r.categoria === categoria && r.type === 'category')) {
            results.push({
              text: `Servicios de ${categoria}`,
              categoria,
              type: 'category'
            });
          }
        });
      }
    });

    // Filtrar sugerencias de intención que coincidan
    intentSuggestions.forEach(suggestion => {
      if (suggestion.toLowerCase().includes(queryLower) || 
          queryLower.split(' ').some(word => suggestion.toLowerCase().includes(word))) {
        results.push({
          text: suggestion,
          categoria: "",
          type: 'suggestion'
        });
      }
    });

    return results.slice(0, 8); // Limitar a 8 sugerencias
  };

  useEffect(() => {
    const newSuggestions = generateSuggestions(query);
    setSuggestions(newSuggestions);
    setSelectedIndex(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'service') {
      setQuery(suggestion.text);
      onSearchResult(suggestion.categoria, suggestion.servicio);
    } else if (suggestion.type === 'category') {
      setQuery(suggestion.text);
      onSearchResult(suggestion.categoria);
    } else {
      // Es una sugerencia de intención, buscar servicios relacionados
      setQuery(suggestion.text);
      const relatedResults = generateSuggestions(suggestion.text);
      const firstService = relatedResults.find(r => r.type === 'service' || r.type === 'category');
      if (firstService) {
        onSearchResult(firstService.categoria, firstService.servicio);
      }
    }
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  // Cerrar sugerencias cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node) &&
          suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIconForSuggestion = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'service') {
      return (
        <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    } else if (suggestion.type === 'category') {
      return (
        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Hoy quiero hacer..."
            className="w-full px-6 py-4 text-lg bg-white border-2 border-gray-200 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-20 focus:border-amber-500 transition-all duration-300 pr-16"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </form>

      {/* Sugerencias */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-96 overflow-y-auto z-50"
        >
          <div className="p-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                  index === selectedIndex
                    ? 'bg-amber-50 text-amber-900 border-2 border-amber-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex-shrink-0">
                  {getIconForSuggestion(suggestion)}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{suggestion.text}</div>
                  {suggestion.categoria && (
                    <div className="text-sm text-gray-500">
                      en {suggestion.categoria}
                      {suggestion.precio && (
                        <span className="ml-2 font-semibold text-amber-600">₲{suggestion.precio}</span>
                      )}
                    </div>
                  )}
                </div>
                {suggestion.type === 'suggestion' && (
                  <div className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                    Sugerencia
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
