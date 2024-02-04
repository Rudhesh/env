'use client'
import { useEffect } from "react";
import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L, { LatLng, LatLngExpression, LatLngLiteral, LatLngTuple } from "leaflet";
import React from "react";
const icon = L.icon({ iconUrl: "/marker.png", iconSize: [32, 32],  iconAnchor: [16, 32],popupAnchor: [0, -32], });



interface ChangeLocationProps {
  latitude: number;
  longitude: number;
}

interface MapComponentProps {
  latitude: number;
  longitude: number;
  address : any
 
}

const ChangeLocation: React.FC<ChangeLocationProps> = ({ latitude, longitude }) => {
  const map = useMap(); // Access the map instance



  // Function to update the map's center when the location changes
  const updateMapCenter = () => {
    map.flyTo([latitude, longitude], 13); // Fly to the new position with a zoom level of 13 (adjust as needed)
  };

  // Use useEffect to call updateMapCenter when the location changes
  useEffect(() => {
    updateMapCenter();
  }, [latitude, longitude]);

  return null; // This component doesn't render anything on its own
};

const MapComponent: React.FC<MapComponentProps> = ({latitude,longitude, address} ) => {
  const position: LatLngExpression = [latitude, longitude]

  // Replace Add with the actual content you want to display in the Popup
  const Add = "Your content goes here";

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%', margin: '0', padding: '0' }} scrollWheelZoom={false}>
     <TileLayer
  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png" 
/>
      <Marker position={position} >
        <Popup>
          Station: {address}
        </Popup>
      </Marker>
      {/* Pass the latitude and longitude props to ChangeLocation component */}
      <ChangeLocation latitude={latitude} longitude={longitude} />
    </MapContainer>
  );
}

export default MapComponent;
