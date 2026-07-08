import { buildMedia } from './listingImages.js';

export const LISTINGS = [
  {
    id: '70010001',
    slug: 'property-4',
    breadcrumbs: [
      'House for sale',
      'Secondary market',
      '5 rooms',
      'Warsaw',
      'Mokotów',
      'Property 4',
    ],
    offerType: 'Oferta prywatna',
    title: 'Stylowy i przestronny dom rodzinny — Property 4',
    titleHighlight: '185 m²',
    subtitle: 'Taras. Układ wielopoziomowy.',
    address: 'Property 4, Mokotów, Warszawa',
    price: '2,150,000',
    pricePerSqm: '11,622 PLN / m²',
    priceDrop: null,
    rent: '600 PLN/miesiąc',
    details: {
      area: '185 m²',
      rooms: '5',
      floor: '1/10',
      year: '2018',
      heating: 'gazowe',
      condition: 'gotowe do zamieszkania',
      market: 'wtórny',
      ownership: 'pełna własność',
      sellerType: 'agencja',
    },
    description: `Jasny dom rodzinny rozłożony na dwóch poziomach z przestronnym salonem, oddzielną kuchnią z jadalnią oraz kilkoma sypialniami.

Układ obejmuje sypialnię główną, pokój dziecięcy, gabinet, dwie łazienki, pomieszczenie gospodarcze oraz taras balkonowy — idealny do codziennego życia rodzinnego z miejscem do pracy z domu.`,
    bullets: [
      'Otwarty salon z wieloma możliwościami aranżacji',
      'W pełni wyposażona kuchnia z jadalnią',
      'Sypialnia główna i druga sypialnia',
      'Pokój dziecięcy i osobny gabinet',
      'Dwie łazienki oraz pomieszczenie gospodarcze',
      'Taras balkonowy',
    ],
    agent: {
      initials: 'AN',
      name: 'Anna Nowak',
      company: 'Metrohouse S.A.',
      meta: 'Private listing · Member since 2020',
    },
    agency: {
      brand: 'metrohouse',
      name: 'Metrohouse S.A.',
      logo: '/agency/metrohouse-logo.png',
      color: '#ffd100',
    },
    media: buildMedia('property-4'),
  },
  {
    id: '70010002',
    slug: '1234-maple-avenue-apt-5b',
    breadcrumbs: [
      'Apartment for sale',
      'Secondary market',
      '4 rooms',
      'New York',
      'Manhattan',
      '1234 Maple Avenue',
    ],
    offerType: 'Oferta prywatna',
    title: '1234 Maple Avenue, Apt 5B',
    titleHighlight: '142 m²',
    subtitle: 'Siłownia. Poddasze. Układ otwarty.',
    address: '1234 Maple Avenue, Apt 5B, Manhattan, New York',
    price: '1,285,000',
    pricePerSqm: '9,049 PLN / m²',
    priceDrop: '↓ 45,000',
    rent: '850 PLN/miesiąc',
    details: {
      area: '142 m²',
      rooms: '4',
      floor: '5/8',
      year: '2010',
      heating: 'miejskie',
      condition: 'po remoncie',
      market: 'wtórny',
      ownership: 'pełna własność',
      sellerType: 'agencja',
    },
    description: `Odnowione mieszkanie przy 1234 Maple Avenue z otwartą częścią dzienną i jadalnią, nowoczesną kuchnią oraz dodatkowymi, elastycznymi przestrzeniami, w tym schowkiem na poddaszu i prywatnym kącikiem fitness.

Duże okna wpuszczają naturalne światło do salonu i sypialni. Układ świetnie sprawdzi się dla rodziny lub profesjonalistów, którzy chcą mieć w domu oddzielne strefy do pracy i ćwiczeń.`,
    bullets: [
      'Salon z wieloma możliwościami aranżacji',
      'Jadalnia otwarta na kuchnię',
      'Dwie sypialnie oraz poddasze',
      'Dwie łazienki',
      'Wydzielona strefa fitness',
      'Nowoczesna kuchnia z wyspą',
    ],
    agent: {
      initials: 'JK',
      name: 'James Kowalski',
      company: 'Metrohouse S.A.',
      meta: 'Private listing · Member since 2018',
    },
    agency: {
      brand: 'metrohouse',
      name: 'Metrohouse S.A.',
      logo: '/agency/metrohouse-logo.png',
      color: '#ffd100',
    },
    media: buildMedia('1234-maple-avenue-apt-5b'),
  },
];

export function getListingBySlug(slug) {
  return LISTINGS.find((listing) => listing.slug === slug) ?? null;
}
