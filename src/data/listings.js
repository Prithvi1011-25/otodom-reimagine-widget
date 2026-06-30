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
    offerType: 'Private listing',
    title: 'Spacious family home — Property 4',
    titleHighlight: '185 m²',
    subtitle: 'Terrace. Multi-level layout.',
    address: 'Property 4, Mokotów, Warsaw',
    price: '2,150,000',
    pricePerSqm: '11,622 PLN / m²',
    priceDrop: null,
    rent: 'no information',
    details: {
      area: '185 m²',
      rooms: '5',
      floor: '2 levels',
      year: '2018',
      heating: 'Gas',
      condition: 'Ready to move in',
      market: 'Secondary',
      ownership: 'Full ownership',
    },
    description: `A bright family home spread across two levels with a generous living area, separate kitchen-dining space, and multiple bedrooms.

The layout includes a master bedroom, children's room, study, two bathrooms, a utility room, and a balcony terrace — ideal for everyday family living with room to work from home.`,
    bullets: [
      'Open living room with multiple layout angles',
      'Fully equipped kitchen with dining area',
      'Master bedroom and second bedroom',
      'Kids room and separate study',
      'Two bathrooms plus laundry utility',
      'Balcony terrace',
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
    offerType: 'Private listing',
    title: '1234 Maple Avenue, Apt 5B',
    titleHighlight: '142 m²',
    subtitle: 'Gym. Attic space. Open plan.',
    address: '1234 Maple Avenue, Apt 5B, Manhattan, New York',
    price: '1,285,000',
    pricePerSqm: '9,049 PLN / m²',
    priceDrop: '↓ 45,000',
    rent: '850 PLN',
    details: {
      area: '142 m²',
      rooms: '4',
      floor: '5/8',
      year: '2010',
      heating: 'District',
      condition: 'After renovation',
      market: 'Secondary',
      ownership: 'Full ownership',
    },
    description: `A renovated apartment at 1234 Maple Avenue with an open living and dining area, modern kitchen, and flexible extra spaces including attic storage and a private gym corner.

Large windows bring natural light into the living room and bedrooms. The layout works well for a family or professionals who want separate work and fitness areas at home.`,
    bullets: [
      'Living room with multiple viewing angles',
      'Dining room open to kitchen',
      'Two bedrooms plus attic space',
      'Two bathrooms',
      'Dedicated gym area',
      'Modern kitchen with island layout',
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
