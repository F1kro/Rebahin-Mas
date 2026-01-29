import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Detail from './pages/Detail';
import PlayerAlternative from './pages/PlayerAlternative';
import { Trending, Search } from './pages/TrendingAndSearch';
import ScrollToTop from './components/ScrollToTop'; 
import ScrollToTopButton from './components/ScrollToTopButton'; 

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#fdf6e3] text-black selection:bg-yellow-300 selection:text-black">
        <Navbar />
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
        <ScrollToTopButton />
        <Footer />
        <div className="fixed top-0 left-0 w-1 h-full bg-black z-[100] hidden lg:block"></div>
        <div className="fixed top-0 right-0 w-1 h-full bg-black z-[100] hidden lg:block"></div>
      </div>
    </Router>
  );
}

export default App;