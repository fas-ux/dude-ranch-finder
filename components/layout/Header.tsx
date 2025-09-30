import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-primary">
              Dude Ranch Retreats
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link 
              href="/ranches" 
              className="transition-colors hover:text-primary"
            >
              Ranches
            </Link>
            <Link 
              href="/states" 
              className="transition-colors hover:text-primary"
            >
              By State
            </Link>
            <Link 
              href="/guides" 
              className="transition-colors hover:text-primary"
            >
              Travel Guides
            </Link>
            <Link 
              href="/blog" 
              className="transition-colors hover:text-primary"
            >
              Blog
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/advertise">
              List Your Ranch
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}