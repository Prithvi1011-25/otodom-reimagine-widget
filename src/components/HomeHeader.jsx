import { OtodomLogo } from './OtodomLogo.jsx';

function ChevronDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 6.5A2.5 2.5 0 017.5 4h9A2.5 2.5 0 0119 6.5v7A2.5 2.5 0 0116.5 16H9l-4 3.5V6.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20.5l-1.1-1C5.4 14.8 2 11.9 2 8.5 2 6 4 4 6.5 4c1.5 0 3 .8 3.8 2.1C11.1 4.8 12.6 4 14.1 4 16.6 4 18.6 6 18.6 8.5c0 3.4-3.4 6.3-8.9 10.9L12 20.5z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 20c1.5-3.5 4.5-5 7-5s5.5 1.5 7 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const NAV_ITEMS = ['Kupuję', 'Wynajmuję', 'Sprzedaję', 'Rynek pierwotny', 'Firmy'];

export function HomeHeader() {
  return (
    <header className="home-header">
      <div className="home-header__inner home-page-frame">
        <OtodomLogo className="home-header__logo" />

        <nav className="home-header__nav" aria-label="Główne">
          {NAV_ITEMS.map((label) => (
            <a key={label} href="#" className="home-header__nav-link">
              {label}
              <ChevronDown />
            </a>
          ))}
        </nav>

        <div className="home-header__actions">
          <a href="#" className="home-header__icon" aria-label="Wiadomości">
            <MessageIcon />
          </a>
          <button type="button" className="home-header__profile home-header__profile--fav" aria-label="Ulubione">
            <HeartIcon />
            <ChevronDown />
          </button>
          <button type="button" className="home-header__profile" aria-label="Moje konto">
            <UserIcon />
            <ChevronDown />
          </button>
          <button type="button" className="home-header__cta">
            Dodaj ogłoszenie
          </button>
        </div>
      </div>
    </header>
  );
}
