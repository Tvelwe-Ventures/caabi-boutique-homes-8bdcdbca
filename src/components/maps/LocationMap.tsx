import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { CardSpotlight } from '../ui/card-spotlight';

const LocationMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current) return;

      try {
        // Get the Mapbox token from Supabase
        const { data: { secret: mapboxToken } } = await supabase.functions.invoke('get-mapbox-token');
        if (!mapboxToken) {
          console.error('Mapbox token not found');
          return;
        }

        mapboxgl.accessToken = mapboxToken;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [55.2708, 25.2048], // Dubai coordinates
          zoom: 11,
          pitch: 45,
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

        map.current.on('load', () => {
          // Add 3D building layer
          map.current?.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 12,
            'paint': {
              'fill-extrusion-color': '#aaa',
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-opacity': 0.6
            }
          });
        });

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <CardSpotlight className="p-6">
      <h3 className="text-xl font-semibold mb-4">Dubai Real Estate Map</h3>
      <div className="h-[600px] rounded-lg overflow-hidden">
        <div ref={mapContainer} className="w-full h-full" />
      </div>
    </CardSpotlight>
  );
};

export default LocationMap;