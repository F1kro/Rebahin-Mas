import { useState, useEffect } from 'react';
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

  // Optimasi: Preconnect ke domain player agar loading lebih cepat
  useEffect(() => {
    if (playerUrl) {
      try {
        const domain = new URL(playerUrl).origin;
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
      } catch (e) {
        console.error("Invalid URL for preconnect");
      }
    }
  }, [playerUrl]);

  const handleFullscreen = async () => {
    const container = document.getElementById('player-container');
    if (container) {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
          if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock();
          }
        } else {
          await container.requestFullscreen();
          if (screen.orientation && screen.orientation.lock) {
            await screen.orientation.lock('landscape').catch(err => {
              console.log("Auto-rotate ignored: ", err);
            });
          }
        }
      } catch (err) {
        console.error('Error:', err);
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
          <h2 className="text-3xl font-black uppercase italic text-black">Invalid Signal!</h2>
          <p className="text-gray-500 font-bold mb-6 uppercase">URL PLAYER TIDAK DITEMUKAN</p>
          <Button onClick={() => navigate(-1)} className="font-black italic uppercase shadow-[4px_4px_0_0_rgba(0,0,0,1)] border-2 border-black">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen transition-colors duration-500", isTheaterMode ? "bg-black" : "bg-[#fdf6e3]")}>
      {/* Navigation Controls Bar */}
      <div className={cn(
        "sticky top-0 z-50 border-b-[4px] border-black transition-all",
        isTheaterMode ? "bg-black border-gray-800" : "bg-white"
      )}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-2 font-black uppercase italic border-black text-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:shadow-none"
          >
            <ArrowLeft className="w-5 h-5 mr-2 text-black" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheaterMode}
              className="p-2 border-2 border-black bg-white text-black hover:bg-yellow-300 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all hidden md:block"
            >
              {isTheaterMode ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
            
            <Button 
              onClick={handleFullscreen} 
              className="font-black italic bg-[#FF0000] text-white border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              <Maximize size={18} className="mr-2" />
              FULLSCREEN
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={cn(
        "mx-auto transition-all duration-500",
        isTheaterMode ? "max-w-full p-0" : "max-w-6xl px-4 py-10"
      )}>
        {/* Player Container dengan Anti-Skip (touch-none) */}
        <div 
          id="player-container" 
          className={cn(
            "relative bg-black border-[6px] border-black overflow-hidden touch-none", 
            isTheaterMode ? "aspect-video border-none shadow-none" : "aspect-video shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]"
          )}
        >
          <iframe
            id="video-player"
            src={playerUrl}
            className="w-full h-full pointer-events-auto"
            frameBorder="0"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-forms allow-presentation"
            title="Video Player"
            loading="eager"
          />
        </div>

        {/* TIPS SECTION: Font lebih besar dan tegas */}
        {!isTheaterMode && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border-[3px] border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rotate-1 text-black">
               <h3 className="font-black uppercase italic text-[#FF0000] text-sm md:text-base mb-2 flex items-center gap-2">
                 <Play size={20} fill="currentColor" /> Pro Tip
               </h3>
               <p className="text-xs md:text-sm font-black leading-tight uppercase tracking-tight">
                 Gunakan Landscape mode untuk layar penuh dan pengalaman menonton maksimal!
               </p>
            </div>

            <div className="bg-[#FFD700] border-[3px] border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] -rotate-1 text-black">
               <h3 className="font-black uppercase italic text-black text-sm md:text-base mb-2 flex items-center gap-2">
                 <AlertCircle size={20} fill="black" /> Anti Skip
               </h3>
               <p className="text-xs md:text-sm font-black leading-tight uppercase tracking-tight">
                 Fitur scroll dimatikan di area video agar menit tidak terloncat saat menyentuh layar!
               </p>
            </div>

            <div className="bg-[#00FFFF] border-[3px] border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rotate-1 text-black">
               <h3 className="font-black uppercase italic text-black text-sm md:text-base mb-2 flex items-center gap-2">
                 <ExternalLink size={20} /> Tab Baru
               </h3>
               <p className="text-xs md:text-sm font-black leading-tight uppercase tracking-tight">
                 Jika player terasa berat atau lemot, klik tombol "Buka Tab Baru" di bagian atas panel.
               </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerAlternative;