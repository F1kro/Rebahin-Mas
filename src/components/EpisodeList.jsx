import { Play } from 'lucide-react';
import { useState } from 'react';

const EpisodeList = ({ episodes, onEpisodeSelect }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  const seasons = episodes.reduce((acc, episode) => {
    if (!acc[episode.season]) {
      acc[episode.season] = [];
    }
    acc[episode.season].push(episode);
    return acc;
  }, {});

  const seasonNumbers = Object.keys(seasons).map(Number).sort((a, b) => a - b);
  const currentSeasonEpisodes = seasons[selectedSeason] || [];

  return (
    <div className="space-y-6">
      {/* Season Selector - Dibuat seperti Tab Komik */}
      {seasonNumbers.length > 1 && (
        <div className="flex items-center space-x-3 overflow-x-auto pb-4 scrollbar-hide">
          {seasonNumbers.map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`px-6 py-2 border-2 border-black font-black text-sm uppercase italic transition-all active:translate-y-1 active:shadow-none ${
                selectedSeason === season
                  ? 'bg-[#FF0000] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300'
              }`}
            >
              Season {season}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentSeasonEpisodes.map((episode) => (
          <button
            key={`${episode.season}-${episode.episode}`}
            onClick={() => onEpisodeSelect(episode)}
            className="group relative bg-white border-[3px] border-black p-4 text-left transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            {/* Episode Badge - Dibuat lebih kontras */}
            <div className="absolute -top-3 -left-3 bg-[#FF0000] text-white border-2 border-black px-3 py-0.5 z-10 -rotate-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xs font-black uppercase tracking-tighter">EPISODE {episode.episode}</p>
            </div>
      
            <div className="flex items-center space-x-4 mt-2">
              {/* Play Icon Box */}
              <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD700] transition-colors">
                <Play className="w-6 h-6 text-white group-hover:text-black" fill="currentColor" />
              </div>
      
              <div className="flex-1 overflow-hidden">
                {/* Judul Episode - Selalu Muncul */}
                <h4 className="font-black text-sm uppercase italic leading-tight line-clamp-2 text-black group-hover:text-[#FF0000] transition-colors">
                  {episode.title || `Episode ${episode.episode}`}
                </h4>
              </div>
            </div>
      
            {/* Dekorasi Garis Kecepatan - Dibuat permanen tipis, menebal saat hover */}
            <div className="absolute bottom-2 right-2 opacity-20 group-hover:opacity-100 transition-opacity">
               <div className="w-4 h-[2px] bg-black mb-1 skew-x-12"></div>
               <div className="w-6 h-[2px] bg-black skew-x-12"></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;