import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <OrganizationSchema />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin/scrape" element={<AdminScrape />} />
                <Route path="/guides/:slug" element={<GuidePage />} />
                <Route path="/advertise" element={<AdvertisePage />} />
                <Route path="/:state/:city" element={<CityPage />} />
                <Route path="/:state/:city/:category" element={<CityCategoryPage />} />
                <Route path="/:state/:city/:category/:slug" element={<ListingPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <SiteFooter />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
