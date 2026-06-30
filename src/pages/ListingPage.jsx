import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ContactAdvertiserModal } from '../components/ContactAdvertiserModal.jsx';
import { SiteHeader } from '../components/SiteHeader.jsx';
import { OtodomListing } from '../components/OtodomListing.jsx';
import { PhotoGalleryModal } from '../components/PhotoGalleryModal.jsx';
import { useReihScriptEmbed } from '../hooks/useReihScriptEmbed.js';
import { clearReihLoader } from '../widgetConfig.js';
import { getListingBySlug } from '../data/listings.js';

export function ListingPage() {
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
    <div className="app-shell app-shell--listing">
      <SiteHeader />

      <main className="listing-page">
        <OtodomListing
          listing={listing}
          onOpenGallery={openGallery}
          onContactAdvertiser={() => setContactOpen(true)}
          widget={widget}
        />
      </main>

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
