import { Play, Pause, RotateCcw } from "lucide-react";

interface Props {
  isPaused: boolean; setIsPaused: (val: boolean) => void;
  playbackMultiplier: number; setPlaybackMultiplier: (val: number) => void; reset: () => void;
}

export function ControlsBar({ isPaused, setIsPaused, playbackMultiplier, setPlaybackMultiplier, reset }: Props) {
  const speeds = [60, 120, 240];

  return (
    <div className="w-full bg-white dark:bg-[#1b212b] border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-lg flex items-center justify-between gap-4 transition-colors">
      <div className="flex items-center gap-4">
        <button onClick={() => setIsPaused(!isPaused)} className="w-10 h-10 flex items-center justify-center bg-[#F2A93B] text-black rounded-full hover:bg-yellow-400 transition shadow-md">
          {isPaused ? <Play size={20} fill="black" /> : <Pause size={20} fill="black" />}
        </button>
        <button onClick={reset} className="w-10 h-10 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition shadow-md" title="Reset Route">
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="flex bg-slate-100 dark:bg-slate-800 rounded-full p-1 shadow-inner border border-slate-200 dark:border-slate-700">
        {speeds.map((speed) => (
          <button
            key={speed}
            onClick={() => setPlaybackMultiplier(speed)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
              playbackMultiplier === speed ? 'bg-[#3DDC97] text-black shadow' : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300'
            }`}
          >
            {speed / 60}x
          </button>
        ))}
      </div>
    </div>
  );
}