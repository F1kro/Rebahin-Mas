import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/api';
import MovieGrid from '../components/MovieGrid';
import { FiSearch } from 'react-icons/fi';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      loadResults();
    }
  }, [query]);

  const loadResults = async () => {
    setLoading(true);
    try {
      const data = await searchMovies(query);
      if (data.success) {
        setResults(data.data || []);
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf6e3] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Search Header - Comic Archive Style */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            <div className="w-16 h-16 bg-white border-[4px] border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-3">
              <FiSearch className="text-[#FF0000]" size={40} strokeWidth={3} />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
                SEARCH <span className="text-[#FF0000]">RESULTS</span>
              </h1>
              <div className="bg-black text-white px-3 py-1 inline-block skew-x-[-10deg]">
                <p className="font-bold text-sm uppercase tracking-widest">
                  Keyword: <span className="text-yellow-400">"{query}"</span>
                </p>
              </div>
            </div>
          </div>
          
          {!loading && results.length > 0 && (
            <div className="inline-block bg-white border-2 border-black px-4 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-1">
              <p className="font-black text-black uppercase text-xs">
                Mission Success: {results.length} Intel Found
              </p>
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div className="relative">
          <MovieGrid movies={results} loading={loading} />
        </div>

        {/* Empty State - Comic Noir Style */}
        {!loading && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-black translate-x-3 translate-y-3"></div>
              <div className="relative bg-white border-[4px] border-black p-12">
                <div className="text-8xl mb-4 animate-bounce">🕵️‍♂️</div>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4 text-[#FF0000]">
                  Gak Ketemu, Sob!
                </h3>
                <p className="text-gray-600 font-bold uppercase max-w-sm">
                  Sepertinya intel yang kamu cari sedang bersembunyi. Coba cek ejaan atau pakai kata kunci lain!
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => window.history.back()}
              className="px-10 py-4 bg-black text-white border-[3px] border-black font-black uppercase italic shadow-[6px_6px_0px_0px_rgba(255,215,0,1)] hover:bg-[#FF0000] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Abort Mission & Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;