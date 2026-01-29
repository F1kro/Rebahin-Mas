import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Maximize, AlertCircle, ExternalLink, Play, Minimize, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

const PlayerAlternative = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const playerUrl = searchParams.get('url');
  const [showWarning, setShowWarning] = useState(true);
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  const handleFullscreen = () => {
    const container = document.getElementById('player-container');
    if (container) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen().catch(err => console.error('Fullscreen error:', err));
      }
    }
  };

  const toggleTheaterMode = () => setIsTheaterMode(!isTheaterMode);
  const openInNewTab = () => window.open(playerUrl, '_blank', 'noopener,noreferrer');

  if (!playerUrl) {
    return (
      <div className="min-h-screen bg-[#fdf6e3] flex items-center justify-center p-6">
        <div className="bg-white border-[4px] border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
          <AlertCircle className="w-16 h-16 text-[#FF0000] mx-auto mb-4" />
          <h2 className="text-3xl font-black uppercase italic">Invalid Signal!</h2>
          <p className="text-gray-500 font-bold mb-6">URL PLAYER TIDAK DITEMUKAN</p>
          <Button onClick={() => navigate(-1)} className="font-black italic uppercase">Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen transition-colors duration-500", isTheaterMode ? "bg-black" : "bg-[#fdf6e3]")}>
      
      {/* Warning Banner - Breaking News Style */}
      {showWarning && (
        <div className="bg-[#FFD700] border-b-[4px] border-black relative z-[60]">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-black text-white px-3 py-1 font-black uppercase italic text-xs animate-pulse">
                System Alert!
              </div>
              <p className="text-sm font-black text-black uppercase tracking-tighter hidden md:block">
                Hati-hati: Sumber eksternal mungkin mengandung iklan/redirect!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={openInNewTab}
                className="bg-white border-2 border-black px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                Buka Tab Baru
              </button>
              <button onClick={() => setShowWarning(false)} className="text-black hover:scale-125 transition-transform">
                <X size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Controls Bar - Solid Neo-Brutalism */}
      <div className={cn(
        "sticky top-0 z-50 border-b-[4px] border-black transition-all",
        isTheaterMode ? "bg-black border-gray-800" : "bg-white"
      )}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-2 font-black uppercase italic"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheaterMode}
              className="p-2 border-2 border-black bg-white hover:bg-yellow-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all hidden md:block"
            >
              {isTheaterMode ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
            
            <Button onClick={openInNewTab} variant="secondary" className="font-black italic">
              <ExternalLink size={18} className="mr-2" />
              TAB BARU
            </Button>
            
            <Button onClick={handleFullscreen} className="font-black italic">
              <Maximize size={18} className="mr-2" />
              FULLSCREEN
            </Button>
          </div>
        </div>
      </div>

      {/* Main Player Area */}
      <div className={cn(
        "mx-auto transition-all duration-500",
        isTheaterMode ? "max-w-full p-0" : "max-w-6xl px-4 py-10"
      )}>
        <div 
          id="player-container" 
          className={cn(
            "relative bg-black border-[6px] border-black overflow-hidden",
            isTheaterMode ? "aspect-video border-none shadow-none" : "aspect-video shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]"
          )}
        >
          <iframe
            id="video-player"
            src={playerUrl}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-forms allow-presentation allow-popups"
            title="Video Player"
          />
        </div>

        {/* Comic Style Tips Section */}
        {!isTheaterMode && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border-[3px] border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
               <h3 className="font-black uppercase italic text-[#FF0000] mb-2 flex items-center gap-2">
                 <Play size={18} fill="currentColor" /> Pro Tip
               </h3>
               <p className="text-xs font-bold leading-tight uppercase">Tekan F11 untuk pengalaman bioskop maksimal!</p>
            </div>

            <div className="bg-white border-[3px] border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
               <h3 className="font-black uppercase italic text-[#00FFFF] mb-2 flex items-center gap-2">
                 <ExternalLink size={18} /> New Window
               </h3>
               <p className="text-xs font-bold leading-tight uppercase">Gunakan Tab Baru jika player terasa berat.</p>
            </div>

            <div className="bg-[#FFD700] border-[3px] border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-2">
               <h3 className="font-black uppercase italic text-black mb-2 flex items-center gap-2">
                 <AlertCircle size={18} fill="black" /> Ads Alert
               </h3>
               <p className="text-xs font-black leading-tight uppercase">Tutup popup segera dan klik play kembali!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerAlternative;