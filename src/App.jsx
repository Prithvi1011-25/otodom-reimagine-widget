import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import { ListingPage } from './pages/ListingPage.jsx';

function CdnListingRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/listing/${slug}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listing/:slug" element={<ListingPage />} />
        <Route path="/cdn" element={<Navigate to="/" replace />} />
        <Route path="/cdn/listing/:slug" element={<CdnListingRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
