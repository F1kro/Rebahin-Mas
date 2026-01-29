import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import EpisodeList from '../components/EpisodeList';
import Loading from '../components/Loading'; // Pastikan pakai komponen Loading comic kita
import { Star, Calendar, Globe, Play, ArrowLeft } from 'lucide-react';

const Detail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      const response = await api.getDetail(slug);
      if (response.success) {
        setDetail(response.data);
      }
      setLoading(false);
    };
    fetchDetail();
  }, [slug]);

  const handlePlayMovie = () => {
    if (detail?.player_url) {
      navigate(`/player?url=${encodeURIComponent(detail.player_url)}`);
    }
  };

  const handleEpisodeSelect = (episode) => {
    if (episode?.player_url) {
      navigate(`/player?url=${encodeURIComponent(episode.player_url)}`);
    }
  };

  if (loading) return <Loading />;

  if (!detail) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-white flex items-center justify-center">
        <div className="relative p-10 bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-2xl font-black uppercase italic tracking-tighter">Content Missing!</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2 bg-[#FF0000] text-white border-2 border-black font-bold uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isSeries = detail.episodes && detail.episodes.length > 0;
  const hasPlayerUrl = detail.player_url;

  return (
    <div className="min-h-screen bg-[#fdf6e3] text-black">
      {/* Hero / Backdrop ala Splash Page */}
      <div className="relative h-[350px] md:h-[450px] overflow-hidden border-b-[6px] border-black">
        <div className="absolute inset-0">
          <img
            src={detail.thumbnail}
            alt={detail.title}
            className="w-full h-full object-cover blur-[2px] opacity-40 scale-105"
          />
          {/* Halftone Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(black 1px, transparent 0)', backgroundSize: '10px 10px' }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdf6e3] via-transparent to-transparent"></div>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start pt-24">
          <button
            onClick={() => navigate(-1)}
            className="group relative px-6 py-2 bg-white border-[3px] border-black font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 transition-all active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            <div className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content Card Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Poster & Quick Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-black translate-x-3 translate-y-3"></div>
              <img
                src={detail.thumbnail}
                alt={detail.title}
                className="relative w-full border-[4px] border-black transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1"
              />
            </div>
            
            {/* Quick Metadata Box */}
            <div className="bg-white border-[3px] border-black p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-3">
              <div className="flex items-center justify-between border-b-2 border-dashed border-gray-300 pb-2">
                <span className="font-black text-xs uppercase tracking-widest text-gray-500">Rating</span>
                <span className="font-black text-lg text-[#FF0000] italic">★ {detail.rating || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between border-b-2 border-dashed border-gray-300 pb-2">
                <span className="font-black text-xs uppercase tracking-widest text-gray-500">Year</span>
                <span className="font-bold">{detail.year || 'Unknown'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-black text-xs uppercase tracking-widest text-gray-500">Region</span>
                <span className="font-bold">{detail.country || 'Global'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title & Story */}
          <div className="lg:col-span-2">
            <div className="bg-white border-[4px] border-black p-6 md:p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
              {/* Badge Series/Movie */}
              <div className={`inline-block px-4 py-1 mb-4 border-2 border-black font-black uppercase tracking-tighter -rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                isSeries ? 'bg-[#FF00FF] text-white' : 'bg-[#00FFFF] text-black'
              }`}>
                {isSeries ? 'SERIES' : 'MOVIE'}
              </div>

              <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9] mb-6 drop-shadow-[4px_4px_0px_rgba(255,0,0,1)]">
                {detail.title}
              </h1>

              {/* Genre Chips ala Sticker */}
              {detail.genres && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {detail.genres.map((genre, index) => (
                    <span key={index} className="px-3 py-1 bg-yellow-300 border-2 border-black font-black text-xs uppercase rotate-1 hover:rotate-0 transition-transform">
                      #{genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Synopsis Box */}
              <div className="relative mb-8">
                <h2 className="text-2xl font-black uppercase italic mb-4 flex items-center gap-2">
                  <span className="w-8 h-2 bg-[#FF0000]"></span> The Story
                </h2>
                <div className="p-4 bg-gray-50 border-l-[6px] border-black italic font-medium leading-relaxed text-gray-800">
                  {detail.synopsis}
                </div>
              </div>

              {/* Cast List */}
              {detail.cast && (
                <div className="mb-10">
                   <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-2">Pemeran:</h3>
                   <p className="font-bold text-black border-2 border-black bg-white p-3 inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                     {detail.cast.join(' • ')}
                   </p>
                </div>
              )}

              {/* Final Action Button */}
              {hasPlayerUrl && !isSeries && (
                <button
                  onClick={handlePlayMovie}
                  className="group relative flex items-center space-x-4 px-10 py-5 bg-[#FF0000] text-white border-[4px] border-black font-black uppercase italic text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all w-full md:w-auto justify-center"
                >
                  <Play className="w-8 h-8" fill="currentColor" />
                  <span>Start Watching</span>
                </button>
              )}
            </div>

            {/* Episode Section for Series (Outside the white box for more space) */}
            {isSeries && (
              <div className="mt-12 bg-black text-white p-8 border-[4px] border-black shadow-[10px_10px_0px_0px_rgba(255,0,0,1)]">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-8 text-[#FFD700]">
                  Select Episode
                </h2>
                <EpisodeList episodes={detail.episodes} onEpisodeSelect={handleEpisodeSelect} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;