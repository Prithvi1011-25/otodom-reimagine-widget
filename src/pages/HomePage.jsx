import { Link } from 'react-router-dom';
import { ListingCard } from '../components/ListingCard.jsx';
import { SiteHeader } from '../components/SiteHeader.jsx';
import { LISTINGS } from '../data/listings.js';

export function HomePage() {
  return (
    <div className="app-shell">
      <SiteHeader />

      <main className="home-page">
        <section className="home-page__intro">
          <p className="home-page__badge">ReimagineHome × otodom</p>
          <h1>Apartments for sale</h1>
          <p>
            Browse sample otodom listings with the integrated ReimagineHome widget.
            Select an apartment to open the full listing view.
          </p>
        </section>

        <section className="home-page__grid">
          {LISTINGS.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </section>

        <p className="home-page__back-link">
          <Link to="/">Refresh listings</Link>
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
