import { useRouteData } from "./hooks/useRouteData";
import { useTruckSimulation } from "./hooks/useTruckSimulation";
import { MapView } from "./components/MapView/MapView";
import { StatusPanel } from "./components/StatusPanel/StatusPanel";
import { ControlsBar } from "./components/ControlsBar/ControlsBar";
import { interpolate, bearing } from "./lib/geo";
import { useTheme } from "./contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

function App() {
  const { data, isLoading, error } = useRouteData();
  const sim = useTruckSimulation(data);
  const { theme, toggleTheme } = useTheme();

  if (isLoading) return <div className="p-8 text-slate-900 dark:text-white h-screen bg-slate-50 dark:bg-[#0e1218]">Loading map interface...</div>;
  if (error) return <div className="p-8 text-red-500 h-screen bg-slate-50 dark:bg-[#0e1218]">Error: {error}</div>;
  if (!data) return null;

  const seg = data.segments[sim.segmentIndex];
  const startStop = data.stops.find(s => s.id === seg.fromId)!;
  const endStop = data.stops.find(s => s.id === seg.toId)!;
  
  const truckPosition = sim.isDone 
    ? { lat: data.stops[data.stops.length-1].lat, lng: data.stops[data.stops.length-1].lng }
    : interpolate(startStop, endStop, sim.progress);
    
  const currentHeading = bearing(startStop, endStop);
  const remainingKm = data.totalKm - sim.distanceCovered;
  const etaMinutes = Math.round((remainingKm / 45) * 60);
  const currentLocationLabel = sim.isDone ? `Arrived: ${data.stops[data.stops.length-1].label}` : `Between ${startStop.label} & ${endStop.label}`;

  // NEW LOGIC: Calculate completed deliveries
  const totalDeliveries = data.stops.filter(s => s.type === "delivery").length;
  const completedDeliveries = sim.isDone 
    ? totalDeliveries 
    : data.stops.slice(0, sim.segmentIndex + 1).filter(s => s.type === "delivery").length;

  return (
    <div className="h-screen w-full bg-slate-100 dark:bg-[#0e1218] p-2 md:p-4 flex flex-col md:flex-row gap-4 transition-colors duration-300 overflow-y-auto md:overflow-hidden">
      <div className="w-full md:w-[320px] lg:w-[360px] flex flex-col gap-4 shrink-0 md:overflow-y-auto pb-4 md:pb-0">
        <div className="bg-white dark:bg-[#1b212b] p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex justify-between items-center transition-colors shrink-0">
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Route Visualizer</h1>
          <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="shrink-0">
          <StatusPanel 
            isDone={sim.isDone} distanceCovered={sim.distanceCovered} totalDistance={data.totalKm}
            currentLocationLabel={currentLocationLabel} nextStopLabel={endStop.label} etaMinutes={etaMinutes}
            completedDeliveries={completedDeliveries} totalDeliveries={totalDeliveries}
          />
        </div>

        <div className="shrink-0">
          <ControlsBar 
            isPaused={sim.isPaused} setIsPaused={sim.setIsPaused}
            playbackMultiplier={sim.playbackMultiplier} setPlaybackMultiplier={sim.setPlaybackMultiplier} reset={sim.reset}
          />
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-[#1b212b] p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 min-h-[400px] md:min-h-0 flex relative z-0 transition-colors">
        <div className="w-full h-full rounded-xl overflow-hidden relative z-0">
          <MapView 
            route={data} truckPosition={truckPosition} heading={currentHeading} 
            segmentIndex={sim.segmentIndex} isDone={sim.isDone}
          />
        </div>
      </div>
    </div>
  );
}

export default App;