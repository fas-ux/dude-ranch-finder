import React from 'react';
import { Link } from 'react-router-dom';

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="text-2xl font-display font-bold mb-4">
              DudeRanch Directory
            </div>
            <p className="text-primary-foreground/80 max-w-md">
              Discover authentic dude ranches and Western experiences across the United States. 
              Find your perfect ranch vacation today.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/wyoming/jackson" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
                >
                  Jackson, Wyoming
                </Link>
              </li>
              <li>
                <Link 
                  to="/wyoming/cody" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
                >
                  Cody, Wyoming
                </Link>
              </li>
              <li>
                <Link 
                  to="/texas/bandera" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
                >
                  Bandera, Texas
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/guides" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link 
                  to="/advertise" 
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
                >
                  Advertise
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2024 DudeRanch Directory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}