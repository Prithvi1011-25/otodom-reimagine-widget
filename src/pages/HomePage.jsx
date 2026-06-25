import { Link, useSearchParams } from 'react-router-dom';
import { ListingCard } from '../components/ListingCard.jsx';
import { SiteHeader } from '../components/SiteHeader.jsx';
import { LISTINGS } from '../data/listings.js';

const INTEGRATIONS = {
  npm: {
    id: 'npm',
    label: 'npm package',
    badge: 'ReimagineHome × otodom · npm',
    description:
      'Listings open with the reimaginehome-widget npm package — configure once, open on demand.',
    listingBasePath: '/listing',
  },
  cdn: {
    id: 'cdn',
    label: 'CDN script embed',
    badge: 'ReimagineHome × otodom · CDN embed',
    description:
      'Listings load widget.js from jsDelivr with data-public-key on the script tag — same UI, CDN integration path.',
    listingBasePath: '/cdn/listing',
  },
};

function getIntegration(mode) {
  return mode === 'cdn' ? INTEGRATIONS.cdn : INTEGRATIONS.npm;
}

export function HomePage({ defaultIntegration = 'npm' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const integrationParam = searchParams.get('integration');
  const active =
    integrationParam === 'cdn' || integrationParam === 'npm'
      ? getIntegration(integrationParam)
      : getIntegration(defaultIntegration);

  const setIntegration = (id) => {
    if (id === 'cdn') {
      setSearchParams({ integration: 'cdn' });
      return;
    }
    setSearchParams({});
  };

  return (
    <div className="app-shell">
      <SiteHeader />

      <main className="home-page">
        <section className="home-page__intro">
          <p className="home-page__badge">{active.badge}</p>
          <h1>Apartments for sale</h1>
          <p>{active.description}</p>

          <div className="home-page__integration" role="tablist" aria-label="Widget integration">
            {Object.values(INTEGRATIONS).map((option) => (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={active.id === option.id}
                className={`home-page__integration-btn${
                  active.id === option.id ? ' home-page__integration-btn--active' : ''
                }`}
                onClick={() => setIntegration(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        <section className="home-page__grid">
          {LISTINGS.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              listingBasePath={active.listingBasePath}
            />
          ))}
        </section>

        <p className="home-page__back-link">
          <Link to={active.id === 'cdn' ? '/?integration=cdn' : '/'}>Refresh listings</Link>
        </p>
      </main>

      <footer className="otodom-footer">
        <p>© 2026 otodom · OLX Group</p>
        <div className="otodom-footer__links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
          <a href="#">Help</a>
        </div>
      </footer>
    </div>
  );
}
