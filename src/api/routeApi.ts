import { mockRoute } from "../data/mockRoute";
import type { RouteData, Stop } from "../types/route";
import { haversineKm } from "../lib/geo";

export async function fetchRoute(): Promise<RouteData> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const stops = mockRoute.stops as Stop[];
  
  const segments = stops.slice(1).map((stop, i) => ({
    fromId: stops[i].id,
    toId: stop.id,
    distanceKm: haversineKm(stops[i], stop),
  }));
  
  return { 
    stops, 
    segments, 
    totalKm: segments.reduce((sum, seg) => sum + seg.distanceKm, 0) 
  };
}