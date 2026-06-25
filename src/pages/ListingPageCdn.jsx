import { Link, Navigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ContactAdvertiserModal } from '../components/ContactAdvertiserModal.jsx';
import { OtodomListing } from '../components/OtodomListing.jsx';
import { PhotoGalleryModal } from '../components/PhotoGalleryModal.jsx';
import { SiteHeader } from '../components/SiteHeader.jsx';
import { useReihScriptEmbed } from '../hooks/useReihScriptEmbed.js';
import { clearReihLoader } from '../widgetConfig.js';
import { getListingBySlug } from '../data/listings.js';

export function ListingPageCdn() {
  const { slug } = useParams();
  const listing = getListingBySlug(slug);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const widget = useReihScriptEmbed(listing?.media ?? [], listing?.slug ?? '', {
    onActionClick: () => {
      setContactOpen(true);
    },
  });

  if (!listing) {
    return <Navigate to="/?integration=cdn" replace />;
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
        <p className="listing-page__integration-note">
          <Link to="/?integration=cdn">← All listings (CDN embed)</Link>
        </p>

        <OtodomListing
          listing={listing}
          onOpenGallery={openGallery}
          onContactAdvertiser={() => setContactOpen(true)}
          widget={widget}
        />
      </main>

      <footer className="otodom-footer">
        <p>© 2026 otodom · OLX Group</p>
        <div className="otodom-footer__links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
          <a href="#">Help</a>
        </div>
      </footer>

      <PhotoGalleryModal
        media={listing.media}
        listing={listing}
        isOpen={galleryOpen}
        onClose={closeGallery}
        onContactAdvertiser={() => setContactOpen(true)}
        widget={widget}
      />

      <ContactAdvertiserModal
        listing={listing}
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
