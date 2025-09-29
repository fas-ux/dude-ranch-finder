import React from 'react';
import { Link } from 'react-router-dom';
import { MetaTags } from '@/components/seo/MetaTags';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

// Mock blog articles - in a real app, this would come from CMS or database
const blogArticles = [
  {
    id: 1,
    title: "Top 10 Family-Friendly Dude Ranches for 2024",
    excerpt: "Discover the best dude ranches that cater to families with children of all ages, offering safe activities and comfortable accommodations.",
    slug: "top-family-friendly-dude-ranches-2024",
    publishedAt: "2024-03-15",
    readTime: "8 min read",
    category: "Family Travel",
    featured: true,
    image: "/assets/family-horseback.jpg"
  },
  {
    id: 2,
    title: "What to Pack for Your First Dude Ranch Vacation",
    excerpt: "A comprehensive packing guide for dude ranch newcomers, covering everything from riding gear to evening attire.",
    slug: "what-to-pack-dude-ranch-vacation",
    publishedAt: "2024-03-10",
    readTime: "6 min read",
    category: "Travel Tips",
    featured: false,
    image: "/assets/ranch-cabin.jpg"
  },
  {
    id: 3,
    title: "The Ultimate Guide to Working Ranch Vacations",
    excerpt: "Experience authentic ranch life by participating in daily ranch operations, from cattle herding to fence mending.",
    slug: "ultimate-guide-working-ranch-vacations",
    publishedAt: "2024-03-05",
    readTime: "12 min read",
    category: "Ranch Life",
    featured: true,
    image: "/assets/cattle-drive.jpg"
  },
  {
    id: 4,
    title: "Best Dude Ranches for Horseback Riding Enthusiasts",
    excerpt: "From beginner-friendly trails to advanced riding programs, find the perfect ranch for your equestrian skills.",
    slug: "best-dude-ranches-horseback-riding",
    publishedAt: "2024-02-28",
    readTime: "10 min read",
    category: "Activities",
    featured: false,
    image: "/assets/horseback-riding.jpg"
  },
  {
    id: 5,
    title: "Luxury Dude Ranch Experiences: Where Comfort Meets Adventure",
    excerpt: "Explore high-end dude ranches that offer premium amenities without sacrificing authentic Western experiences.",
    slug: "luxury-dude-ranch-experiences",
    publishedAt: "2024-02-20",
    readTime: "9 min read",
    category: "Luxury Travel",
    featured: true,
    image: "/assets/ranch-lodge.jpg"
  },
  {
    id: 6,
    title: "Planning a Dude Ranch Wedding: Everything You Need to Know",
    excerpt: "Say 'I do' under big skies with our complete guide to planning the perfect ranch wedding celebration.",
    slug: "planning-dude-ranch-wedding-guide",
    publishedAt: "2024-02-15",
    readTime: "15 min read",
    category: "Weddings",
    featured: false,
    image: "/assets/ranch-landscape.jpg"
  }
];

const BlogPage = () => {
  const metaData = {
    title: "Dude Ranch Blog - Travel Tips, Guides & Ranch Life Stories",
    description: "Discover expert travel tips, comprehensive guides, and authentic stories about dude ranch vacations. Plan your perfect Western getaway with insider knowledge.",
    canonical: "https://duderanch-directory.com/blog",
    ogTitle: "Dude Ranch Blog - Expert Guides & Travel Tips",
    ogDescription: "Get insider tips and comprehensive guides for planning the perfect dude ranch vacation. Stories from ranch life and travel experts.",
  };

  const breadcrumbItems = [
    { label: "Blog" }
  ];

  const featuredArticles = blogArticles.filter(article => article.featured);
  const regularArticles = blogArticles.filter(article => !article.featured);

  return (
    <div className="container mx-auto px-4 py-8">
      <MetaTags meta={metaData} />
      <Breadcrumbs items={breadcrumbItems} />

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
          Dude Ranch Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Expert guides, travel tips, and authentic stories from America's finest dude ranches
        </p>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge variant="secondary" className="absolute top-4 left-4">
                    {article.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    <Link to={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* All Articles */}
      <section>
        <h2 className="text-2xl font-serif font-bold text-foreground mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article) => (
            <Card key={article.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge variant="secondary" className="absolute top-3 left-3 text-xs">
                  {article.category}
                </Badge>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </div>
                </div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  <Link to={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                  {article.excerpt}
                </p>
                <Link 
                  to={`/blog/${article.slug}`}
                  className="inline-flex items-center text-primary text-sm font-medium hover:underline"
                >
                  Read More
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
          Stay Updated on Ranch Life
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Get the latest travel tips, ranch guides, and exclusive deals delivered to your inbox
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;