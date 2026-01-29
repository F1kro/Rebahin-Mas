import { useEffect, useState } from 'react';
import { api } from '../services/api';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading'; // Menggunakan Loading comic kita
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const response = await api.getMovies(page);
      if (response.success) {
        setMovies(response.data);
      }
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    fetchMovies();
  }, [page]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#fdf6e3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Comic Issue Style */}
        <div className="mb-12 relative">
          <div className="inline-block bg-[#FF0000] border-[4px] border-black px-8 py-3 -rotate-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
              The Movie Vault
            </h1>
          </div>
          <div className="mt-4 bg-white border-2 border-black inline-block px-4 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-1">
            <p className="font-bold text-black uppercase tracking-widest text-xs md:text-sm">
              Discover the latest and greatest action!
            </p>
          </div>
        </div>

        {/* Movies Grid */}
        {movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 mb-16">
              {movies.map((movie, idx) => (
                <div key={movie.slug} className={idx % 2 === 0 ? 'rotate-1' : '-rotate-1'}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>

            {/* Pagination - Action Button Style */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-10 border-t-4 border-black border-dashed">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="group relative flex items-center space-x-2 px-8 py-3 bg-white border-[3px] border-black font-black uppercase italic shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 disabled:opacity-30 disabled:shadow-none transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <ChevronLeft className="w-6 h-6" />
                <span>Prev Page</span>
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1"></div>
                <div className="relative px-8 py-3 bg-[#FFD700] border-[3px] border-black font-black text-xl italic -rotate-2">
                  ISSUE #{page}
                </div>
              </div>
              
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={movies.length === 0}
                className="group relative flex items-center space-x-2 px-8 py-3 bg-white border-[3px] border-black font-black uppercase italic shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#00FFFF] disabled:opacity-30 disabled:shadow-none transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <span>Next Page</span>
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-32 bg-white border-[4px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4">Empty Panel!</h2>
            <p className="text-xl font-bold text-gray-500">No movies found in this section.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;