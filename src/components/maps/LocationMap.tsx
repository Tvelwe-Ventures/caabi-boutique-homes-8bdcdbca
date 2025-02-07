
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { CardSpotlight } from '../ui/card-spotlight';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

const LocationMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapToken, setMapToken] = useState<string | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current) return;

      try {
        console.log('Fetching Mapbox token...');
        const { data, error } = await supabase.functions.invoke('get-mapbox-token');
        
        if (error) {
          console.error('Error fetching Mapbox token:', error);
          setError('Failed to load map configuration');
          setLoading(false);
          return;
        }

        if (!data?.secret) {
          console.error('No Mapbox token found');
          setError('Map configuration not found');
          setLoading(false);
          return;
        }

        console.log('Mapbox token retrieved successfully');
        mapboxgl.accessToken = data.secret;
        setMapToken(data.secret);
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [55.2708, 25.2048], // Dubai coordinates
          zoom: 11,
          pitch: 45,
          bearing: -17.6,
          antialias: true
        });

        map.current.on('style.load', () => {
          if (!map.current) return;

          // Add 3D building layer
          map.current.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 12,
            'paint': {
              'fill-extrusion-color': '#9b87f5',
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-opacity': 0.6,
              'fill-extrusion-base': ['get', 'min_height']
            }
          });

          // Add atmosphere
          map.current.setFog({
            'color': 'white',
            'high-color': 'rgb(200, 200, 225)',
            'horizon-blend': 0.2,
            'space-color': '#D6BCFA',
            'star-intensity': 0.6
          });

          setLoading(false);
        });

        // Add navigation controls
        map.current.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
          }),
          'top-right'
        );

        // Add scale control
        map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-right');

      } catch (error) {
        console.error('Error initializing map:', error);
        setError('Failed to initialize map');
        setLoading(false);
      }
    };

    initializeMap();

    return () => {
      map.current?.remove();
    };
  }, []);

  const retryLoad = () => {
    setLoading(true);
    setError(null);
    map.current?.remove();
    initializeMap();
  };

  return (
    <CardSpotlight className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-primary-dark">Dubai Real Estate Map</h3>
      <div className="h-[600px] rounded-lg overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={retryLoad} variant="outline">
              Retry Loading Map
            </Button>
          </div>
        )}
        <div ref={mapContainer} className="w-full h-full" />
      </div>
    </CardSpotlight>
  );
};

export default LocationMap;
