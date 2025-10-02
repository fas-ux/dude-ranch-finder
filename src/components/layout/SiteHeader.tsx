import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MainNav } from '@/components/navigation/MainNav';
import drrLogo from '@/assets/drr-logo.png';
export function SiteHeader() {
  return <header className="border-b border-border bg-card shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={drrLogo} alt="Dude Ranch Retreats" className="h-12 w-auto" />
          </Link>

          <MainNav />

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/advertise">Partner with Dude Ranch Retreats</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>;
}