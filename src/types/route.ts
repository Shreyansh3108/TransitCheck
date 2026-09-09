export interface Stop {
  id: string;
  label: string;
  lat: number;
  lng: number;
  type: "origin" | "delivery" | "waypoint";
}

export interface Segment {
  fromId: string;
  toId: string;
  distanceKm: number;
}

export interface RouteData {
  stops: Stop[];
  segments: Segment[];
  totalKm: number;
}