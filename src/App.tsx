import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { OrganizationSchema } from "@/components/seo/Schema";
import Index from "./pages/Index";
import CityPage from "./pages/CityPage";
import CityCategoryPage from "./pages/CityCategoryPage";
import ListingPage from "./pages/ListingPage";
import GuidePage from "./pages/GuidePage"; 
import AdvertisePage from "./pages/AdvertisePage";
import AdminScrape from "./pages/AdminScrape";
import StateRanchesPage from "./pages/StateRanchesPage";
import RanchDetailPage from "./pages/RanchDetailPage";
import BlogPage from "./pages/BlogPage";
import ArticlePage from "./pages/ArticlePage";
import FAQPage from "./pages/FAQPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isRanchPage = location.pathname.includes('dude-ranches') || 
                      (location.pathname.split('/').length === 3 && 
                       location.pathname.split('/')[1] && 
                       location.pathname.split('/')[2]);

  return (
    <div className="min-h-screen flex flex-col">
      {(isHomePage || isRanchPage) && <SiteHeader />}
      <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/admin/scrape" element={<AdminScrape />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<ArticlePage />} />
                <Route path="/guides/:slug" element={<GuidePage />} />
                <Route path="/advertise" element={<AdvertisePage />} />
                <Route path="/:state/dude-ranches" element={<StateRanchesPage />} />
                <Route path="/:state/:slug" element={<RanchDetailPage />} />
                <Route path="/:state/:city" element={<CityPage />} />
                <Route path="/:state/:city/:category" element={<CityCategoryPage />} />
                <Route path="/:state/:city/:category/:slug" element={<ListingPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            {(isHomePage || isRanchPage) && <SiteFooter />}
          </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <OrganizationSchema />
        <Helmet>
          <link rel="icon" href="/favicon.png" type="image/png" />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
          <link rel="apple-touch-icon" href="/favicon.png" />
        </Helmet>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
