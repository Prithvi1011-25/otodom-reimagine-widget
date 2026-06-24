import { Breadcrumbs } from './Breadcrumbs.jsx';
import { GalleryPhoto } from './GalleryPhoto.jsx';
import { getWidgetHostCssVars } from '../widgetConfig.js';
import '../listing-gallery.css';

function DetailItem({ label, value }) {
  return (
    <div className="otodom-detail">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function renderTitle(title, highlight) {
  if (!highlight || !title.includes(highlight)) {
    return title;
  }

  const [before, after] = title.split(highlight);
  return (
    <>
      {before}
      <em>{highlight}</em>
      {after}
    </>
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

export function OtodomListing({ listing, onOpenGallery, onContactAdvertiser, widget }) {
  const { openAll, openSingle, hasImages } = widget;

  const hero = listing.media[0];
  const thumbs = listing.media.slice(1, 5);

  return (
    <div className="otodom-listing" style={getWidgetHostCssVars()}>
      <section className="otodom-listing__intro">
        <Breadcrumbs crumbs={listing.breadcrumbs} />

        <div className="otodom-listing__headline">
          <div>
            <p className="otodom-listing__offer">
              <span className="otodom-listing__dot" />
              {listing.offerType} · Listing {listing.id}
            </p>

            <h1>
              {renderTitle(listing.title, listing.titleHighlight)}
              {listing.subtitle ? (
                <>
                  <br />
                  {listing.subtitle}
                </>
              ) : null}
            </h1>

            <p className="otodom-listing__address">{listing.address}</p>
          </div>

          <div className="otodom-listing__price-block">
            <p className="otodom-listing__price">{listing.price} PLN</p>
            <p className="otodom-listing__price-meta">{listing.pricePerSqm}</p>
            {listing.priceDrop ? (
              <p className="otodom-listing__price-drop">{listing.priceDrop}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="lg">
        <div className="lg__toolbar">
          <button type="button" className="lg__pill" onClick={onOpenGallery}>
            <CameraIcon />
            Photos ({listing.media.length})
          </button>
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
      </section>

      {!hasImages ? (
        <p className="otodom-listing__images-note">
          Listing photos will be added soon. Once they are available, the
          “Reimagine this space” button will open the ReimagineHome widget.
        </p>
      ) : null}

      <div className="otodom-listing__layout">
        <div className="otodom-listing__main">
          <section className="otodom-panel">
            <div className="otodom-panel__header">
              <h2>Property details</h2>
              <button type="button" className="otodom-link-btn">
                Download brochure ↓
              </button>
            </div>

            <dl className="otodom-details-grid">
              <DetailItem label="Area" value={listing.details.area} />
              <DetailItem label="Rooms" value={listing.details.rooms} />
              <DetailItem label="Floor" value={listing.details.floor} />
              <DetailItem label="Year built" value={listing.details.year} />
              <DetailItem label="Heating" value={listing.details.heating} />
              <DetailItem label="Condition" value={listing.details.condition} />
              <DetailItem label="Market" value={listing.details.market} />
              <DetailItem label="Ownership" value={listing.details.ownership} />
            </dl>
          </section>

          <section className="otodom-panel">
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

        <aside className="otodom-sidebar">
          <div className="otodom-sidebar__price-card">
            <p className="otodom-sidebar__price">{listing.price}</p>
            <p className="otodom-sidebar__price-meta">
              {listing.pricePerSqm} · Service charge {listing.rent}
              {listing.priceDrop ? ` · ${listing.priceDrop}` : ''}
            </p>
          </div>

          <div className="otodom-agent-card">
            <div className="otodom-agent-card__avatar">{listing.agent.initials}</div>
            <div>
              <p className="otodom-agent-card__name">{listing.agent.name}</p>
              <p className="otodom-agent-card__meta">{listing.agent.meta}</p>
            </div>
          </div>

          <button
            type="button"
            className="otodom-btn otodom-btn--primary"
            onClick={onContactAdvertiser}
          >
            Send message
          </button>
          <button type="button" className="otodom-btn otodom-btn--secondary">
            Show phone number
          </button>

          <div className="otodom-mortgage">
            <h3>Estimated mortgage payment</h3>
            <p className="otodom-mortgage__note">
              In partnership with BetterBond · Estimate only, non-binding
            </p>
            <div className="otodom-mortgage__row">
              <span>Property price</span>
              <strong>{listing.price} PLN</strong>
            </div>
            <div className="otodom-mortgage__row">
              <span>Down payment 20%</span>
              <strong>
                {Math.round(
                  Number(listing.price.replace(/[\s,]/g, '')) * 0.2,
                ).toLocaleString('en-US')}{' '}
                PLN
              </strong>
            </div>
            <div className="otodom-mortgage__result">
              <span>Monthly payment</span>
              <strong>8,940 PLN / mo.</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
