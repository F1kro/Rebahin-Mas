import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Detail from './pages/Detail';
import PlayerAlternative from './pages/PlayerAlternative';
import { Trending, Search } from './pages/TrendingAndSearch';

function App() {
  return (
    <Router>
      {/* Container utama: 
        - flex flex-col & min-h-screen memastikan layout mengisi seluruh tinggi layar.
        - bg-[#fdf6e3] memberikan warna dasar kertas komik vintage.
      */}
      <div className="flex flex-col min-h-screen bg-[#fdf6e3] text-black selection:bg-yellow-300 selection:text-black">
        
        {/* Navigasi tetap di atas */}
        <Navbar />
        
        {/* Main Area:
          - flex-grow adalah kunci agar area ini "mendorong" footer ke bawah 
            meskipun konten di dalamnya masih loading atau kosong.
        */}
        <main className="flex-grow relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/search" element={<Search />} />
            <Route path="/detail/:slug" element={<Detail />} />
            <Route path="/player" element={<PlayerAlternative />} />
          </Routes>
        </main>
        
        {/* Footer akan selalu anteng di bawah karena didorong oleh flex-grow di atas */}
        <Footer />

        {/* Dekorasi Panel Samping (Opsional untuk mempertegas frame komik) */}
        <div className="fixed top-0 left-0 w-1 h-full bg-black z-[100] hidden lg:block"></div>
        <div className="fixed top-0 right-0 w-1 h-full bg-black z-[100] hidden lg:block"></div>
      </div>
    </Router>
  );
}

export default App;