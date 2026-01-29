import { useEffect, useState } from 'react';
import { api } from '../services/api';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import { ChevronLeft, ChevronRight, Tv } from 'lucide-react';

const Series = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true);
      const response = await api.getSeries(page);
      if (response.success) {
        setSeries(response.data);
      }
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    fetchSeries();
  }, [page]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#fdf6e3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Comic Series Anthology Style */}
        <div className="mb-12 relative">
          <div className="flex items-center gap-4">
            <div className="bg-[#FF00FF] border-[4px] border-black p-3 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] -rotate-3">
              <Tv className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
            <div>
              <div className="inline-block bg-black text-white px-6 py-2 rotate-1 shadow-[4px_4px_0px_0px_rgba(255,0,255,1)]">
                <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                  TV ANTHOLOGY
                </h1>
              </div>
              <p className="mt-3 font-bold text-gray-600 uppercase tracking-widest text-xs bg-white border border-black inline-block px-2">
                Binge-watch your favorite series episodes!
              </p>
            </div>
          </div>
        </div>

        {/* Series Grid */}
        {series.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 mb-16">
              {series.map((show, idx) => (
                <div key={show.slug} className={idx % 2 !== 0 ? 'rotate-1' : '-rotate-1'}>
                  <MovieCard movie={show} />
                </div>
              ))}
            </div>

            {/* Pagination - Comic Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-10 border-t-4 border-black border-double">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="group relative flex items-center space-x-2 px-8 py-3 bg-white border-[3px] border-black font-black uppercase italic shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#00FFFF] disabled:opacity-30 disabled:shadow-none transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <ChevronLeft className="w-6 h-6" />
                <span>Previous Arc</span>
              </button>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-[#FF00FF] translate-x-1 translate-y-1 rotate-2"></div>
                <div className="relative px-8 py-3 bg-white border-[3px] border-black font-black text-xl italic group-hover:rotate-0 transition-transform">
                  VOLUME {page}
                </div>
              </div>
              
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={series.length === 0}
                className="group relative flex items-center space-x-2 px-8 py-3 bg-white border-[3px] border-black font-black uppercase italic shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FF00FF] hover:text-white disabled:opacity-30 disabled:shadow-none transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <span>Next Arc</span>
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-32 bg-white border-[4px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] -rotate-1">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4 text-[#FF00FF]">End of Season!</h2>
            <p className="text-xl font-bold text-gray-500">No more episodes found in this archive.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Series;