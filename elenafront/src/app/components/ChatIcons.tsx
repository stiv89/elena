import React from 'react';

interface ChatIconProps {
  className?: string;
  size?: number;
}

export function ChatIcon({ className = "w-6 h-6", size }: ChatIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
  );
}

export function BotIcon({ className = "w-6 h-6", size }: ChatIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );
}

export function SparklesIcon({ className = "w-6 h-6", size }: ChatIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.5 2l.5 1.5L11.5 2l-.5 1.5L9.5 2zM6 6.5L4.5 6 6 4.5 7.5 6 6 6.5zm12 12l1.5.5L18 20.5 16.5 19l1.5-.5zm.5-10L20 8l1.5.5L20 10l-1.5-.5zM8.59 8.59L10 7.17l1.41 1.42L10 10l-1.41-1.41zM12 12l-1.41 1.41L12 14.83l1.41-1.42L12 12zm-4.24 6.24L6.34 17l1.41-1.42L9.17 17l-1.41 1.24zM17 14.17l-1.41 1.41L17 17l1.41-1.42L17 14.17z"/>
    </svg>
  );
}
