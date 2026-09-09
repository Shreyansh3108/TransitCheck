import { divIcon } from "leaflet";
import type { Stop } from "../../types/route";

export const markerIcon = (_stop: Stop, isCompleted: boolean) =>
  divIcon({
    className: "bg-transparent",
    html: `<div class="w-4 h-4 rounded-full border-2 border-white ${isCompleted ? 'bg-[#3DDC97]' : 'bg-[#F2A93B]'} shadow-md"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

export const truckIcon = (heading: number) => 
  divIcon({
    className: "bg-transparent",
    // We use a top-down SVG so it never looks upside down when rotating
    html: `
      <div style="transform: rotate(${heading}deg); transform-origin: center; display: flex; justify-content: center; align-items: center; width: 32px; height: 32px;">
        <svg viewBox="0 0 24 24" style="width: 100%; height: 100%; filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.4));">
          <rect x="5" y="2" width="14" height="20" rx="2" fill="#F2A93B" stroke="#1b212b" stroke-width="2" />
          <rect x="7" y="4" width="10" height="5" rx="1" fill="#ffffff" />
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });