// Google Analytics utilities for tracking events

export const GA_TRACKING_ID = 'G-4B82YMTN2P';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
    (window as unknown as { gtag: Function }).gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (action: string, parameters: {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}) => {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
    (window as unknown as { gtag: Function }).gtag('event', action, parameters);
  }
};

// Eventos específicos para Elena Benítez
export const trackWhatsAppClick = (context: string, service?: string) => {
  event('whatsapp_click', {
    event_category: 'engagement',
    event_label: context,
    custom_service: service,
  });
};

export const trackServiceView = (service: string, category: string) => {
  event('service_view', {
    event_category: 'services',
    event_label: service,
    custom_category: category,
  });
};

export const trackCartAdd = (service: string, price: string) => {
  event('add_to_cart', {
    event_category: 'ecommerce',
    event_label: service,
    value: parseInt(price.replace(/[^\d]/g, '')) || 0,
  });
};

export const trackSearchQuery = (query: string, results_count: number) => {
  event('search', {
    search_term: query,
    event_category: 'search',
    custom_results_count: results_count,
  });
};

export const trackChatInteraction = (message_type: 'user' | 'bot', query?: string) => {
  event('chat_interaction', {
    event_category: 'ai_assistant',
    event_label: message_type,
    custom_query: query,
  });
};

export const trackAppointmentIntent = (method: 'whatsapp' | 'phone' | 'form', service?: string) => {
  event('appointment_intent', {
    event_category: 'conversion',
    event_label: method,
    custom_service: service,
  });
};

export const trackPageSection = (section: string) => {
  event('section_view', {
    event_category: 'navigation',
    event_label: section,
  });
};

export const trackSocialClick = (platform: 'instagram' | 'whatsapp' | 'phone') => {
  event('social_click', {
    event_category: 'social',
    event_label: platform,
  });
};
