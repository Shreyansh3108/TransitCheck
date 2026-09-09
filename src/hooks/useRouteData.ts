import { useState, useEffect } from "react";
import { fetchRoute } from "../api/routeApi";
import type { RouteData } from "../types/route";

export function useRouteData() {
  const [data, setData] = useState<RouteData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRoute()
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  return { data, error, isLoading: !data && !error };
}