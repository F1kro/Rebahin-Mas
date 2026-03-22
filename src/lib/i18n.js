import { useLanguage } from '../contexts/LanguageContext';

export const TRANSLATIONS = {
  en: {
    home: 'Home',
    movies: 'Movies',
    series: 'Series',
    trending: 'Trending',
    search: 'Search',
    watchNow: 'Watch Now',
    details: 'Details',
    newArrivals: 'New Arrivals',
    trendingNow: 'Trending Now',
    seeAll: 'See All',
    limitedOffer: 'Limited Time Offer!',
    exploreMovies: 'Explore Movies',
    findSeries: 'Search Series',
    quickSearch: 'Quick Search',
    searchPlaceholder: 'Search for titles...',
    selectGenre: 'Select Genre',
    prevEpisode: 'Previous Episode',
    nextEpisode: 'Next Episode',
    season: 'Season',
    languageToggle: 'EN/ID',
    themeToggle: 'Theme',
    backText: 'Back'
  },
  id: {
    home: 'Beranda',
    movies: 'Film',
    series: 'Serial',
    trending: 'Trending',
    search: 'Cari',
    watchNow: 'Tonton Sekarang',
    details: 'Detail',
    newArrivals: 'Rilisan Baru',
    trendingNow: 'Sedang Trending',
    seeAll: 'Lihat Semua',
    limitedOffer: 'Penawaran Terbatas!',
    exploreMovies: 'Jelajahi Film',
    findSeries: 'Cari Serial',
    quickSearch: 'Cari Cepat',
    searchPlaceholder: 'Cari judul...',
    selectGenre: 'Pilih Genre',
    prevEpisode: 'Episode Sebelumnya',
    nextEpisode: 'Episode Berikutnya',
    season: 'Season',
    languageToggle: 'ID/EN',
    themeToggle: 'Mode Warna',
    backText: 'Kembali'
  }
};

export const useTranslation = () => {
  const { language } = useLanguage();
  return (key) => {
    return TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  };
};
