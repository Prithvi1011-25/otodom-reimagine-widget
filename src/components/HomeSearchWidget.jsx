import { useState } from 'react';

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function RangeInput({ placeholder, unit, label }) {
  return (
    <label className="home-search__range-field">
      <span className="visually-hidden">{label}</span>
      <input type="text" placeholder={placeholder} />
      <span className="home-search__range-unit">{unit}</span>
    </label>
  );
}

export function HomeSearchWidget() {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div className="home-search">
      <div className="home-search__tabs" role="tablist" aria-label="Typ wyszukiwania">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'search'}
          className={`home-search__tab${activeTab === 'search' ? ' home-search__tab--active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Szukaj
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'developer'}
          className={`home-search__tab${activeTab === 'developer' ? ' home-search__tab--active' : ''}`}
          onClick={() => setActiveTab('developer')}
        >
          Oferty deweloperów
        </button>
      </div>

      <form className="home-search__form" onSubmit={(event) => event.preventDefault()}>
        <div className="home-search__grid">
          <label className="home-search__field home-search__field--select home-search__field--type">
            <span className="visually-hidden">Typ nieruchomości</span>
            <select defaultValue="mieszkania">
              <option value="mieszkania">Mieszkania</option>
              <option value="domy">Domy</option>
              <option value="dzialki">Działki</option>
            </select>
            <ChevronDown />
          </label>

          <label className="home-search__field home-search__field--select home-search__field--transaction">
            <span className="visually-hidden">Rodzaj transakcji</span>
            <select defaultValue="sale">
              <option value="sale">Na sprzedaż</option>
              <option value="rent">Do wynajęcia</option>
            </select>
            <ChevronDown />
          </label>

          <label className="home-search__field home-search__field--location">
            <span className="visually-hidden">Lokalizacja</span>
            <input type="text" placeholder="Wpisz lokalizację" />
          </label>

          <label className="home-search__field home-search__field--select home-search__field--radius">
            <span className="visually-hidden">Promień</span>
            <select defaultValue="0">
              <option value="0">+ 0 km</option>
              <option value="5">+ 5 km</option>
              <option value="10">+ 10 km</option>
              <option value="25">+ 25 km</option>
            </select>
            <ChevronDown />
          </label>

          <div className="home-search__range-group home-search__range-group--price">
            <span className="home-search__range-label">Cena</span>
            <div className="home-search__range-inputs">
              <RangeInput placeholder="od" unit="zł" label="Cena od" />
              <RangeInput placeholder="do" unit="zł" label="Cena do" />
            </div>
          </div>

          <div className="home-search__range-group home-search__range-group--area">
            <span className="home-search__range-label">Powierzchnia</span>
            <div className="home-search__range-inputs">
              <RangeInput placeholder="od" unit="m²" label="Powierzchnia od" />
              <RangeInput placeholder="do" unit="m²" label="Powierzchnia do" />
            </div>
          </div>

          <button type="submit" className="home-search__submit">
            <SearchIcon />
            Wyszukaj
          </button>
        </div>
      </form>
    </div>
  );
}
