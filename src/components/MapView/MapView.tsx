import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { RouteData } from "../../types/route";
import { markerIcon, truckIcon } from "./icons";

interface Props {
  route: RouteData;
  truckPosition: { lat: number; lng: number };
  heading: number;
  segmentIndex: number;
  isDone: boolean;
}

export function MapView({ route, truckPosition, heading, segmentIndex, isDone }: Props) {
  const path = route.stops.map((s) => [s.lat, s.lng] as [number, number]);
  
  // Filter out waypoints so we only draw markers for Origins and Deliveries
  const visibleStops = route.stops.filter(s => s.type !== "waypoint");
  
  return (
    <MapContainer center={path[0]} zoom={11} style={{ height: "100%", width: "100%", zIndex: 0 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
      <Polyline positions={path} pathOptions={{ color: "#3DDC97", dashArray: "8 8", weight: 4 }} />
      
      {visibleStops.map((s) => {
        const stopIndex = route.stops.findIndex(routeStop => routeStop.id === s.id);
        return (
          <Marker 
            key={s.id} 
            position={[s.lat, s.lng]} 
            icon={markerIcon(s, stopIndex <= segmentIndex || isDone)} 
          />
        );
      })}
      
      <Marker position={[truckPosition.lat, truckPosition.lng]} icon={truckIcon(heading)} />
    </MapContainer>
  );
}