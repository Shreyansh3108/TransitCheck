import { Clock, MapPin, Truck, CheckCircle2 } from "lucide-react";

interface Props {
  isDone: boolean; distanceCovered: number; totalDistance: number;
  currentLocationLabel: string; nextStopLabel: string | null; etaMinutes: number;
  completedDeliveries: number; totalDeliveries: number;
}

export function StatusPanel({ isDone, distanceCovered, totalDistance, currentLocationLabel, nextStopLabel, etaMinutes, completedDeliveries, totalDeliveries }: Props) {
  const rawPercent = Math.min(100, (distanceCovered / totalDistance) * 100);
  const steppedPercent = isDone ? 100 : Math.floor(rawPercent / 25) * 25;

  return (
    <div className="w-full bg-white dark:bg-[#151a21] text-slate-800 dark:text-slate-200 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800/60 overflow-hidden transition-colors">
      <div className="bg-slate-50 dark:bg-[#1a212b] p-4 border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
        <h2 className="font-semibold text-[15px] flex items-center gap-2 tracking-wide dark:text-white">
          <Truck size={18} className="text-[#F2A93B]" /> Live Telemetry
        </h2>
        <span className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${isDone ? 'bg-[#3DDC97]/10 text-[#3DDC97]' : 'bg-[#F2A93B]/10 text-[#F2A93B]'}`}>
          {isDone ? 'Completed' : 'In Transit'}
        </span>
      </div>

      <div className="p-5 space-y-5">
        <div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider mb-1.5">Current Status</p>
          <p className="text-[14px] font-medium text-slate-700 dark:text-slate-200">{currentLocationLabel}</p>
        </div>
        
        {/* Grid layout for Next Stop & Completed count */}
        <div className="grid grid-cols-2 gap-4">
          {!isDone && (
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-[#3DDC97] mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider mb-1">Next Stop</p>
                <p className="text-[14px] font-medium text-slate-700 dark:text-slate-200 truncate pr-2">{nextStopLabel}</p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-[#3DDC97] mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider mb-1">Completed</p>
              <p className="text-[14px] font-medium text-slate-700 dark:text-slate-200">{completedDeliveries} / {totalDeliveries}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-2.5">
          <Clock size={16} className="text-[#F2A93B] mt-0.5 shrink-0" />
          <div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider mb-1">Time Remaining</p>
            <p className="text-[14px] font-medium text-slate-700 dark:text-slate-200">{isDone ? '0 min' : `${Math.max(1, etaMinutes)} min (at 45 km/h)`}</p>
          </div>
        </div>
        
        <div className="pt-3">
          <div className="flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-2 tracking-wide">
            <span>{distanceCovered.toFixed(1)} km</span>
            <span>{totalDistance.toFixed(1)} km</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#3DDC97] h-full transition-all duration-700 ease-in-out" style={{ width: `${steppedPercent}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}