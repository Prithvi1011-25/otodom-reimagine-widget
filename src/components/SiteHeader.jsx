export function SiteHeader() {
  const navItems = [
    { label: 'Buy', active: true },
    { label: 'Rent', active: false },
    { label: 'Sell', active: false },
    { label: 'Primary market', active: false },
    { label: 'For business', active: false },
  ];

  return (
    <header className="otodom-header">
      <div className="otodom-header__inner">
        <div className="otodom-header__left">
          <a href="/" className="otodom-logo" aria-label="otodom" translate="no">
            <span className="otodom-logo__oto">oto</span>
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
            My account
          </a>
          <button type="button" className="otodom-header__cta">
            + Add listing
          </button>
        </div>
      </div>
    </header>
  );
}
