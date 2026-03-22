export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ')
}

const pickFirstTruthy = (item, keys) => {
  if (!item || typeof item !== 'object') return undefined;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(item, key) && item[key] !== undefined && item[key] !== null) {
      return item[key];
    }
  }
  return undefined;
};

export const pickImage = (item) => pickFirstTruthy(item, [
  'thumbnail',
  'thumb',
  'poster',
  'poster_image',
  'image',
  'cover',
  'backdrop',
  'posterUrl',
  'poster_url'
]);

export const pickTitle = (item) => pickFirstTruthy(item, [
  'title',
  'name',
  'judul',
  'original_title',
  'display_title'
]) ?? 'Untitled';

export const pickDetailPath = (item) => pickFirstTruthy(item, [
  'detailPath',
  'slug',
  'url',
  'id',
  'pid',
  'path'
]);

export const pickSynopsis = (item) => pickFirstTruthy(item, [
  'synopsis',
  'description',
  'overview',
  'storyline',
  'plot'
]) ?? '';

export const pickPlayerUrl = (item) => pickFirstTruthy(item, [
  'player_url',
  'playerUrl',
  'stream_url',
  'streamUrl',
  'video_url',
  'videoUrl',
  'file',
  'url',
  'link'
]);

const castNameKeys = ['name', 'actor', 'title', 'castName', 'nama', 'role', 'character'];

const resolveNestedName = (value) => {
  if (!value) return null;
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'object') {
    const nested = pickFirstTruthy(value, castNameKeys);
    if (typeof nested === 'string') return nested.trim();
  }
  return null;
};

export const pickCastNames = (entries) => {
  if (!Array.isArray(entries)) return [];
  return entries
    .map(entry => resolveNestedName(pickFirstTruthy(entry, castNameKeys)))
    .filter(Boolean);
};

const flattenSeasonEpisodes = (seasonValue, episodes = []) => {
  const seasonId = Number.isFinite(Number(seasonValue))
    ? Number(seasonValue)
    : Number(seasonValue ?? 1);
  return (episodes || []).map((episode) => ({
    ...episode,
    season: episode.season ?? seasonId
  }));
};

const collectSeasonArray = (detail) => {
  if (!detail) return null;
  if (Array.isArray(detail.seasons)) {
    return detail.seasons.flatMap((season) =>
      flattenSeasonEpisodes(
        season?.season ?? season?.seasonNumber ?? season?.season_id ?? 1,
        season?.episodes ?? season?.episode_list ?? []
      )
    );
  }
  return null;
};

const directEpisodeKeys = ['episodes', 'episode_list', 'episodeList', 'chapters', 'chapter'];

export const pickEpisodes = (detail) => {
  if (!detail || typeof detail !== 'object') return [];

  const fromSeasons = collectSeasonArray(detail);
  if (fromSeasons) return fromSeasons;

  for (const key of directEpisodeKeys) {
    const value = detail[key];
    if (Array.isArray(value) && value.length) {
      return value;
    }
    if (Array.isArray(value?.episodes)) {
      return flattenSeasonEpisodes(
        value?.season ?? value?.seasonNumber ?? value?.season_id ?? 1,
        value.episodes
      );
    }
  }

  if (Array.isArray(detail.data)) {
    return detail.data.flatMap(item => pickEpisodes(item)).filter(Boolean);
  }

  if (Array.isArray(detail.season?.episodes)) {
    return flattenSeasonEpisodes(
      detail.season?.season ?? detail.season?.seasonNumber ?? 1,
      detail.season.episodes
    );
  }

  if (Array.isArray(detail.episodeGroups)) {
    return detail.episodeGroups.flatMap(group => pickEpisodes(group)).filter(Boolean);
  }

  return [];
};
