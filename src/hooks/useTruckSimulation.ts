import { useState, useRef, useEffect, useEffectEvent } from "react";
import type { RouteData } from "../types/route";

const AVG_SPEED_KMH = 45;

export function useTruckSimulation(route: RouteData | null) {
  // Single source of truth: Total distance the truck has moved
  const [distanceCovered, setDistanceCovered] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackMultiplier, setPlaybackMultiplier] = useState(120);
  
  const lastTs = useRef<number | null>(null);

  const onTick = useEffectEvent((ts: number) => {
    if (lastTs.current == null) lastTs.current = ts;
    const dt = (ts - lastTs.current) / 1000;
    lastTs.current = ts;

    if (!route || isPaused || distanceCovered >= route.totalKm) return;

    const kmThisTick = (dt * playbackMultiplier / 3600) * AVG_SPEED_KMH;
    
    setDistanceCovered((prev) => {
      const nextDist = prev + kmThisTick;
      return nextDist >= route.totalKm ? route.totalKm : nextDist;
    });
  });

  useEffect(() => {
    if (!route) return;
    let raf: number;
    const loop = (ts: number) => { onTick(ts); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [route]);

  const reset = () => {
    setDistanceCovered(0);
    setIsPaused(false);
    lastTs.current = null;
  };

  // Mathematically derive the segment and progress from the distance
  let segmentIndex = 0;
  let progress = 0;
  let isDone = false;

  if (route) {
    if (distanceCovered >= route.totalKm) {
      isDone = true;
      segmentIndex = route.segments.length - 1;
      progress = 1;
    } else {
      let accumulated = 0;
      for (let i = 0; i < route.segments.length; i++) {
        const seg = route.segments[i];
        if (distanceCovered <= accumulated + seg.distanceKm) {
          segmentIndex = i;
          progress = (distanceCovered - accumulated) / seg.distanceKm;
          break;
        }
        accumulated += seg.distanceKm;
      }
    }
  }

  return { segmentIndex, progress, distanceCovered, isPaused, setIsPaused, isDone, playbackMultiplier, setPlaybackMultiplier, reset };
}