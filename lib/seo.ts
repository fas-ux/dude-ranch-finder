export const siteUrl = 'https://duderanchretreats.com'

export function canonicalFor(path: string): string {
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${siteUrl}${cleanPath}`
}

export function metaForRanch(ranch: any) {
  return {
    title: `${ranch.name} - Authentic Dude Ranch Experience | Dude Ranch Retreats`,
    description: `${ranch.description.slice(0, 150)}... Located in ${ranch.addressLocality}, ${ranch.addressRegion}. Book your Western adventure today!`
  }
}

export function metaForRanchList(page = 1) {
  const pageText = page > 1 ? ` - Page ${page}` : ''
  return {
    title: `Best Dude Ranches in America${pageText} | Dude Ranch Retreats`,
    description: 'Discover America\'s finest dude ranches offering authentic Western experiences, horseback riding, and family-friendly adventures. Find your perfect ranch vacation today.'
  }
}

export function metaForHome() {
  return {
    title: 'Dude Ranch Retreats | Discover America\'s Best Western Ranch Vacations',
    description: 'Find your perfect dude ranch vacation with authentic Western experiences, horseback riding, and family adventures at America\'s premier ranches. Book your getaway today!'
  }
}