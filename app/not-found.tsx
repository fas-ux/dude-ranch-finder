import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
          Ranch Not Found
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          Looks like this trail doesn't lead anywhere. Let's get you back on the right path.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/">
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/ranches">
              Browse Ranches
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}