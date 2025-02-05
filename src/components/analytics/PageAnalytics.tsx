import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const PageAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const startTime = Date.now();

    const trackPageView = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        await supabase.from('page_analytics').insert({
          path: location.pathname,
          user_id: user?.id,
          session_start: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();

    return () => {
      const endTime = Date.now();
      const duration = endTime - startTime;

      const updateDuration = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          await supabase.from('page_analytics').update({
            duration_ms: duration,
            session_end: new Date().toISOString()
          }).match({
            path: location.pathname,
            user_id: user?.id,
            session_end: null
          });
        } catch (error) {
          console.error('Error updating page duration:', error);
        }
      };

      updateDuration();
    };
  }, [location.pathname]);

  return null;
};