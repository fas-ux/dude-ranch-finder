import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card shadow-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="text-3xl font-western text-primary">
              Dude Ranch Retreats
            </div>
          </Link>

        </div>
      </div>
    </header>
  );
}