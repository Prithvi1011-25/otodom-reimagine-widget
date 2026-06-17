export function SiteHeader() {
  const navItems = [
    { label: 'Kupuję', active: true },
    { label: 'Wynajmuję', active: false },
    { label: 'Sprzedaję', active: false },
    { label: 'Rynek pierwotny', active: false },
    { label: 'Dla firm', active: false },
  ];

  return (
    <header className="otodom-header">
      <div className="otodom-header__inner">
        <div className="otodom-header__left">
          <a href="/" className="otodom-logo">
            <span className="otodom-logo__odo">odo</span>
            <span className="otodom-logo__dom">dom</span>
          </a>

          <nav className="otodom-nav">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={item.active ? 'is-active' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="otodom-header__right">
          <a href="#" className="otodom-header__account">
            Moje konto
          </a>
          <button type="button" className="otodom-header__cta">
            + Dodaj ogłoszenie
          </button>
        </div>
      </div>
    </header>
  );
}
