import { HomePage } from './HomePage.jsx';

/** /cdn redirects here — same home page with CDN integration selected by default. */
export function HomePageCdn() {
  return <HomePage defaultIntegration="cdn" />;
}
