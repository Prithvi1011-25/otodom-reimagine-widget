import { Link, Navigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { OtodomListing } from '../components/OtodomListing.jsx';
import { PhotoGalleryModal } from '../components/PhotoGalleryModal.jsx';
import { SiteHeader } from '../components/SiteHeader.jsx';
import { useReihWidget } from '../hooks/useReihWidget.js';
import { clearReihLoader } from '../widgetConfig.js';
import { getListingBySlug } from '../data/listings.js';

export function ListingPage() {
  const { slug } = useParams();
  const listing = getListingBySlug(slug);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const widget = useReihWidget(listing?.media ?? [], listing?.slug ?? '');

  if (!listing) {
    return <Navigate to="/" replace />;
  }

  const openGallery = () => {
    clearReihLoader();
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  return (
    <div className="app-shell">
      <SiteHeader />

      <main className="listing-page">
        <p className="listing-page__back">
          <Link to="/">← Wszystkie ogłoszenia</Link>
        </p>

        <OtodomListing
          listing={listing}
          onOpenGallery={openGallery}
          widget={widget}
        />
      </main>

      <footer className="otodom-footer">
        <p>© 2026 Otodom · Spółka Grupy OLX</p>
        <div className="otodom-footer__links">
          <a href="#">Regulamin</a>
          <a href="#">Prywatność</a>
          <a href="#">Pliki cookie</a>
          <a href="#">Pomoc</a>
        </div>
      </footer>

      <PhotoGalleryModal
        media={listing.media}
        listing={listing}
        isOpen={galleryOpen}
        onClose={closeGallery}
        widget={widget}
      />
    </div>
  );
}
