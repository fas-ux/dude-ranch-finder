import React from 'react';
import { Link } from 'react-router-dom';
import drrLogo from '@/assets/drr-logo.png';
export function SiteFooter() {
  return <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <img src={drrLogo} alt="Dude Ranch Retreats" className="h-12 w-auto" />
            </div>
            <p className="text-primary-foreground/80 max-w-md">Discover authentic dude ranches and Western experiences across the United States. Find your perfect Dude Ranch Retreat today.</p>
          </div>
          
          <div>
            <h3 className="font-serif font-semibold mb-4">Explore Ranches</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ranches/arizona" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Arizona
                </Link>
              </li>
              <li>
                <Link to="/ranches/colorado" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Colorado
                </Link>
              </li>
              <li>
                <Link to="/ranches/idaho" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Idaho
                </Link>
              </li>
              <li>
                <Link to="/ranches/montana" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Montana
                </Link>
              </li>
              <li>
                <Link to="/ranches/nevada" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Nevada
                </Link>
              </li>
              <li>
                <Link to="/ranches/new-mexico" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  New Mexico
                </Link>
              </li>
              <li>
                <Link to="/ranches/south-dakota" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  South Dakota
                </Link>
              </li>
              <li>
                <Link to="/ranches/texas" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Texas
                </Link>
              </li>
              <li>
                <Link to="/ranches/utah" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Utah
                </Link>
              </li>
              <li>
                <Link to="/ranches/wyoming" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                  Wyoming
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2024 Dude Ranch Retreats. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
}