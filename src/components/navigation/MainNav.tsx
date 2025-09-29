import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ChevronDown, Menu, X } from 'lucide-react';

const states = [
  { name: 'Arizona', slug: 'arizona' },
  { name: 'Colorado', slug: 'colorado' },
  { name: 'Idaho', slug: 'idaho' },
  { name: 'Montana', slug: 'montana' },
  { name: 'Nevada', slug: 'nevada' },
  { name: 'New Mexico', slug: 'new-mexico' },
  { name: 'South Dakota', slug: 'south-dakota' },
  { name: 'Texas', slug: 'texas' },
  { name: 'Utah', slug: 'utah' },
  { name: 'Wyoming', slug: 'wyoming' }
];

const guides = [
  { title: 'Best Family Ranches', slug: 'best-dude-ranches-for-families' },
  { title: 'Luxury Experiences', slug: 'luxury-dude-ranch-experiences' },
  { title: 'Working Ranch Vacations', slug: 'working-ranch-vacations' },
  { title: 'Horseback Riding Guides', slug: 'horseback-riding-guides' },
  { title: 'Ranch Wedding Venues', slug: 'ranch-wedding-venues' },
  { title: 'Corporate Retreats', slug: 'corporate-retreat-ranches' }
];

export function MainNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-foreground font-medium">
              Browse Ranches
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-2 gap-3 p-6 w-[500px]">
                {states.map((state) => (
                  <Link
                    key={state.slug}
                    to={`/${state.slug}/dude-ranches`}
                    className="block p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="font-medium text-foreground">{state.name}</div>
                    <div className="text-sm text-muted-foreground">Dude Ranches</div>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-foreground font-medium">
              Travel Guides
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-1 gap-3 p-6 w-[400px]">
                {guides.map((guide) => (
                  <Link
                    key={guide.slug}
                    to={`/guides/${guide.slug}`}
                    className="block p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="font-medium text-foreground">{guide.title}</div>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link 
              to="/blog" 
              className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Blog
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link 
              to="/advertise" 
              className="inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              List Your Ranch
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg md:hidden">
          <div className="container mx-auto px-4 py-6 space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Browse Ranches</h3>
              <div className="grid grid-cols-2 gap-2">
                {states.slice(0, 6).map((state) => (
                  <Link
                    key={state.slug}
                    to={`/${state.slug}/dude-ranches`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {state.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4">
              <Link 
                to="/blog" 
                className="block text-foreground font-medium mb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/advertise" 
                className="block text-foreground font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                List Your Ranch
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}