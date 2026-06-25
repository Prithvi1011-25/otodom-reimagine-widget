function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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

export function SiteHeader() {
  const navItems = ['Buy', 'Rent', 'Sell', 'Primary market', 'Companies', 'Mortgages'];

  return (
    <header className="otodom-header">
      <div className="otodom-header__inner">
        <div className="otodom-header__left">
          <a href="/" className="otodom-logo" aria-label="otodom" translate="no">
            <span className="otodom-logo__oto">oto</span>
            <span className="otodom-logo__dom">dom</span>
          </a>

          <nav className="otodom-nav" aria-label="Main">
            {navItems.map((label) => (
              <a key={label} href="#" className="otodom-nav__link">
                {label}
                <ChevronDown />
              </a>
            ))}
          </nav>
        </div>

        <div className="otodom-header__right">
          <a href="#" className="otodom-header__account">
            <UserIcon />
            My account
          </a>
          <button type="button" className="otodom-header__cta">
            Post an ad
          </button>
        </div>
      </div>
    </header>
  );
}
