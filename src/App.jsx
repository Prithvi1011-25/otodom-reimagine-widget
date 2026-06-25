import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage.jsx';
import { HomePageCdn } from './pages/HomePageCdn.jsx';
import { ListingPage } from './pages/ListingPage.jsx';
import { ListingPageCdn } from './pages/ListingPageCdn.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listing/:slug" element={<ListingPage />} />
        <Route path="/cdn" element={<HomePageCdn />} />
        <Route path="/cdn/listing/:slug" element={<ListingPageCdn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
