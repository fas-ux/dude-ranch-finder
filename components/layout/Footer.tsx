import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-display font-bold text-primary">
              Dude Ranch Retreats
            </h3>
            <p className="text-sm text-muted-foreground">
              Discover America's finest dude ranches offering authentic Western experiences 
              and unforgettable family adventures.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ranches" className="text-muted-foreground hover:text-primary transition-colors">
                  All Ranches
                </Link>
              </li>
              <li>
                <Link href="/states" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse by State
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-muted-foreground hover:text-primary transition-colors">
                  Travel Guides
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Ranch Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Ranch Owners</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/advertise" className="text-muted-foreground hover:text-primary transition-colors">
                  List Your Ranch
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Dude Ranch Retreats. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}