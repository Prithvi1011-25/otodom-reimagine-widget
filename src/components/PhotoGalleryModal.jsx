import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import '../photo-gallery-modal.css';

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 8h3l1.5-2h7L17 8h3a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function FloorPlanIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.2 10.7l7.6-4.4M8.2 13.3l7.6 4.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20.5l-1.1-1C5.4 14.8 2 11.9 2 8.5 2 6 4 4 6.5 4c1.5 0 3 .8 3.8 2.1C11.1 4.8 12.6 4 14.1 4 16.6 4 18.6 6 18.6 8.5c0 3.4-3.4 6.3-8.9 10.9L12 20.5z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ReimagineIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1zM19 14l.5 1.5L21 16l-1.5.5L19 18l-.5-1.5L17 16l1.5-.5L19 14z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getTileSize(index) {
  const pos = index % 6;
  if (pos === 0) return 'full';
  if (pos <= 2) return 'half';
  return 'third';
}

function buildDefaultMessage(listing) {
  const type = listing?.offerType?.includes('wynajem') ? 'wynajmu' : 'sprzedaży';
  return `To ogłoszenie o ${type} mieszkania przyciągnęło moją uwagę. Proszę o więcej szczegółów. Z niecierpliwością oczekuję na wiadomość.`;
}

export function PhotoGalleryModal({ media, listing, isOpen, onClose, widget }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { openAll, openSingle, hasImages } = widget;

  const handleOpenAll = () => {
    setLightboxIndex(null);
    openAll();
  };

  const handleOpenSingle = (item) => {
    setLightboxIndex(null);
    openSingle(item);
  };

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      setLightboxIndex(null);
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxIndex, onClose]);

  if (!isOpen || media.length === 0) {
    return null;
  }

  const active = lightboxIndex !== null ? media[lightboxIndex] : null;

  return createPortal(
    <div className="pgm" role="presentation">
      <header className="pgm__toolbar">
        <button type="button" className="pgm__back" aria-label="Wróć" onClick={onClose}>
          <BackIcon />
        </button>

        <div className="pgm__tabs">
          <button type="button" className="pgm__tab pgm__tab--active">
            <CameraIcon />
            Zdjęcia ({media.length})
          </button>
          {hasImages ? (
            <button
              type="button"
              className="pgm__tab pgm__tab--reimagine"
              onClick={handleOpenAll}
            >
              <ReimagineIcon />
              Zaaranżuj tę przestrzeń
            </button>
          ) : null}
          <button type="button" className="pgm__tab" disabled>
            <FloorPlanIcon />
            Rzut
          </button>
        </div>

        <div className="pgm__actions">
          <button type="button" className="pgm__icon-btn" aria-label="Udostępnij">
            <ShareIcon />
          </button>
          <button type="button" className="pgm__icon-btn" aria-label="Dodaj do ulubionych">
            <HeartIcon />
          </button>
        </div>
      </header>

      <div className="pgm__body">
        <div className="pgm__grid-wrap">
          <div className="pgm__grid">
            {media.map((item, index) => (
              <div
                key={item.id}
                className={`pgm__tile pgm__tile--${getTileSize(index)}`}
              >
                <button
                  type="button"
                  className="pgm__tile-btn"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Otwórz zdjęcie ${index + 1}`}
                >
                  <img src={item.image_url} alt={item.label} loading="lazy" />
                </button>

                {hasImages ? (
                  <button
                    type="button"
                    className="pgm__reimagine"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenSingle(item);
                    }}
                  >
                    Zaaranżuj tę przestrzeń →
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <aside className="pgm__sidebar">
          <form className="pgm__form" onSubmit={(e) => e.preventDefault()}>
            <label className="pgm__field">
              <span className="pgm__label">E-mail*</span>
              <input type="email" defaultValue="prithvi@styldod.com" />
            </label>

            <label className="pgm__field">
              <span className="pgm__label">Numer telefonu*</span>
              <div className="pgm__phone">
                <select defaultValue="+48" aria-label="Kod kraju">
                  <option value="+48">+48</option>
                </select>
                <input type="tel" placeholder="" />
              </div>
            </label>

            <label className="pgm__field">
              <span className="pgm__label">Twoja wiadomość*</span>
              <textarea
                rows={5}
                defaultValue={buildDefaultMessage(listing)}
              />
            </label>

            <p className="pgm__legal">
              Administratorem Twoich danych osobowych jest Grupa OLX Sp. z o.o. Więcej
              informacji o przetwarzaniu danych osobowych znajdziesz w naszej Polityce
              prywatności.
            </p>

            <button type="submit" className="pgm__submit">
              Wyślij wiadomość
            </button>
          </form>
        </aside>
      </div>

      {active ? (
        <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label="Podgląd zdjęcia">
          <button
            type="button"
            className="photo-lightbox__backdrop"
            aria-label="Wróć do galerii"
            onClick={() => setLightboxIndex(null)}
          />

          <div className="photo-lightbox__content">
            <button
              type="button"
              className="photo-lightbox__close"
              aria-label="Wróć do galerii"
              onClick={() => setLightboxIndex(null)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button
              type="button"
              className="photo-lightbox__nav photo-lightbox__nav--prev"
              aria-label="Poprzednie zdjęcie"
              onClick={() =>
                setLightboxIndex((index) => (index - 1 + media.length) % media.length)
              }
            >
              ‹
            </button>

            <figure className="photo-lightbox__figure">
              <img src={active.image_url} alt={active.label} />
              <figcaption>
                {lightboxIndex + 1} / {media.length}
              </figcaption>
            </figure>

            <button
              type="button"
              className="photo-lightbox__nav photo-lightbox__nav--next"
              aria-label="Następne zdjęcie"
              onClick={() =>
                setLightboxIndex((index) => (index + 1) % media.length)
              }
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </div>,
    document.body,
  );
}
