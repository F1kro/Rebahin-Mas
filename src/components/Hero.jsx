import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pickDetailPath, pickImage, pickTitle } from '../lib/utils';
import { useTranslation } from '../lib/i18n';

const Hero = ({ movie }) => {
  if (!movie) return null;

  const title = pickTitle(movie);
  const image = pickImage(movie);
  const detailSlug = pickDetailPath(movie);
  const detailLink = detailSlug ? `/detail/${detailSlug}` : '/';
  const rating = movie.rating ?? movie.rate ?? movie.rating_score;
  const year = movie.year ?? movie.release_year ?? movie.release;
  const badgeType = movie.type ?? (movie.episodes && movie.episodes.length ? 'series' : 'movie');
  const t = useTranslation();

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[750px] overflow-hidden border-b-[6px] border-black bg-[var(--app-bg)] transition-colors duration-300">
      
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <img
          src={image || 'https://dummyimage.com/1600x900/000/fff&text=No+Image'}
          alt={title}
          className="w-full h-full object-cover grayscale-[20%] contrast-125"
        />
        
        {/* Halftone Texture Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none dark:opacity-20" 
             style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 0)', backgroundSize: '4px 4px' }}>
        </div>

        {/* Gradasi yang mengikuti tema agar teks Hero tidak tenggelam */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--app-bg)] via-[var(--app-bg)]/70 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--app-bg)_0%,rgba(0,0,0,0)_60%)] z-10"></div>
      </div>

      {/* Content Area */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl space-y-6 md:space-y-8">
          
          <div className="inline-block bg-[#FFD700] border-[3px] border-black px-4 py-1 -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-black font-black uppercase italic tracking-tighter text-xs md:text-sm">
              Featured Content
            </span>
          </div>

          {/* Title - Menggunakan stroke agar terbaca di semua background */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] text-white uppercase italic tracking-tighter drop-shadow-[6px_6px_0px_rgba(255,0,0,1)] [-webkit-text-stroke:1.5px_black]">
            {title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-[var(--app-bg)] text-[var(--app-text)] border-[3px] border-black px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
              <span className="font-black flex items-center gap-1">
                <span className="text-[#FF0000]">★</span> {rating ?? 'N/A'}
              </span>
            </div>
            
            <div className="bg-[var(--app-bg)] text-[var(--app-text)] border-[3px] border-black px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1 font-black">
              {year ?? 'Unknown'}
            </div>

            <div className={`px-4 py-1 border-[3px] border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-2 ${
              badgeType === 'movie' ? 'bg-[#00FFFF] text-black' : 'bg-[#FF00FF] text-white'
            }`}>
                {badgeType === 'movie' ? 'Movie' : 'Series'}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-5 pt-4">
            <Link
              to={detailLink}
              className="group relative flex items-center space-x-3 px-8 md:px-10 py-4 bg-[#FF0000] text-white border-[3px] border-black font-black uppercase italic tracking-wider shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Play className="w-6 h-6" fill="currentColor" />
              <span className="text-lg md:text-xl">{t('watchNow')}</span>
            </Link>

            <Link
              to={detailLink}
              className="flex items-center space-x-3 px-8 md:px-10 py-4 bg-[var(--app-bg)] text-[var(--app-text)] border-[3px] border-black font-black uppercase italic tracking-wider shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Info className="w-6 h-6" />
              <span className="text-lg md:text-xl">{t('details')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;