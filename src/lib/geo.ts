// src/lib/geo.ts
export function haversineKm(a: {lat:number,lng:number}, b: {lat:number,lng:number}): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat), lat2 = toRad(b.lat);
  const h = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const toRad = (d: number) => d * Math.PI / 180;

export function interpolate(a: {lat:number,lng:number}, b: {lat:number,lng:number}, t: number) {
  return { lat: a.lat + (b.lat - a.lat) * t, lng: a.lng + (b.lng - a.lng) * t };
}

export function bearing(a: {lat:number,lng:number}, b: {lat:number,lng:number}): number {
  const y = Math.sin(toRad(b.lng-a.lng)) * Math.cos(toRad(b.lat));
  const x = Math.cos(toRad(a.lat))*Math.sin(toRad(b.lat)) -
            Math.sin(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.cos(toRad(b.lng-a.lng));
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}