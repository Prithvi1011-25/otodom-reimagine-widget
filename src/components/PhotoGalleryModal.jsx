import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { buildContactMessage } from '../lib/contactMessage.js';
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

function VideoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.2 9.2v5.6l5.2-2.8-5.2-2.8z" fill="currentColor" />
    </svg>
  );
}

function WalkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 5l6.5 3.75v7.5L12 20l-6.5-3.75v-7.5L12 5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M12 5v15M5.5 8.75L12 12.5l6.5-3.75" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M12.1167 7.88345L10.45 3.36678H9.55833L7.89167 7.88345L3.375 9.55011V10.4418L7.89167 12.1084L9.55833 16.6251H10.45L12.1167 12.1084L16.6333 10.4418V9.55011L12.1167 7.88345Z"
        fill="currentColor"
      />
      <path
        d="M16.2083 3.80008L15.4167 1.66675L14.625 3.80008L12.5 4.58341L14.625 5.37508L15.4167 7.50008L16.2083 5.37508L18.3333 4.58341L16.2083 3.80008Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.6 10.8a13.4 13.4 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11 11 0 003.5.56 1 1 0 011 1V20a1 1 0 01-1 1A16 16 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11 11 0 00.56 3.5 1 1 0 01-.25 1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function buildDefaultMessage(listing) {
  return buildContactMessage(listing);
}

export function PhotoGalleryModal({
  media,
  listing,
  isOpen,
  onClose,
  onContactAdvertiser,
  widget,
}) {
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

  const hero = media[0];
  const rest = media.slice(1);
  const agent = listing?.agent ?? {};
  const agency = listing?.agency ?? {};

  return createPortal(
    <div className="pgm" role="presentation">
      <header className="pgm__toolbar">
        <button type="button" className="pgm__back" aria-label="Back" onClick={onClose}>
          <BackIcon />
          Back
        </button>

        <div className="pgm__actions">
          <button type="button" className="pgm__icon-btn" aria-label="Share">
            <ShareIcon />
          </button>
          <button type="button" className="pgm__icon-btn" aria-label="Add to favorites">
            <HeartIcon />
          </button>
        </div>
      </header>

      <div className="pgm__scroll">
        <div className="pgm__container">
          <div className="pgm__tabs">
            <button type="button" className="pgm__tab pgm__tab--active">
              <CameraIcon />
              Photos ({media.length})
            </button>
            <button type="button" className="pgm__tab" disabled>
              <FloorPlanIcon />
              Floor plan
            </button>
            <button type="button" className="pgm__tab" disabled>
              <VideoIcon />
              Video
            </button>
            <button type="button" className="pgm__tab" disabled>
              <WalkIcon />
              3d walk
            </button>
          </div>

          <h2 className="pgm__heading">Photos</h2>

          <div className="pgm__layout">
            <div className="pgm__main">
              {hero ? (
                <div className="pgm__hero">
                  <button
                    type="button"
                    className="pgm__tile-btn"
                    onClick={() => setLightboxIndex(0)}
                    aria-label="Open photo 1"
                  >
                    <img src={hero.image_url} alt={hero.label} />
                  </button>
                </div>
              ) : null}

              {hasImages ? (
                <div className="pgm__promo">
                  <span className="pgm__promo-icon" aria-hidden>
                    <SparkleIcon />
                  </span>
                  <div className="pgm__promo-text">
                    <p className="pgm__promo-title">
                      Want to see how this home can reflect your style?
                    </p>
                    <p className="pgm__promo-sub">
                      Try our virtual interior designer to discover different styles for
                      this space in seconds.
                    </p>
                  </div>
                  <button type="button" className="pgm__promo-btn" onClick={handleOpenAll}>
                    Arrange interior
                  </button>
                </div>
              ) : null}

              <div className="pgm__grid">
                {rest.map((item, index) => {
                  const realIndex = index + 1;
                  return (
                    <div key={item.id} className="pgm__tile">
                      <button
                        type="button"
                        className="pgm__tile-btn"
                        onClick={() => setLightboxIndex(realIndex)}
                        aria-label={`Open photo ${realIndex + 1}`}
                      >
                        <img src={item.image_url} alt={item.label} loading="lazy" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="pgm__sidebar">
              <div className="pgm__card">
                <div className="pgm__agent">
                  {agent.photo ? (
                    <img className="pgm__avatar" src={agent.photo} alt={agent.name} />
                  ) : (
                    <div className="pgm__avatar pgm__avatar--fallback" aria-hidden>
                      {agent.initials}
                    </div>
                  )}
                  <div className="pgm__agent-info">
                    <p className="pgm__agent-name">{agent.name}</p>
                    <p className="pgm__agent-company">{agent.company ?? agency.name}</p>
                    <button type="button" className="pgm__phone-btn">
                      <PhoneIcon />
                      Show phone
                    </button>
                  </div>
                </div>

                <form className="pgm__form" onSubmit={(e) => e.preventDefault()}>
                  <label className="pgm__field">
                    <span className="pgm__label">Name*</span>
                    <input type="text" placeholder="Type your name" />
                  </label>

                  <label className="pgm__field">
                    <span className="pgm__label">E-mail*</span>
                    <input type="email" placeholder="Type your e-mail" />
                  </label>

                  <label className="pgm__field">
                    <span className="pgm__label">Phone number*</span>
                    <div className="pgm__phone">
                      <select defaultValue="+48" aria-label="Country code">
                        <option value="+48">+48</option>
                      </select>
                      <input type="tel" placeholder="Type your phone number" />
                    </div>
                  </label>

                  <label className="pgm__field">
                    <span className="pgm__label">Your message</span>
                    <textarea rows={4} defaultValue={buildDefaultMessage(listing)} />
                  </label>

                  <p className="pgm__legal">
                    The controller of your personal data is Grupa OLX Sp. z o.o. You can
                    find more information in our Privacy Policy.
                  </p>

                  <button type="submit" className="pgm__submit" onClick={onContactAdvertiser}>
                    Send message
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {active ? (
        <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label="Photo preview">
          <button
            type="button"
            className="photo-lightbox__backdrop"
            aria-label="Back to gallery"
            onClick={() => setLightboxIndex(null)}
          />

          <div className="photo-lightbox__content">
            <button
              type="button"
              className="photo-lightbox__close"
              aria-label="Back to gallery"
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
              aria-label="Previous photo"
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
              aria-label="Next photo"
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
