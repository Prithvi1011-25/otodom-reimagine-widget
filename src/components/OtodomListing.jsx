import { Link } from 'react-router-dom';
import { AgencyBar } from './AgencyBar.jsx';
import { GalleryPhoto } from './GalleryPhoto.jsx';
import { ListingContactSidebar } from './ListingContactSidebar.jsx';
import { getWidgetHostCssVars } from '../widgetConfig.js';
import '../listing-page.css';

function DetailRow({ label, value }) {
  return (
    <div className="ad-details-table__row">
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
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="2.75" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="6" cy="12" r="2.75" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="18" cy="19" r="2.75" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M8.5 10.5l7-4M8.5 13.5l7 4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20.5l-1.1-1C5.4 14.8 2 11.9 2 8.5 2 6 4 4 6.5 4c1.5 0 3 .8 3.8 2.1C11.1 4.8 12.6 4 14.1 4 16.6 4 18.6 6 18.6 8.5c0 3.4-3.4 6.3-8.9 10.9L12 20.5z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
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

function FloorPlanIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="5" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 14h8V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
  if (!rent || rent === 'no information') return 'no information';
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
    logo: '/agency/metrohouse-logo.png',
  };

  const detailHeading = listing.breadcrumbs?.[0] ?? 'Mieszkanie na sprzedaż';

  return (
    <div className="ad-listing" style={getWidgetHostCssVars()}>
      <AgencyBar agency={agency} />

      <div className="ad-toolbar">
        <div className="ad-page-frame ad-toolbar__inner">
          <Link to="/" className="ad-toolbar__btn">
            <BackIcon />
            Back
          </Link>
          <div className="ad-toolbar__actions">
            <button type="button" className="ad-toolbar__btn">
              <ShareIcon />
              Share
            </button>
            <button type="button" className="ad-toolbar__btn">
              <HeartIcon />
              Save
            </button>
          </div>
        </div>
      </div>

      <section className="ad-gallery">
        <div className="ad-page-frame">
          <div className="ad-gallery__mosaic">
            <div className="ad-gallery__hero">
              {hero ? (
                <GalleryPhoto
                  media={hero}
                  label={hero.label}
                  variant="hero"
                  disabled={!hasImages}
                  onOpen={() => openAll()}
                />
              ) : null}

              <div className="ad-gallery__action-bar">
                <button
                  type="button"
                  className="ad-gallery__action ad-gallery__action--primary"
                  disabled={!hasImages}
                  onClick={() => openAll()}
                >
                  <SparkleIcon />
                  Design interior
                </button>
                <button type="button" className="ad-gallery__action" disabled>
                  <FloorPlanIcon />
                  Floor plan
                </button>
                <button type="button" className="ad-gallery__action" disabled>
                  <VideoIcon />
                  Video
                </button>
                <button type="button" className="ad-gallery__action" disabled>
                  <WalkIcon />
                  3d walk
                </button>
              </div>
            </div>

            {thumbs.map((item, index) => {
              const isLast = index === thumbs.length - 1;

              if (isLast) {
                return (
                  <div key={item.id} className="ad-gallery__thumb ad-gallery__thumb--all">
                    <img src={item.image_url} alt={item.label} />
                    <button
                      type="button"
                      className="ad-gallery__all-photos-btn"
                      onClick={onOpenGallery}
                      aria-label={`All photos (${listing.media.length})`}
                    >
                      <span className="ad-gallery__thumb-overlay" aria-hidden />
                      <span className="ad-gallery__all-photos">
                        All photos ({listing.media.length})
                      </span>
                    </button>
                  </div>
                );
              }

              return (
                <div key={item.id} className="ad-gallery__thumb">
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
      </section>

      <div className="ad-page-frame ad-listing__columns">
        <div className="ad-listing__main">
          <section className="ad-summary">
            <h1 className="ad-summary__title">{listing.title}</h1>
            <div className="ad-summary__price-row">
              <p className="ad-summary__price">{formatPrice(listing.price)}</p>
              <p className="ad-summary__price-meta">{formatPricePerSqm(listing.pricePerSqm)}</p>
            </div>
            <p className="ad-summary__location">
              <LocationIcon />
              {listing.address}
            </p>

            <hr className="ad-summary__divider" />

            <span className="ad-summary__ad-label">Ad</span>
            <a href="#" className="ad-summary__ad-link">
              <img className="ad-summary__ad-logo" src="/ing-logo.png" alt="ING" />
              Finansowanie z ING
            </a>
          </section>

          <section className="ad-details-card">
            <h2 className="ad-details-card__heading">{detailHeading}</h2>
            <dl className="ad-details-table">
              {getDetailRows(listing).map((row) => (
                <DetailRow key={row.label} label={row.label} value={row.value} />
              ))}
            </dl>

            <h2 className="ad-details-card__description-title">Description</h2>
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

            <button type="button" className="ad-details-card__more">
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
  );
}
