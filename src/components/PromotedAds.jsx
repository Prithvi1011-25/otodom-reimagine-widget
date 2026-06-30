import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ImagePlaceholder } from './ImagePlaceholder.jsx';

function ChevronLeft() {
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

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatPlnPrice(price) {
  const value = Number(String(price).replace(/[\s,]/g, ''));
  if (Number.isNaN(value)) return `${price} zł`;
  return `${value.toLocaleString('pl-PL').replace(/\u00a0/g, ' ')} zł`;
}

function getPromotedLocation(listing) {
  const parts = listing.breadcrumbs?.slice(3);
  if (parts?.length) {
    return parts.join(', ');
  }

  return listing.address;
}

function getPromotedSeller(listing) {
  return { name: null, type: 'Oferta prywatna' };
}

function PromotedCard({ listing }) {
  const hero = listing.media[0];
  const seller = getPromotedSeller(listing);

  return (
    <Link to={`/listing/${listing.slug}`} className="promoted-card">
      <div className="promoted-card__media">
        {hero?.image_url ? (
          <img src={hero.image_url} alt={listing.title} loading="lazy" />
        ) : (
          <ImagePlaceholder label={hero?.label ?? 'Zdjęcie główne'} />
        )}
      </div>

      <div className="promoted-card__body">
        <p className="promoted-card__price">{formatPlnPrice(listing.price)}</p>
        <p className="promoted-card__location">{getPromotedLocation(listing)}</p>
        <p className="promoted-card__seller">
          {seller.name ? (
            <>
              <span>{seller.name}</span>
              <span className="promoted-card__seller-type">{seller.type}</span>
            </>
          ) : (
            <span className="promoted-card__seller-type promoted-card__seller-type--solo">
              {seller.type}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}

export function PromotedAds({ listings }) {
  const trackRef = useRef(null);
  const promoted = listings.slice(0, 8);

  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector('.promoted-card');
    const gap = 16;
    const amount = card ? card.getBoundingClientRect().width + gap : 300;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <section className="promoted-ads">
      <div className="promoted-ads__inner home-page-frame">
        <div className="promoted-ads__header">
          <div className="promoted-ads__title-row">
            <h2>Promowane ogłoszenia</h2>
            <Link to="/" className="promoted-ads__view-all">
              Zobacz Wszystkie
            </Link>
          </div>

          <div className="promoted-ads__nav">
            <button
              type="button"
              className="promoted-ads__nav-btn"
              aria-label="Poprzednie ogłoszenia"
              onClick={() => scroll(-1)}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="promoted-ads__nav-btn"
              aria-label="Następne ogłoszenia"
              onClick={() => scroll(1)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="promoted-ads__track" ref={trackRef}>
          {promoted.map((listing) => (
            <PromotedCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
