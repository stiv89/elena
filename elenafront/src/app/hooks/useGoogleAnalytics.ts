'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '../lib/gtag';

export const useGoogleAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      gtag.pageview(pathname);
    }
  }, [pathname]);

  return {
    trackWhatsAppClick: gtag.trackWhatsAppClick,
    trackServiceView: gtag.trackServiceView,
    trackCartAdd: gtag.trackCartAdd,
    trackSearchQuery: gtag.trackSearchQuery,
    trackChatInteraction: gtag.trackChatInteraction,
    trackAppointmentIntent: gtag.trackAppointmentIntent,
    trackPageSection: gtag.trackPageSection,
    trackSocialClick: gtag.trackSocialClick,
    trackEvent: gtag.event,
  };
};
