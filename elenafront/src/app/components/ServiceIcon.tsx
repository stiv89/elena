// Componente para iconos SVG de servicios
interface ServiceIconProps {
  type: string;
  className?: string;
}

export default function ServiceIcon({ type, className = "w-8 h-8" }: ServiceIconProps) {
  const icons = {
    "hair-wash": (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        <path d="M12 4c-1.1 0-2 .9-2 2 0 .74.4 1.39 1 1.73V9h2V7.73c.6-.34 1-.99 1-1.73 0-1.1-.9-2-2-2z"/>
      </svg>
    ),
    "makeup": (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    "eye": (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
      </svg>
    ),
    "wax": (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 11H7v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9h-2m-7 0V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5M9 7h6"/>
        <path d="M11 9h2v2h-2z"/>
      </svg>
    ),
    "hands-feet": (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2c-4 0-8 .5-8 4v9.5A2.5 2.5 0 0 0 6.5 18h3A2.5 2.5 0 0 0 12 15.5h0A2.5 2.5 0 0 0 14.5 18h3A2.5 2.5 0 0 0 20 15.5V6c0-3.5-4-4-8-4z"/>
        <circle cx="8" cy="10" r="1.5"/>
        <circle cx="16" cy="10" r="1.5"/>
      </svg>
    ),
    "nail-art": (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L8 6v4h8V6l-4-4z"/>
        <path d="M8 10v8c0 2.21 1.79 4 4 4s4-1.79 4-4v-8H8z"/>
        <path d="M10 12h4v2h-4z"/>
        <path d="M10 15h4v1h-4z"/>
      </svg>
    ),
    "hair-color": (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
        <path d="M8 9h8M9 7h6M10 11h4"/>
      </svg>
    )
  };

  return icons[type as keyof typeof icons] || (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 12h8M12 8v8"/>
    </svg>
  );
}
