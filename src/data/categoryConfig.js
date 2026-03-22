import {
  Sparkles,
  MonitorPlay,
  Tv2,
  Globe,
  Mic2,
  SmilePlus
} from 'lucide-react';

export const CATEGORY_PAGES = [
  {
    key: 'k-drama',
    path: '/k-drama',
    name: 'K-Drama',
    action: 'kdrama',
    title: 'K-Drama Spotlight',
    subtitle: 'Fresh Korean series and films straight from the industry.',
    accent: '#FF00FF',
    badge: 'KOREAN',
    icon: Sparkles
  },
  {
    key: 'short-tv',
    path: '/short-tv',
    name: 'Short TV',
    action: 'short-tv',
    title: 'Short TV Hits',
    subtitle: 'Bite-sized serials built for quick binges.',
    accent: '#00BFAF',
    badge: 'SHORT TV',
    icon: MonitorPlay
  },
  {
    key: 'anime',
    path: '/anime',
    name: 'Anime',
    action: 'anime',
    title: 'Anime Universe',
    subtitle: 'Latest anime releases with crisp subtitles.',
    accent: '#FF4500',
    badge: 'ANIME',
    icon: Tv2
  },
  {
    key: 'adult-comedy',
    path: '/adult-comedy',
    name: 'Canda Dewasa',
    action: 'adult-comedy',
    title: 'Canda Dewasa',
    subtitle: 'Komedi gede untuk penonton dewasa.',
    accent: '#FFD700',
    badge: 'R-RATED',
    icon: SmilePlus
  },
  {
    key: 'western-tv',
    path: '/western-tv',
    name: 'Western TV',
    action: 'western-tv',
    title: 'Western TV',
    subtitle: 'Serial Barat klasik dan modern.',
    accent: '#1E90FF',
    badge: 'WESTERN',
    icon: Globe
  },
  {
    key: 'indo-dub',
    path: '/indo-dub',
    name: 'Indo Dub',
    action: 'indo-dub',
    title: 'Indo Dub',
    subtitle: 'Konten dengan dubbing Indonesia siap tayang.',
    accent: '#FF5722',
    badge: 'DUBBED',
    icon: Mic2
  }
];
