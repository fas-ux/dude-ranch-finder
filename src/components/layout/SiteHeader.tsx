import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import drrLogo from '@/assets/drr-logo.png';

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src={drrLogo} 
              alt="Dude Ranch Retreats" 
              className="h-12 w-auto"
            />
          </Link>

        </div>
      </div>
    </header>
  );
}