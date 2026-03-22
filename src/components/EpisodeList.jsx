import { Play } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const ensureNumber = (value, fallback = null) => {
  if (typeof value === 'number' && !Number.isNaN(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return fallback;
};

const pickEpisodeLabel = (episode, fallbackIndex) => {
  const fields = ['title', 'name', 'label', 'description'];
  for (const field of fields) {
    const value = episode?.[field];
    if (typeof value === 'string' && value.trim() !== '') {
      return value.trim();
    }
  }
  const number = episode?.episode ?? episode?.number ?? episode?.episodeNumber ?? fallbackIndex + 1;
  return `Episode ${typeof number === 'number' ? number : fallbackIndex + 1}`;
};

const pickSeasonKey = (episode) => {
  const seasonValue = episode?.season ?? episode?.seasonNumber ?? episode?.season_id;
  return ensureNumber(seasonValue, 1);
};

const EpisodeList = ({ episodes, onEpisodeSelect }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  const seasons = useMemo(() => {
    if (!Array.isArray(episodes)) return {};
    return episodes.reduce((acc, episode) => {
      const seasonKey = pickSeasonKey(episode);
      if (!acc[seasonKey]) acc[seasonKey] = [];
      acc[seasonKey].push(episode);
      return acc;
    }, {});
  }, [episodes]);

  const seasonNumbers = useMemo(() => {
    const numbers = Object.keys(seasons).map(Number).filter(Boolean);
    return numbers.length ? numbers.sort((a, b) => a - b) : [];
  }, [seasons]);

  useEffect(() => {
    if (!seasonNumbers.length) return;
    if (!seasonNumbers.includes(selectedSeason)) {
      setSelectedSeason(seasonNumbers[0]);
    }
  }, [seasonNumbers, selectedSeason]);

  const activeSeason = seasonNumbers.includes(selectedSeason) ? selectedSeason : seasonNumbers[0];
  const currentSeasonEpisodes = seasons[activeSeason] || [];

  return (
    <div className="space-y-6">
      {seasonNumbers.length > 1 && (
        <div className="flex items-center space-x-3 overflow-x-auto pb-4 scrollbar-hide">
          {seasonNumbers.map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`px-6 py-2 border-2 border-black font-black text-sm uppercase italic transition-all active:translate-y-1 active:shadow-none ${
                selectedSeason === season
                  ? 'bg-[#FF0000] text-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]'
                  : 'bg-white text-black shadow-[2px_2px_0px_0_rgba(0,0,0,1)] hover:bg-yellow-300'
              } dark:bg-slate-900 dark:text-white`}
            >
              Season {season}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentSeasonEpisodes.map((episode, episodeIndex) => {
          const badgeNumber = ensureNumber(
            episode.episode ?? episode.number ?? episode.episodeNumber,
            episodeIndex + 1
          );
          const episodePayload = { ...episode, season: activeSeason, episode: badgeNumber };
          return (
            <button
              key={`${activeSeason}-${badgeNumber}-${episodeIndex}`}
              onClick={() => onEpisodeSelect(episodePayload)}
              className="group relative bg-white dark:bg-slate-900 border-[3px] border-black dark:border-slate-700 p-4 text-left transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
            >
              <div className="absolute -top-3 -left-3 bg-[#FF0000] text-white border-2 border-black px-3 py-0.5 z-10 -rotate-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-xs font-black uppercase tracking-tighter">EPISODE {badgeNumber}</p>
              </div>

              <div className="flex items-center space-x-4 mt-2">
                <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD700] transition-colors">
                  <Play className="w-6 h-6 text-white group-hover:text-black" fill="currentColor" />
                </div>

                <div className="flex-1 overflow-hidden">
                  <h4 className="font-black text-sm uppercase italic leading-tight line-clamp-2 text-black group-hover:text-[#FF0000] transition-colors dark:text-white">
                    {pickEpisodeLabel(episode, episodeIndex)}
                  </h4>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <div className="w-4 h-[2px] bg-black mb-1 skew-x-12"></div>
                <div className="w-6 h-[2px] bg-black skew-x-12"></div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EpisodeList;
