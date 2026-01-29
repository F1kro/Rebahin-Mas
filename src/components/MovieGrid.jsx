import MovieCard from './MovieCard';
import Loading from './Loading';

const MovieGrid = ({ movies, loading }) => {
  if (loading) {
    return <Loading />;
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-24 px-4">
        {/* Empty State ala Comic Panel Error */}
        <div className="relative">
          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3"></div>
          <div className="relative bg-white border-[4px] border-black p-10 flex flex-col items-center">
             <div className="text-8xl mb-6 animate-bounce">
               <span className="inline-block transform -rotate-12">🚫</span>
             </div>
             <h2 className="text-4xl font-black uppercase italic tracking-tighter text-black text-center">
               WHAAATT?!
             </h2>
             <p className="mt-2 text-xl font-bold text-[#FF0000] uppercase tracking-widest text-center">
               Gak ada film di sini, sob!
             </p>
             <div className="mt-6 px-4 py-1 bg-yellow-300 border-2 border-black font-black uppercase text-xs rotate-2">
               Coba cari judul lain...
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background Decorative Element (Garis Kecepatan) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}>
      </div>

      {/* Grid Container */}
      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8 p-4">
        {movies.map((movie, index) => (
          <div key={`${movie.url}-${index}`} className={index % 2 === 0 ? 'rotate-1' : '-rotate-1'}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;