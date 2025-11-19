import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Search, X, Loader2, AlertCircle, Maximize2, Minimize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface OpenStreetMapInteractiveProps {
  onClose?: () => void;
  showFullControls?: boolean;
}

interface NearbyPlace {
  id: string;
  name: string;
  lat: number;
  lon: number;
  tags: any;
  distance?: number;
}

interface RouteData {
  coordinates: [number, number][];
  distance: number;
  duration: number;
}

const HOTEL_LOCATION: [number, number] = [28.3901599, -13.8638789];
const AIRPORT_LOCATION: [number, number] = [28.4527612, -13.8637971];

const hotelIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const airportIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const getCategoryIcon = (category: string) => {
  const colorMap: Record<string, string> = {
    restaurant: 'red',
    cafe: 'orange',
    parking: 'blue',
    gas_station: 'green',
    atm: 'violet',
    pharmacy: 'pink'
  };

  const color = colorMap[category] || 'grey';

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [20, 33],
    iconAnchor: [10, 33],
    popupAnchor: [1, -28],
    shadowSize: [33, 33]
  });
};

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

const OpenStreetMapInteractive: React.FC<OpenStreetMapInteractiveProps> = ({
  onClose,
  showFullControls = true
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  const [showNearby, setShowNearby] = useState(false);
  const [nearbyCategory, setNearbyCategory] = useState<string>('restaurant');
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>(HOTEL_LOCATION);
  const [mapZoom, setMapZoom] = useState(14);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const showAirportRoute = async () => {
    setLoading(true);
    setShowNearby(false);
    setNearbyPlaces([]);

    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${AIRPORT_LOCATION[1]},${AIRPORT_LOCATION[0]};${HOTEL_LOCATION[1]},${HOTEL_LOCATION[0]}?overview=full&geometries=geojson`
      );

      if (!response.ok) throw new Error('Routing failed');

      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coordinates: [number, number][] = route.geometry.coordinates.map(
          (coord: number[]) => [coord[1], coord[0]] as [number, number]
        );

        setRouteData({
          coordinates,
          distance: route.distance / 1000,
          duration: route.duration / 60
        });
        setShowDirections(true);

        const bounds = L.latLngBounds([AIRPORT_LOCATION, HOTEL_LOCATION]);
        setMapCenter(bounds.getCenter() as [number, number]);
        setMapZoom(12);
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      setError(t('map.routing_error') || 'Could not load route');
    } finally {
      setLoading(false);
    }
  };

  const clearDirections = () => {
    setShowDirections(false);
    setRouteData(null);
    resetView();
  };

  const searchNearbyPlaces = async (category: string) => {
    setLoading(true);
    setShowDirections(false);
    setRouteData(null);
    setNearbyCategory(category);

    const categoryMap: Record<string, string> = {
      restaurant: 'amenity=restaurant',
      cafe: 'amenity=cafe',
      parking: 'amenity=parking',
      gas_station: 'amenity=fuel',
      atm: 'amenity=atm',
      pharmacy: 'amenity=pharmacy'
    };

    const query = categoryMap[category] || 'amenity=restaurant';
    const radius = 5000;

    const overpassQuery = `
      [out:json][timeout:25];
      (
        node[${query}](around:${radius},${HOTEL_LOCATION[0]},${HOTEL_LOCATION[1]});
        way[${query}](around:${radius},${HOTEL_LOCATION[0]},${HOTEL_LOCATION[1]});
      );
      out center 20;
    `;

    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery
      });

      if (!response.ok) throw new Error('Overpass API request failed');

      const data = await response.json();

      const places: NearbyPlace[] = data.elements.map((element: any) => {
        const lat = element.lat || element.center?.lat;
        const lon = element.lon || element.center?.lon;
        const distance = calculateDistance(HOTEL_LOCATION[0], HOTEL_LOCATION[1], lat, lon);

        return {
          id: element.id.toString(),
          name: element.tags?.name || t('map.unnamed_place') || 'Unnamed place',
          lat,
          lon,
          tags: element.tags,
          distance
        };
      }).filter((place: NearbyPlace) => place.lat && place.lon)
        .sort((a: NearbyPlace, b: NearbyPlace) => (a.distance || 0) - (b.distance || 0))
        .slice(0, 10);

      setNearbyPlaces(places);
      setShowNearby(true);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      setError(t('map.search_error') || 'Could not load nearby places');
      setNearbyPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  const resetView = () => {
    setShowDirections(false);
    setShowNearby(false);
    setRouteData(null);
    setNearbyPlaces([]);
    setMapCenter(HOTEL_LOCATION);
    setMapZoom(14);
    setError(null);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const openInGoogleMaps = () => {
    window.open(`https://maps.google.com/?q=${HOTEL_LOCATION[0]},${HOTEL_LOCATION[1]}`, '_blank');
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'relative'}`}>
      <div className={`${isFullscreen ? 'h-screen' : 'h-[400px] lg:h-[500px]'} rounded-3xl overflow-hidden relative`}>
        <MapContainer
          center={HOTEL_LOCATION}
          zoom={14}
          className="w-full h-full"
          zoomControl={false}
          scrollWheelZoom={true}
        >
          <MapController center={mapCenter} zoom={mapZoom} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={HOTEL_LOCATION} icon={hotelIcon}>
            <Popup>
              <div className="p-2 font-sans">
                <h3 className="font-bold text-gray-900 mb-2">
                  Hotel Sheraton Fuerteventura Beach, Golf & Spa Resort
                </h3>
                <p className="text-sm text-gray-700 mb-1">
                  Av. de las Marismas, 1
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  35610 Antigua, Las Palmas
                </p>
                <button
                  onClick={openInGoogleMaps}
                  className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                >
                  {t('map.view_in_google_maps')}
                </button>
              </div>
            </Popup>
          </Marker>

          {showDirections && routeData && (
            <>
              <Marker position={AIRPORT_LOCATION} icon={airportIcon}>
                <Popup>
                  <div className="p-2 font-sans">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {t('map.airport') || 'Fuerteventura Airport'}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {t('map.distance')}: {routeData.distance.toFixed(1)} km
                    </p>
                    <p className="text-sm text-gray-700">
                      {t('map.duration')}: {Math.round(routeData.duration)} {t('map.minutes')}
                    </p>
                  </div>
                </Popup>
              </Marker>

              <Polyline
                positions={routeData.coordinates}
                color="#0d9488"
                weight={5}
                opacity={0.8}
              />
            </>
          )}

          {showNearby && nearbyPlaces.map((place) => (
            <Marker
              key={place.id}
              position={[place.lat, place.lon]}
              icon={getCategoryIcon(nearbyCategory)}
            >
              <Popup>
                <div className="p-2 font-sans">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    {place.name}
                  </h4>
                  {place.distance && (
                    <p className="text-xs text-gray-600">
                      {place.distance.toFixed(2)} km {t('map.from_hotel')}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {showFullControls && (
          <>
            <div className="absolute top-4 left-4 bg-white rounded-2xl shadow-lg p-2 flex flex-col gap-2 z-[1000]">
              <button
                onClick={showAirportRoute}
                disabled={loading}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  showDirections
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={t('map.show_route')}
              >
                <Navigation className="w-4 h-4" />
                <span className="hidden sm:inline">{t('map.airport_route')}</span>
              </button>

              <button
                onClick={() => searchNearbyPlaces('restaurant')}
                disabled={loading}
                className={`w-full px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  showNearby && nearbyCategory === 'restaurant'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">{t('map.restaurants')}</span>
              </button>

              <button
                onClick={() => searchNearbyPlaces('parking')}
                disabled={loading}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  showNearby && nearbyCategory === 'parking'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <MapPin className="w-4 h-4" />
                <span className="hidden sm:inline">{t('map.parking')}</span>
              </button>

              <button
                onClick={() => searchNearbyPlaces('gas_station')}
                disabled={loading}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                  showNearby && nearbyCategory === 'gas_station'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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

            <div className="absolute top-4 right-4 z-[1000]">
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

            {loading && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-lg p-4 z-[1000]">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-6 h-6 text-teal-600 animate-spin" />
                  <p className="text-gray-700 font-medium">{t('map.loading')}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-50 border border-red-200 rounded-xl shadow-lg p-4 z-[1000] max-w-md">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                  <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {showNearby && nearbyPlaces.length > 0 && (
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-lg p-4 max-h-48 overflow-y-auto z-[1000]">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-gray-900">
                    {t(`map.nearby_${nearbyCategory}`)} ({nearbyPlaces.length})
                  </h3>
                  <button
                    onClick={() => {
                      setShowNearby(false);
                      setNearbyPlaces([]);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {nearbyPlaces.map((place) => (
                    <div
                      key={place.id}
                      className="text-sm border-b border-gray-100 pb-2 last:border-0"
                    >
                      <p className="font-medium text-gray-900">{place.name}</p>
                      {place.distance && (
                        <p className="text-gray-600 text-xs">
                          {place.distance.toFixed(2)} km {t('map.from_hotel')}
                        </p>
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

export default OpenStreetMapInteractive;
