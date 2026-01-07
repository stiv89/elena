"use client";
import { useState, useEffect, useRef } from "react";

interface Servicio {
  id: string;
  nombre: string;
  precio: string;
  descripcion: string;
}

interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  icon: string;
  color: string;
  obs: string;
  servicios: Servicio[];
}

interface SearchSuggestion {
  text: string;
  categoria: string;
  servicio?: string;
  precio?: string;
  type: 'service' | 'category' | 'suggestion';
  score?: number; // Añadir score opcional para ordenamiento
}

interface SmartSearchBarProps {
  onSearchResult: (categoria: string, servicio?: string) => void;
  servicios?: Categoria[];
}

export default function SmartSearchBar({ onSearchResult, servicios = [] }: SmartSearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Sugerencias de intención para mostrar cuando no hay query
  const intentSuggestions = [
    "¿Cuánto cuesta un maquillaje social?",
    "Diseño de cejas",
    "Corte de cabello",
    "Manicure y pedicure",
    "Tratamientos capilares"
  ];

  // Función para normalizar texto (quitar acentos, convertir a minúsculas)
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
      .replace(/[^a-z0-9\s]/g, ' ') // Reemplazar caracteres especiales por espacios
      .replace(/\s+/g, ' ') // Normalizar espacios
      .trim();
  };

  // Función para calcular similitud entre palabras
  const getWordSimilarity = (word1: string, word2: string): number => {
    const longer = word1.length > word2.length ? word1 : word2;
    const shorter = word1.length > word2.length ? word2 : word1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  };

  // Distancia de Levenshtein para similitud de palabras
  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  // Generar sugerencias inteligentes
  const generateSuggestions = (searchQuery: string): SearchSuggestion[] => {
    const results: SearchSuggestion[] = [];
    const queryNormalized = normalizeText(searchQuery);
    const queryLower = searchQuery.toLowerCase();
    const queryWords = queryNormalized.split(' ').filter(word => word.length > 0);
    
    if (!queryNormalized) {
      // Mostrar sugerencias de intención cuando no hay query
      return intentSuggestions.slice(0, 5).map(suggestion => ({
        text: suggestion,
        categoria: "",
        type: 'suggestion' as const
      }));
    }

    // Buscar servicios específicos con búsqueda inteligente
    servicios.forEach(categoria => {
      categoria.servicios.forEach(servicio => {
        const servicioNormalized = normalizeText(servicio.nombre);
        const descripcionNormalized = normalizeText(servicio.descripcion || '');
        const categoriaNormalized = normalizeText(categoria.nombre);
        
        let score = 0;
        let matchedWords = 0;
        
        // Verificar coincidencias exactas o parciales
        queryWords.forEach(queryWord => {
          // Coincidencia exacta en nombre del servicio
          if (servicioNormalized.includes(queryWord)) {
            score += 10;
            matchedWords++;
          }
          // Coincidencia en descripción
          else if (descripcionNormalized.includes(queryWord)) {
            score += 5;
            matchedWords++;
          }
          // Coincidencia en categoría
          else if (categoriaNormalized.includes(queryWord)) {
            score += 3;
            matchedWords++;
          }
          // Similitud de palabras (para errores tipográficos)
          else {
            const servicioWords = servicioNormalized.split(' ');
            const categoriaWords = categoriaNormalized.split(' ');
            const descripcionWords = descripcionNormalized.split(' ');
            
            [...servicioWords, ...categoriaWords, ...descripcionWords].forEach(word => {
              if (getWordSimilarity(queryWord, word) > 0.8) {
                score += 2;
                matchedWords++;
              }
            });
          }
        });
        
        // Solo incluir si hay coincidencias significativas
        if (score > 0 && matchedWords > 0) {
          results.push({
            text: servicio.nombre,
            categoria: categoria.nombre,
            servicio: servicio.nombre,
            precio: servicio.precio,
            type: 'service',
            score // Añadir score para ordenar
          } as SearchSuggestion & { score: number });
        }
      });
    });

    // Buscar por categorías
    servicios.forEach(categoria => {
      const categoriaNormalized = normalizeText(categoria.nombre);
      const descripcionNormalized = normalizeText(categoria.descripcion);
      
      let score = 0;
      let matchedWords = 0;
      
      queryWords.forEach(queryWord => {
        if (categoriaNormalized.includes(queryWord)) {
          score += 8;
          matchedWords++;
        } else if (descripcionNormalized.includes(queryWord)) {
          score += 4;
          matchedWords++;
        }
      });
      
      if (score > 0 && matchedWords > 0) {
        results.push({
          text: categoria.nombre,
          categoria: categoria.nombre,
          type: 'category',
          score
        } as SearchSuggestion & { score: number });
      }
    });

    // Buscar sugerencias por palabras clave
    const keywordMap: { [key: string]: string[] } = {
      "joven": servicios.filter(c => c.nombre.toLowerCase().includes('facial') || c.nombre.toLowerCase().includes('tratamiento')).map(c => c.nombre),
      "boda": servicios.filter(c => c.nombre.toLowerCase().includes('maquillaje') || c.nombre.toLowerCase().includes('cejas')).map(c => c.nombre),
      "cabello": servicios.filter(c => c.nombre.toLowerCase().includes('lavado') || c.nombre.toLowerCase().includes('capilar')).map(c => c.nombre),
      "uñas": servicios.filter(c => c.nombre.toLowerCase().includes('mano') || c.nombre.toLowerCase().includes('pie')).map(c => c.nombre),
      "cejas": servicios.filter(c => c.nombre.toLowerCase().includes('cejas')).map(c => c.nombre),
      "maquillaje": servicios.filter(c => c.nombre.toLowerCase().includes('maquillaje')).map(c => c.nombre),
      "relax": servicios.filter(c => c.nombre.toLowerCase().includes('facial') || c.nombre.toLowerCase().includes('tratamiento')).map(c => c.nombre),
      "look": servicios.filter(c => c.nombre.toLowerCase().includes('maquillaje') || c.nombre.toLowerCase().includes('cejas')).map(c => c.nombre),
      "piel": servicios.filter(c => c.nombre.toLowerCase().includes('facial') || c.nombre.toLowerCase().includes('tratamiento')).map(c => c.nombre),
      "fiesta": servicios.filter(c => c.nombre.toLowerCase().includes('maquillaje') || c.nombre.toLowerCase().includes('cejas')).map(c => c.nombre),
      "radiante": servicios.filter(c => c.nombre.toLowerCase().includes('facial') || c.nombre.toLowerCase().includes('maquillaje')).map(c => c.nombre)
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
      const suggestionNormalized = normalizeText(suggestion);
      let score = 0;
      
      queryWords.forEach(queryWord => {
        if (suggestionNormalized.includes(queryWord)) {
          score += 1;
        }
      });
      
      if (score > 0) {
        results.push({
          text: suggestion,
          categoria: "",
          type: 'suggestion',
          score
        } as SearchSuggestion & { score: number });
      }
    });

    // Ordenar por score (relevancia) y limitar a 8 sugerencias
    return results
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 8);
  };

  useEffect(() => {
    const newSuggestions = generateSuggestions(query);
    setSuggestions(newSuggestions);
    setSelectedIndex(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, servicios]);

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
