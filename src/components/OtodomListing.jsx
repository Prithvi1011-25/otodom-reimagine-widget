import { Link } from 'react-router-dom';
import { AgencyBar } from './AgencyBar.jsx';
import { GalleryPhoto } from './GalleryPhoto.jsx';
import { ListingContactSidebar } from './ListingContactSidebar.jsx';
import { getWidgetHostCssVars } from '../widgetConfig.js';
import '../listing-gallery.css';

function DetailRow({ label, value }) {
  return (
    <div className="listing-details-table__row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s6-5.2 6-10a6 6 0 10-12 0c0 4.8 6 10 6 10z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.2 10.7l7.6-4.4M8.2 13.3l7.6 4.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20.5l-1.1-1C5.4 14.8 2 11.9 2 8.5 2 6 4 4 6.5 4c1.5 0 3 .8 3.8 2.1C11.1 4.8 12.6 4 14.1 4 16.6 4 18.6 6 18.6 8.5c0 3.4-3.4 6.3-8.9 10.9L12 20.5z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l1.2 3.6L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3zM5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1zM19 14l.5 1.5L21 16l-1.5.5L19 18l-.5-1.5L17 16l1.5-.5L19 14z"
        fill="currentColor"
      />
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

function VideoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 10l5-3v10l-5-3v-4z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function WalkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4l2 4 4 1-3 3 1 4-4-2-4 2-4-1 4 3 3-4-1-2-4z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatPrice(price) {
  const value = Number(String(price).replace(/[\s,]/g, ''));
  if (Number.isNaN(value)) return `${price} zł`;
  return `${value.toLocaleString('pl-PL').replace(/\u00a0/g, ' ')} zł`;
}

function formatPricePerSqm(pricePerSqm) {
  const match = String(pricePerSqm).match(/([\d\s,]+)/);
  if (!match) return pricePerSqm;
  const value = Number(match[1].replace(/[\s,]/g, ''));
  if (Number.isNaN(value)) return pricePerSqm;
  return `${value.toLocaleString('pl-PL').replace(/\u00a0/g, ' ')} zł/m²`;
}

function formatRent(rent) {
  if (!rent) return 'no information';
  if (rent.toLowerCase().includes('/month')) return rent;
  return `${rent}/month`;
}

function getDetailRows(listing) {
  return [
    { label: 'Heating', value: listing.details.heating },
    { label: 'Floor', value: listing.details.floor },
    { label: 'Rent', value: formatRent(listing.rent) },
    { label: 'Finish condition', value: listing.details.condition },
    { label: 'Market', value: listing.details.market },
    { label: 'Form of the ownership', value: listing.details.ownership },
    {
      label: 'Available from',
      value: listing.availableFrom ?? listing.details.availableFrom ?? 'no information',
    },
  ];
}

export function OtodomListing({ listing, onOpenGallery, onContactAdvertiser, widget }) {
  const { openAll, openSingle, hasImages } = widget;

  const hero = listing.media[0];
  const thumbs = listing.media.slice(1, 5);
  const agency = listing.agency ?? {
    brand: 'metrohouse',
    name: 'Metrohouse S.A.',
    color: '#ffd100',
  };

  return (
    <div className="otodom-listing" style={getWidgetHostCssVars()}>
      <AgencyBar agency={agency} />

      <section className="lg">
        <div className="lg__frame">
          <div className="lg__top-controls">
            <Link to="/" className="lg__control-btn">
              <BackIcon />
              Back
            </Link>
            <div className="lg__top-actions">
              <button type="button" className="lg__control-btn">
                <ShareIcon />
                Share
              </button>
              <button type="button" className="lg__control-btn">
                <HeartIcon />
                Save
              </button>
            </div>
          </div>

          <div className="lg__mosaic">
            <div className="lg__hero">
              {hero ? (
                <GalleryPhoto
                  media={hero}
                  label={hero.label}
                  variant="hero"
                  disabled={!hasImages}
                  onOpen={() => openAll()}
                />
              ) : null}

              <div className="lg__action-bar">
                <button
                  type="button"
                  className="lg__action lg__action--primary"
                  disabled={!hasImages}
                  onClick={() => openAll()}
                >
                  <SparkleIcon />
                  Arrange interior
                </button>
                <button type="button" className="lg__action" disabled>
                  <FloorPlanIcon />
                  Floor plan
                </button>
                <button type="button" className="lg__action" disabled>
                  <VideoIcon />
                  Video
                </button>
                <button type="button" className="lg__action" disabled>
                  <WalkIcon />
                  3d walk
                </button>
              </div>
            </div>

            <div className="lg__thumbs">
              {thumbs.map((item, index) => {
                const isLast = index === thumbs.length - 1;

                if (isLast) {
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className="lg__thumb lg__thumb--all"
                      onClick={onOpenGallery}
                      aria-label={`All photos (${listing.media.length})`}
                    >
                      <img src={item.image_url} alt={item.label} />
                      <span className="lg__all-label">
                        All photos ({listing.media.length})
                      </span>
                    </button>
                  );
                }

                return (
                  <div key={item.id} className="lg__thumb">
                    <GalleryPhoto
                      media={item}
                      label={item.label}
                      variant="thumb"
                      disabled={!hasImages}
                      onOpen={() => openSingle(item)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {!hasImages ? (
        <p className="otodom-listing__images-note otodom-listing__content">
          Listing photos will be added soon. Once they are available, Arrange interior will
          open the ReimagineHome widget.
        </p>
      ) : null}

      <div className="otodom-listing__content">
        <div className="otodom-listing__body">
          <div className="otodom-listing__main">
            <section className="listing-hero-info">
              <h1 className="listing-hero-info__title">{listing.title}</h1>
              <div className="listing-hero-info__price-row">
                <p className="listing-hero-info__price">{formatPrice(listing.price)}</p>
                <p className="listing-hero-info__price-meta">
                  {formatPricePerSqm(listing.pricePerSqm)}
                </p>
              </div>
              <p className="listing-hero-info__location">
                <LocationIcon />
                {listing.address}
              </p>

              <div className="listing-ad">
                <span className="listing-ad__label">Reklama</span>
                <a href="#" className="listing-ad__link">
                  <span className="listing-ad__logo" aria-hidden>
                    ING
                  </span>
                  Finansowanie z ING
                </a>
              </div>

              <hr className="listing-divider" />
            </section>

            <section className="listing-details-section">
              <h2 className="listing-details-section__heading">
                {listing.breadcrumbs?.[0] ?? 'Apartment for sale'}
              </h2>
              <dl className="listing-details-table">
                {getDetailRows(listing).map((row) => (
                  <DetailRow key={row.label} label={row.label} value={row.value} />
                ))}
              </dl>
            </section>

            <section className="otodom-panel otodom-panel--description">
              <h2>Description</h2>
              {listing.description.split('\n\n').map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}

              {listing.bullets?.length ? (
                <>
                  <h3>Layout</h3>
                  <ul>
                    {listing.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              <button type="button" className="otodom-link-btn">
                Show more ↓
              </button>
            </section>
          </div>

          <ListingContactSidebar
            listing={listing}
            agency={agency}
            onContactAdvertiser={onContactAdvertiser}
          />
        </div>
      </div>
    </div>
  );
}
