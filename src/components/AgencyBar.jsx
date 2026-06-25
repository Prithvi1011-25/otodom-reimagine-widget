function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function AgencyBar({ agency }) {
  return (
    <div className="agency-bar">
      <div className="agency-bar__inner">
        <a href="#" className="agency-bar__link">
          <span
            className="agency-bar__brand"
            style={{ backgroundColor: agency.color }}
          >
            {agency.brand}
          </span>
          <span className="agency-bar__name">{agency.name}</span>
          <ChevronRight />
        </a>
      </div>
    </div>
  );
}
