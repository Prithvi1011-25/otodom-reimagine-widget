import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ContactAdvertiserModal } from '../components/ContactAdvertiserModal.jsx';
import { Footer } from '../components/Footer.jsx';
import { HomeHeader } from '../components/HomeHeader.jsx';
import { MobileBottomBar } from '../components/MobileBottomBar.jsx';
import { OtodomListing } from '../components/OtodomListing.jsx';
import '../home-page.css';
import { PhotoGalleryModal } from '../components/PhotoGalleryModal.jsx';
import { useReihScriptEmbed } from '../hooks/useReihScriptEmbed.js';
import { clearReihLoader } from '../widgetConfig.js';
import { getListingBySlug } from '../data/listings.js';

export function ListingPage() {
  const { slug } = useParams();
  const listing = getListingBySlug(slug);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryScrollToId, setGalleryScrollToId] = useState(null);
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
    setGalleryScrollToId(null);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setGalleryScrollToId(null);
  };

  return (
    <div className="app-shell app-shell--listing">
      <HomeHeader />

      <main className="listing-page">
        <OtodomListing
          listing={listing}
          onOpenGallery={openGallery}
          onContactAdvertiser={() => setContactOpen(true)}
          widget={widget}
        />
      </main>

      <Footer />

        <PhotoGalleryModal
          media={listing.media}
          listing={listing}
          isOpen={galleryOpen}
          scrollToMediaId={galleryScrollToId}
          onClose={closeGallery}
        onContactAdvertiser={() => setContactOpen(true)}
        widget={widget}
      />

      <ContactAdvertiserModal
        listing={listing}
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <MobileBottomBar
        onMessage={() => setContactOpen(true)}
        onCall={() => setContactOpen(true)}
      />
    </div>
  );
}
