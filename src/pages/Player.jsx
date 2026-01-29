// import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Maximize, AlertTriangle } from 'lucide-react';

const Player = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const playerUrl = searchParams.get('url');

  const handleFullscreen = () => {
    const iframe = document.getElementById('video-player');
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }
  };

  if (!playerUrl) {
    return (
      <div className="min-h-screen bg-[#fdf6e3] flex items-center justify-center p-4">
        <div className="relative p-10 bg-white border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
          <div className="text-[#FF0000] flex justify-center mb-4">
            <AlertTriangle size={64} />
          </div>
          <h2 className="text-3xl font-black uppercase italic mb-2">Signal Lost!</h2>
          <p className="text-gray-600 font-bold mb-6 uppercase tracking-tighter">URL Player Gak Valid, Sob!</p>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-black text-white border-2 border-black font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(255,0,0,1)] hover:bg-[#FF0000] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Abort Mission
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Comic Style Top Bar */}
      <div className="relative z-50 bg-white border-b-[4px] border-black p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 px-6 py-2 bg-[#FF0000] text-white border-[3px] border-black font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Detail</span>
          </button>

          <div className="bg-yellow-300 border-2 border-black px-4 py-1 hidden md:block -rotate-1">
            <span className="font-black uppercase italic text-sm">Now Screening: Action Sequence</span>
          </div>
          
          <button
            onClick={handleFullscreen}
            className="flex items-center space-x-2 px-6 py-2 bg-white text-black border-[3px] border-black font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#00FFFF] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <Maximize className="w-5 h-5" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Video Player Section - The "Epic Panel" */}
      <div className="flex-1 w-full bg-[#1a1a1a] flex items-center justify-center p-2 sm:p-4 md:p-8">
        <div className="relative w-full max-w-6xl aspect-video">
          {/* Border Luar untuk efek kedalaman */}
          <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4"></div>
          
          {/* Iframe Container dengan Border Tebal */}
          <div className="relative w-full h-full border-[4px] md:border-[8px] border-black bg-black overflow-hidden group">
            <iframe
              id="video-player"
              src={playerUrl}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              sandbox="allow-same-origin allow-scripts allow-presentation"
              title="Video Player"
              referrerPolicy="no-referrer"
            />
            
            {/* Speed Lines Overlay (Sangat Tipis) */}
            <div className="absolute inset-0 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity" 
                 style={{backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, #fff 40px, #fff 41px)'}}>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comic Style Footer Info */}
      <div className="bg-white border-t-[4px] border-black p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="bg-black text-white px-4 py-1 font-black uppercase italic text-xs tracking-[0.2em] skew-x-[-10deg]">
            System Alert: AD-Blocker Recommended
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse border border-black"></div>
            <p className="text-[10px] font-black text-black uppercase">
              💡 Jika ada popup, tekan ESC & kembali ke panel kendali ini!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;