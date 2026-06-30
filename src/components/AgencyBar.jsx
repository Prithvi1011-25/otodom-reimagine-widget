function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AgencyBar({ agency }) {
  const logoSrc = agency.logo ?? '/agency/metrohouse-logo.png';

  return (
    <div className="ad-agency-bar">
      <div className="ad-agency-bar__inner ad-page-frame">
        <a href="#" className="ad-agency-bar__link">
          <img
            className="ad-agency-bar__logo"
            src={logoSrc}
            alt={agency.brand}
          />
          <span className="ad-agency-bar__name">{agency.name}</span>
          <span className="ad-agency-bar__chevron" aria-hidden>
            <ChevronRight />
          </span>
        </a>
      </div>
    </div>
  );
}
