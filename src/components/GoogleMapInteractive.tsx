import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Navigation, Search, X, Loader2, AlertCircle, Maximize2, Minimize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GoogleMapInteractiveProps {
  onClose?: () => void;
  showFullControls?: boolean;
}

interface NearbyPlace {
  name: string;
  vicinity: string;
  rating?: number;
  types: string[];
  geometry: {
    location: google.maps.LatLng;
  };
  place_id: string;
}

const HOTEL_LOCATION = { lat: 28.3901599, lng: -13.8638789 };
const AIRPORT_LOCATION = { lat: 28.4527612, lng: -13.8637971 };

const GoogleMapInteractive: React.FC<GoogleMapInteractiveProps> = ({
  onClose,
  showFullControls = true
}) => {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  const [showNearby, setShowNearby] = useState(false);
  const [nearbyCategory, setNearbyCategory] = useState<string>('restaurant');
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [nearbyMarkers, setNearbyMarkers] = useState<google.maps.Marker[]>([]);
  const [hotelMarker, setHotelMarker] = useState<google.maps.Marker | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
      setError(t('map.api_key_missing'));
      setLoading(false);
      return;
    }

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
      libraries: ['places', 'geometry']
    });

    loader
      .load()
      .then(() => {
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: HOTEL_LOCATION,
            zoom: 14,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: false,
            zoomControl: true,
            mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
              position: google.maps.ControlPosition.TOP_RIGHT
            }
          });

          const marker = new google.maps.Marker({
            position: HOTEL_LOCATION,
            map: mapInstance,
            title: 'Hotel Sheraton Fuerteventura Beach, Golf & Spa Resort',
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new google.maps.Size(40, 40)
            }
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 10px; font-family: system-ui, -apple-system, sans-serif;">
                <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #1f2937;">
                  Hotel Sheraton Fuerteventura Beach, Golf & Spa Resort
                </h3>
                <p style="margin: 0 0 4px 0; color: #4b5563; font-size: 14px;">
                  Av. de las Marismas, 1
                </p>
                <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 14px;">
                  35610 Antigua, Las Palmas
                </p>
                <a
                  href="https://maps.app.goo.gl/3qrMjsbEUPfSAHa57"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="color: #0d9488; text-decoration: none; font-weight: 500; font-size: 14px;"
                >
                  ${t('map.view_in_google_maps')}
                </a>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(mapInstance, marker);
          });

          setHotelMarker(marker);
          setMap(mapInstance);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error('Error loading Google Maps:', e);
        setError(t('map.loading_error'));
        setLoading(false);
      });
  }, [t]);

  const showAirportRoute = () => {
    if (!map) return;

    clearDirections();
    setShowNearby(false);
    clearNearbyMarkers();

    const directionsService = new google.maps.DirectionsService();
    const renderer = new google.maps.DirectionsRenderer({
      map: map,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#0d9488',
        strokeWeight: 5,
        strokeOpacity: 0.8
      }
    });

    const request: google.maps.DirectionsRequest = {
      origin: AIRPORT_LOCATION,
      destination: HOTEL_LOCATION,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        renderer.setDirections(result);
        setDirectionsRenderer(renderer);
        setShowDirections(true);
      } else {
        console.error('Directions request failed:', status);
      }
    });
  };

  const clearDirections = () => {
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
      setDirectionsRenderer(null);
    }
    setShowDirections(false);
  };

  const clearNearbyMarkers = () => {
    nearbyMarkers.forEach(marker => marker.setMap(null));
    setNearbyMarkers([]);
    setNearbyPlaces([]);
  };

  const searchNearbyPlaces = (category: string) => {
    if (!map) return;

    clearDirections();
    clearNearbyMarkers();
    setNearbyCategory(category);

    const service = new google.maps.places.PlacesService(map);

    const request: google.maps.places.PlaceSearchRequest = {
      location: HOTEL_LOCATION,
      radius: 5000,
      type: category
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const places = results.slice(0, 10) as NearbyPlace[];
        setNearbyPlaces(places);

        const markers = places.map(place => {
          const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
            icon: {
              url: getCategoryIcon(category),
              scaledSize: new google.maps.Size(32, 32)
            }
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; font-family: system-ui, -apple-system, sans-serif;">
                <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold; color: #1f2937;">
                  ${place.name}
                </h4>
                <p style="margin: 0 0 4px 0; color: #4b5563; font-size: 12px;">
                  ${place.vicinity}
                </p>
                ${place.rating ? `
                  <p style="margin: 0; color: #f59e0b; font-size: 12px;">
                    ⭐ ${place.rating.toFixed(1)}
                  </p>
                ` : ''}
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          return marker;
        });

        setNearbyMarkers(markers);
        setShowNearby(true);
      }
    });
  };

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      restaurant: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      cafe: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      parking: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      gas_station: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      atm: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
      pharmacy: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
    };
    return icons[category] || 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
  };

  const resetView = () => {
    clearDirections();
    clearNearbyMarkers();
    setShowNearby(false);
    if (map) {
      map.setCenter(HOTEL_LOCATION);
      map.setZoom(14);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (loading) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-3xl flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
          <p className="text-gray-600 font-medium">{t('map.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-3xl flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <p className="text-gray-900 font-semibold text-lg">{t('map.error_title')}</p>
          <p className="text-gray-600 text-sm">{error}</p>
          <p className="text-gray-500 text-xs mt-2">{t('map.setup_instructions')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'relative'}`}>
      <div className={`${isFullscreen ? 'h-screen' : 'h-[400px] lg:h-[500px]'} rounded-3xl overflow-hidden relative`}>
        <div ref={mapRef} className="w-full h-full" />

        {showFullControls && (
          <>
            <div className="absolute top-4 left-4 bg-white rounded-2xl shadow-lg p-2 flex flex-col gap-2 z-10">
              <button
                onClick={showAirportRoute}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  showDirections
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                title={t('map.show_route')}
              >
                <Navigation className="w-4 h-4" />
                <span className="hidden sm:inline">{t('map.airport_route')}</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => searchNearbyPlaces('restaurant')}
                  className={`w-full px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                    showNearby && nearbyCategory === 'restaurant'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('map.restaurants')}</span>
                </button>
              </div>

              <button
                onClick={() => searchNearbyPlaces('parking')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  showNearby && nearbyCategory === 'parking'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">{t('map.parking')}</span>
              </button>

              <button
                onClick={() => searchNearbyPlaces('gas_station')}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  showNearby && nearbyCategory === 'gas_station'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">{t('map.gas_stations')}</span>
              </button>

              <button
                onClick={resetView}
                className="px-4 py-2 rounded-xl font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">{t('map.reset')}</span>
              </button>
            </div>

            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={toggleFullscreen}
                className="bg-white rounded-xl shadow-lg p-3 hover:bg-gray-50 transition-all duration-200"
                title={isFullscreen ? t('map.exit_fullscreen') : t('map.fullscreen')}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5 text-gray-700" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>

            {showNearby && nearbyPlaces.length > 0 && (
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-lg p-4 max-h-48 overflow-y-auto z-10">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-gray-900">
                    {t(`map.nearby_${nearbyCategory}`)} ({nearbyPlaces.length})
                  </h3>
                  <button
                    onClick={() => {
                      setShowNearby(false);
                      clearNearbyMarkers();
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {nearbyPlaces.map((place, idx) => (
                    <div
                      key={idx}
                      className="text-sm border-b border-gray-100 pb-2 last:border-0"
                    >
                      <p className="font-medium text-gray-900">{place.name}</p>
                      <p className="text-gray-600 text-xs">{place.vicinity}</p>
                      {place.rating && (
                        <p className="text-yellow-600 text-xs">⭐ {place.rating.toFixed(1)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleMapInteractive;
