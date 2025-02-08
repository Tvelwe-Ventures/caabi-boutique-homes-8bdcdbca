
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
  latitude: number;
  longitude: number;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  maintenance_status: string | null;
}

const PortfolioMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);
      
      if (error) {
        console.error('Error fetching properties:', error);
        throw error;
      }
      
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
        
        if (map.current) return;

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
          if (!map.current) return;

          // Add heat map layer for property density
          map.current.addSource('properties', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: properties?.map(property => ({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [property.longitude, property.latitude]
                },
                properties: {
                  id: property.id,
                  rent: property.monthly_rent
                }
              })) || []
            }
          });

          map.current.addLayer({
            id: 'property-heat',
            type: 'heatmap',
            source: 'properties',
            paint: {
              'heatmap-weight': [
                'interpolate',
                ['linear'],
                ['get', 'rent'],
                0, 0,
                100000, 1
              ],
              'heatmap-intensity': 1,
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(33,102,172,0)',
                0.2, 'rgb(103,169,207)',
                0.4, 'rgb(209,229,240)',
                0.6, 'rgb(253,219,199)',
                0.8, 'rgb(239,138,98)',
                1, 'rgb(178,24,43)'
              ],
              'heatmap-radius': 30,
              'heatmap-opacity': 0.7
            }
          });

          // Add 3D building layer
          if (!map.current.getLayer('3d-buildings')) {
            map.current.addLayer({
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
                      <span class="font-semibold">Property Type:</span> 
                      ${property.property_type}
                    </p>
                    <p class="text-sm">
                      <span class="font-semibold">Monthly Rent:</span> 
                      AED ${property.monthly_rent.toLocaleString()}
                    </p>
                    <p class="text-sm">
                      <span class="font-semibold">Occupancy:</span> 
                      ${property.occupancy_rate}%
                    </p>
                    <p class="text-sm">
                      <span class="font-semibold">Details:</span> 
                      ${property.bedrooms} beds, ${property.bathrooms} baths, ${property.area_sqft} sqft
                    </p>
                    <p class="text-sm">
                      <span class="font-semibold">Location:</span> 
                      ${property.location}
                    </p>
                    ${property.maintenance_status ? `
                    <p class="text-sm">
                      <span class="font-semibold">Maintenance:</span> 
                      <span class="px-2 py-1 rounded-full text-xs ${
                        property.maintenance_status === 'good' ? 'bg-green-100 text-green-800' :
                        property.maintenance_status === 'needs_attention' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }">${property.maintenance_status}</span>
                    </p>
                    ` : ''}
                  </div>
                </div>
              `);

            // Add marker to map with popup
            new mapboxgl.Marker(markerEl)
              .setLngLat([property.longitude, property.latitude])
              .setPopup(popup)
              .addTo(map.current!);
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
