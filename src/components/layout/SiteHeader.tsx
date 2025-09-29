import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Dude Ranch Retreats" 
              className="h-12 w-auto"
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/guides" 
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              Guides
            </Link>
            <Link 
              to="/advertise" 
              className="text-foreground hover:text-primary transition-smooth font-medium"
            >
              Advertise
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="western" size="sm" asChild>
              <Link to="/advertise">List Your Ranch</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}