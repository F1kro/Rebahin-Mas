import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Cek posisi scroll untuk menampilkan/menyembunyikan tombol
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 group flex flex-col items-center animate-in fade-in zoom-in duration-300"
    >
      {/* Label "UP!" ala Komik */}
      <span className="mb-[-10px] bg-black text-white text-[10px] font-black px-2 py-0.5 border-2 border-black rotate-[-5deg] z-10 group-hover:rotate-0 transition-transform">
        UP!
      </span>
      
      {/* Icon Button Body */}
      <div className="relative">
        {/* Shadow kaku di belakang */}
        <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
        
        {/* Tombol Utama */}
        <div className="relative p-3 bg-[#FF00FF] border-[3px] border-black text-white hover:bg-[#FFD700] hover:text-black transition-colors active:translate-x-0.5 active:translate-y-0.5">
          <ChevronUp size={28} strokeWidth={4} />
        </div>
      </div>
      
      {/* Dekorasi Garis Kecepatan di bawah tombol */}
      <div className="mt-1 flex gap-1 opacity-50">
        <div className="w-1 h-3 bg-black skew-x-12"></div>
        <div className="w-1 h-3 bg-black skew-x-12"></div>
      </div>
    </button>
  );
};

export default ScrollToTopButton;