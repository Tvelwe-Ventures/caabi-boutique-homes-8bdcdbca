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
      return data as Property[];
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
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [55.2708, 25.2048], // Dubai coordinates
          zoom: 13,
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

          // Add markers for properties
          properties?.forEach(property => {
            const el = document.createElement('div');
            el.className = 'flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold shadow-lg cursor-pointer hover:bg-primary/90 transition-colors';
            el.innerHTML = '🏠';

            // Create popup
            const popup = new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-2">
                  <h3 class="font-bold">${property.name}</h3>
                  <p class="text-sm">Monthly Rent: AED ${property.monthly_rent}</p>
                  <p class="text-sm">Occupancy: ${property.occupancy_rate}%</p>
                </div>
              `);

            // Add marker to map
            new mapboxgl.Marker(el)
              .setLngLat([55.2708, 25.2048]) // You should replace with actual coordinates from your database
              .setPopup(popup)
              .addTo(map.current!);
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