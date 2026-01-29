import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Film, Tv, TrendingUp, Home, Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // Pastikan variabel ini yang digunakan di seluruh komponen
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false); // Tutup menu setelah search
    }
  };

  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Movies', path: '/movies', icon: Film },
    { name: 'Series', path: '/series', icon: Tv },
    { name: 'Trending', path: '/trending', icon: TrendingUp },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-[4px] border-black shadow-[0_4px_0_0_rgba(0,0,0,1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-black translate-x-1 translate-y-1"></div>
              <div className="relative w-12 h-12 bg-[#FF0000] border-2 border-black flex items-center justify-center transform group-hover:-rotate-6 transition-transform">
                <Film className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="flex flex-col text-black">
              <span className="text-2xl font-black uppercase italic tracking-tighter leading-none group-hover:text-[#FF0000] transition-colors">
                REBAHIN-MAS
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-yellow-300 border border-black px-1 mt-1 self-start">
                By Masfiq
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 border-2 font-black uppercase italic text-sm transition-all",
                    isActive 
                      ? "bg-black text-white border-black -translate-y-1 shadow-[4px_4px_0_0_rgba(255,0,0,1)]" 
                      : "border-transparent text-black hover:bg-black hover:text-white hover:border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(255,0,0,1)]"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:block text-black">
            <div className="relative group">
              <div className="absolute inset-0 bg-black translate-x-1 translate-y-1"></div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari aksi seru..."
                className="relative w-64 px-4 py-2 pl-10 bg-white border-2 border-black font-bold text-sm focus:outline-none focus:bg-yellow-50 placeholder:text-gray-500"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-black font-bold" />
            </div>
          </form>

          {/* Mobile Menu Button - Menggunakan isMobileMenuOpen */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 border-2 border-black bg-[#FFD700] shadow-[3px_3px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - SEARCH NYA DISINI JIR! */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t-[4px] border-black bg-[#fdf6e3] animate-in slide-in-from-top duration-300 shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)]">
          <div className="px-4 py-8 space-y-8">
            
            {/* SEARCH BOX MOBILE - Besar & Mencolok */}
            <div className="relative">
              <h3 className="font-black uppercase italic text-[10px] mb-2 ml-1 text-gray-500 tracking-widest">
                Quick Search:
              </h3>
              <form onSubmit={handleSearch} className="relative group">
                {/* Shadow Box di belakang input */}
                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2"></div>
                
                {/* Input Container */}
                <div className="relative flex items-center bg-white border-[3px] border-black">
                  <div className="pl-4">
                    <Search className="w-5 h-5 text-black" strokeWidth={3} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="JUDUL FILM / SERIES..."
                    className="w-full px-4 py-4 font-black uppercase italic text-sm focus:outline-none placeholder:text-gray-400 bg-transparent text-black"
                  />
                  {/* Tombol GO! biar makin asik */}
                  <button 
                    type="submit" 
                    className="bg-[#FFD700] border-l-[3px] border-black px-6 py-4 font-black uppercase italic text-xs hover:bg-[#FF0000] hover:text-white transition-colors active:bg-black"
                  >
                    GO!
                  </button>
                </div>
              </form>
            </div>
      
            {/* Grid Menu Navigasi */}
            <div className="space-y-3">
              <h3 className="font-black uppercase italic text-[10px] ml-1 text-gray-500 tracking-widest">
                Navigation:
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 p-4 border-[3px] border-black font-black uppercase italic shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-1 active:translate-y-1",
                        isActive ? "bg-[#FF0000] text-white shadow-none translate-x-1 translate-y-1" : "bg-white text-black"
                      )}
                    >
                      <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-[#FF0000]")} />
                      <span className="text-xs">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;