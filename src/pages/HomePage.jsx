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
          <p className="home-page__badge">ReimagineHome × Otodom</p>
          <h1>Ogłoszenia na sprzedaż</h1>
          <p>
            Przeglądaj przykładowe ogłoszenia Otodom z zintegrowanym widgetem
            ReimagineHome. Wybierz mieszkanie, aby zobaczyć pełny widok
            ogłoszenia.
          </p>
        </section>

        <section className="home-page__grid">
          {LISTINGS.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </section>

        <p className="home-page__back-link">
          <Link to="/">Odśwież listę ogłoszeń</Link>
        </p>
      </main>

      <footer className="otodom-footer">
        <p>© 2026 Otodom · Spółka Grupy OLX</p>
        <div className="otodom-footer__links">
          <a href="#">Regulamin</a>
          <a href="#">Prywatność</a>
          <a href="#">Pliki cookie</a>
          <a href="#">Pomoc</a>
        </div>
      </footer>
    </div>
  );
}
