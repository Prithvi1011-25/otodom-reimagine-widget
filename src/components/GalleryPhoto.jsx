import { ImagePlaceholder } from './ImagePlaceholder.jsx';

export function GalleryPhoto({
  media,
  label,
  variant = 'hero',
  onOpen,
  disabled = false,
}) {
  const hasImage = Boolean(media.image_url);
  const isHero = variant === 'hero';

  return (
    <div className={`gallery-photo gallery-photo--${variant}`}>
      {hasImage ? (
        <img src={media.image_url} alt={label} className="gallery-photo__img" />
      ) : (
        <ImagePlaceholder label={label} />
      )}

      <button
        type="button"
        className="gallery-photo__btn"
        disabled={disabled || !hasImage}
        onClick={(e) => {
          e.stopPropagation();
          onOpen(media);
        }}
      >
        {isHero ? 'Reimagine this space →' : 'Reimagine →'}
      </button>
    </div>
  );
}
