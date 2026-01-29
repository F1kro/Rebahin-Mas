import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = ({ movie }) => {
  if (!movie) return null;

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[750px] overflow-hidden border-b-[6px] border-black bg-white">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <img
          src={movie.thumbnail}
          alt={movie.title}
          className="w-full h-full object-cover grayscale-[20%] contrast-125"
        />
        
        {/* Comic Style Overlays */}
        {/* Halftone Texture Overlay (Opsional: Efek Titik-titik Retro) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(black 1px, transparent 0)', backgroundSize: '4px 4px' }}>
        </div>

        {/* Solid & Sharp Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0)_50%)]"></div>
      </div>

      {/* Content Area */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl space-y-8">
          
          {/* Badge 'Breaking News' Style */}
          <div className="inline-block bg-[#FFD700] border-2 border-black px-4 py-1 -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-black font-black uppercase italic tracking-tighter text-sm">
              Featured Content
            </span>
          </div>

          {/* Title - Comic Boom Style */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] text-white uppercase italic tracking-tighter drop-shadow-[6px_6px_0px_rgba(255,0,0,1)]">
            {movie.title}
          </h1>

          {/* Meta Info ala Caption Box */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-white border-2 border-black px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-black font-bold flex items-center gap-1">
                <span className="text-[#FF0000]">★</span> {movie.rating}
              </span>
            </div>
            
            <div className="bg-white border-2 border-black px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-1">
              <span className="text-black font-bold">{movie.year}</span>
            </div>

            <div className={`px-4 py-1 border-2 border-black font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-1 ${
              movie.type === 'movie' 
                ? 'bg-[#00FFFF] text-black' 
                : 'bg-[#FF00FF] text-white'
            }`}>
              {movie.type === 'movie' ? 'Movie' : 'Series'}
            </div>
          </div>

          {/* Buttons - Bold Action */}
          <div className="flex flex-wrap gap-5 pt-4">
            <Link
              to={`/detail/${movie.slug}`}
              className="group relative flex items-center space-x-3 px-10 py-4 bg-[#FF0000] text-white border-[3px] border-black font-black uppercase italic tracking-wider shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Play className="w-6 h-6" fill="currentColor" />
              <span className="text-xl">Watch Now</span>
            </Link>

            <Link
              to={`/detail/${movie.slug}`}
              className="flex items-center space-x-3 px-10 py-4 bg-white text-black border-[3px] border-black font-black uppercase italic tracking-wider shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Info className="w-6 h-6" />
              <span className="text-xl">Details</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Comic Border Decoration */}
      <div className="absolute top-4 right-4 hidden md:block">
        <div className="w-24 h-24 border-t-8 border-r-8 border-black"></div>
      </div>
      <div className="absolute bottom-4 left-4 hidden md:block">
        <div className="w-24 h-24 border-b-8 border-l-8 border-black"></div>
      </div>
    </div>
  );
};

export default Hero;