
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { CardSpotlight } from '../ui/card-spotlight';
import { useQuery } from '@tanstack/react-query';

interface Property {
  id: string;
  name: string;
  location: string;
  monthly_rent: number;
  occupancy_rate: number;
  latitude?: number;
  longitude?: number;
}

const PortfolioMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const { data: properties } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*');
      
      if (error) throw error;
      
      // For development, let's add some sample coordinates since they're not in DB yet
      return (data as Property[]).map(property => ({
        ...property,
        latitude: 25.2048 + (Math.random() - 0.5) * 0.1, // Random spread around Dubai
        longitude: 55.2708 + (Math.random() - 0.5) * 0.1
      }));
    }
  });

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current) return;

      try {
        const { data: { secret: mapboxToken } } = await supabase.functions.invoke('get-mapbox-token');
        if (!mapboxToken) {
          console.error('Mapbox token not found');
          return;
        }

        mapboxgl.accessToken = mapboxToken;
        
        if (map.current) return; // Prevent duplicate initialization

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

        map.current.on('load', () => {
          if (!map.current?.getLayer('3d-buildings')) {
            // Add 3D building layer only if it doesn't exist
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
          }

          // Add markers for properties
          properties?.forEach(property => {
            // Create custom marker element
            const markerEl = document.createElement('div');
            markerEl.className = 'flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold shadow-lg cursor-pointer hover:bg-primary/90 transition-colors';
            markerEl.innerHTML = '🏠';

            // Create popup with property details
            const popup = new mapboxgl.Popup({ offset: 25, maxWidth: '300px' })
              .setHTML(`
                <div class="p-4">
                  <h3 class="font-bold text-lg mb-2">${property.name}</h3>
                  <div class="space-y-2">
                    <p class="text-sm">
                      <span class="font-semibold">Monthly Rent:</span> 
                      AED ${property.monthly_rent.toLocaleString()}
                    </p>
                    <p class="text-sm">
                      <span class="font-semibold">Occupancy:</span> 
                      ${property.occupancy_rate}%
                    </p>
                    <p class="text-sm">
                      <span class="font-semibold">Location:</span> 
                      ${property.location}
                    </p>
                  </div>
                </div>
              `);

            // Add marker to map with popup
            if (property.latitude && property.longitude) {
              new mapboxgl.Marker(markerEl)
                .setLngLat([property.longitude, property.latitude])
                .setPopup(popup)
                .addTo(map.current!);
            }
          });
        });

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    if (properties) {
      initializeMap();
    }

    return () => {
      map.current?.remove();
    };
  }, [properties]);

  return (
    <CardSpotlight className="p-6">
      <h3 className="text-xl font-semibold mb-4">Portfolio Properties</h3>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <div ref={mapContainer} className="w-full h-full" />
      </div>
    </CardSpotlight>
  );
};

export default PortfolioMap;
