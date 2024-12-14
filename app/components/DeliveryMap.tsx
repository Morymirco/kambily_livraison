'use client';
import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAnI4fqmzKs94JuzAVK8UHzp8zmJh-y5bU';

interface Delivery {
  id: number;
  position: { lat: number; lng: number };
  client: string;
  status: string;
  estimatedTime?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.75rem'
};

const center = {
  lat: 9.5370, 
  lng: -13.6785 // Coordonnées de Conakry
};

const markerSizes = {
  driver: { width: 40, height: 40 },
  delivery: { width: 30, height: 30 }
};

export default function DeliveryMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [driverLocation, setDriverLocation] = useState({
    lat: 9.5370,
    lng: -13.6785
  });

  // Données simulées des livraisons à Conakry
  const deliveries: Delivery[] = [
    {
      id: 1,
      position: { lat: 9.5090, lng: -13.7120 },
      client: "Mory Koulibaly",
      status: "En attente",
      estimatedTime: "15 min"
    },
    {
      id: 2,
      position: { lat: 9.5650, lng: -13.6530 },
      client: "Mamadou Diallo",
      status: "En cours",
      estimatedTime: "25 min"
    },
    {
      id: 3,
      position: { lat: 9.5280, lng: -13.6840 },
      client: "Fatoumata Camara",
      status: "Livré"
    }
  ];

  // Calcul de l'itinéraire lorsqu'une livraison est sélectionnée
  useEffect(() => {
    if (selectedDelivery && isLoaded) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: driverLocation,
          destination: selectedDelivery.position,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          }
        }
      );
    } else {
      setDirections(null);
    }
  }, [selectedDelivery, driverLocation, isLoaded]);

  // Simulation de mise à jour de la position du livreur
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getMarkerIcon = (status: string) => {
    switch (status) {
      case 'En cours':
        return '/markers/yellow-marker.png';
      case 'Livré':
        return '/markers/green-marker.png';
      default:
        return '/markers/gray-marker.png';
    }
  };

  if (!isLoaded) {
    return <div className="h-[500px] bg-gray-100 rounded-xl flex items-center justify-center">
      <p className="text-gray-500">Chargement de la carte...</p>
    </div>;
  }

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        options={{
          styles: [
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#7A7A7A" }]
            }
          ],
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        }}
      >
        {/* Affichage de l'itinéraire */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "#048B9A",
                strokeWeight: 4
              }
            }}
          />
        )}

        {/* Marqueur du livreur */}
        <Marker
          position={driverLocation}
          icon={{
            url: '/markers/delivery-driver.png',
            scaledSize: new window.google.maps.Size(markerSizes.driver.width, markerSizes.driver.height)
          }}
        />

        {/* Marqueurs des livraisons */}
        {deliveries.map((delivery) => (
          <Marker
            key={delivery.id}
            position={delivery.position}
            icon={{
              url: getMarkerIcon(delivery.status),
              scaledSize: new window.google.maps.Size(markerSizes.delivery.width, markerSizes.delivery.height)
            }}
            onClick={() => setSelectedDelivery(delivery)}
          />
        ))}

        {/* InfoWindow pour afficher les détails de la livraison */}
        {selectedDelivery && (
          <InfoWindow
            position={selectedDelivery.position}
            onCloseClick={() => setSelectedDelivery(null)}
          >
            <div className="p-2">
              <h3 className="font-bold text-gray-800">{selectedDelivery.client}</h3>
              <p className="text-sm text-gray-600">{selectedDelivery.status}</p>
              {selectedDelivery.estimatedTime && (
                <p className="text-sm text-[#048B9A]">
                  Estimation: {selectedDelivery.estimatedTime}
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Légende */}
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-md">
        <h4 className="font-bold text-sm mb-2">Légende</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src="/markers/delivery-driver.png" alt="Livreur" className="w-5 h-5" />
            <span className="text-sm">Ma position</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/markers/yellow-marker.png" alt="En cours" className="w-5 h-5" />
            <span className="text-sm">En cours</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/markers/gray-marker.png" alt="En attente" className="w-5 h-5" />
            <span className="text-sm">En attente</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/markers/green-marker.png" alt="Livré" className="w-5 h-5" />
            <span className="text-sm">Livré</span>
          </div>
        </div>
      </div>
    </div>
  );
} 