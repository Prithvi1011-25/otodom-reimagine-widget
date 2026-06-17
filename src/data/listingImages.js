const imageModules = import.meta.glob('../assets/listings/**/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function buildMedia(slug) {
  const prefix = `../assets/listings/${slug}/`;

  return Object.entries(imageModules)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, url], index) => {
      const number = index + 1;

      return {
        id: `photo-${number}`,
        label: `Zdjęcie ${number}`,
        image_url: url,
      };
    });
}
