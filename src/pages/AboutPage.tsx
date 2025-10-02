import { MetaTags } from '@/components/seo/MetaTags';
import { AboutPageSchema } from '@/components/seo/Schema';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Shield, Star, Users, Map, Award } from 'lucide-react';

export default function AboutPage() {
  const meta = {
    title: "About Us | Dude Ranch Retreats - Your Trusted Western Vacation Guide",
    description: "Learn about Dude Ranch Retreats' mission to connect travelers with authentic Western ranch experiences. Discover why we're the trusted source for finding the perfect dude ranch vacation.",
    canonical: "https://duderanchretreats.com/about",
    ogTitle: "About Dude Ranch Retreats - Connecting You with Authentic Western Experiences",
    ogDescription: "Your trusted guide to finding the perfect dude ranch vacation. We curate the finest Western ranch experiences across America.",
  };

  const values = [
    {
      icon: Heart,
      title: "Passion for Western Heritage",
      description: "We're dedicated to preserving and sharing the authentic spirit of the American West through exceptional ranch experiences."
    },
    {
      icon: Shield,
      title: "Trust & Authenticity",
      description: "Every ranch in our directory is carefully vetted to ensure genuine Western experiences and quality accommodations."
    },
    {
      icon: Star,
      title: "Excellence in Service",
      description: "We're committed to helping you find the perfect ranch that matches your dreams, budget, and expectations."
    },
    {
      icon: Users,
      title: "Family-Focused",
      description: "We understand the importance of creating lasting family memories and help you find ranches that cater to all ages."
    }
  ];

  const stats = [
    { number: "100+", label: "Curated Ranches" },
    { number: "10,000+", label: "Happy Guests" },
    { number: "15", label: "States Covered" },
    { number: "25+", label: "Years Combined Experience" }
  ];

  return (
    <>
      <MetaTags meta={meta} />
      <AboutPageSchema />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">Est. 2024</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Connecting You with Authentic Western Experiences
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                At Dude Ranch Retreats, we believe that the magic of the American West should be accessible to everyone. 
                We're passionate about helping families, couples, and adventure-seekers discover the ranch vacation of their dreams.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 bg-muted/50">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded by ranch enthusiasts and Western lifestyle advocates, Dude Ranch Retreats was born from 
                    a simple observation: finding the perfect dude ranch shouldn't be complicated.
                  </p>
                  <p>
                    We've spent years visiting ranches, talking with wranglers, and experiencing firsthand what makes 
                    a ranch vacation truly special. Our mission is to share that knowledge with you, making it easy 
                    to find a ranch that fits your style, budget, and adventure level.
                  </p>
                  <p>
                    Whether you're seeking a luxurious guest ranch with spa amenities, a working cattle ranch where 
                    you can participate in real ranch work, or a family-friendly destination with activities for all 
                    ages, we'll help you find your perfect Western escape.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Card className="overflow-hidden">
                  <img 
                    src="/images/hero-horseback.jpg" 
                    alt="Horseback riding in the mountains"
                    className="w-full h-[400px] object-cover"
                  />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                          <p className="text-muted-foreground">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center">What We Offer</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Map className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Curated Directory</h3>
                <p className="text-muted-foreground">
                  Hand-picked ranches across the Western United States, each personally reviewed and verified 
                  for quality and authenticity.
                </p>
              </div>

              <div className="text-center">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Expert Guidance</h3>
                <p className="text-muted-foreground">
                  Detailed information, insider tips, and honest reviews to help you make informed decisions 
                  about your ranch vacation.
                </p>
              </div>

              <div className="text-center">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Community Connection</h3>
                <p className="text-muted-foreground">
                  Connect with ranch owners, read guest experiences, and join a community of Western 
                  lifestyle enthusiasts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-5xl">
            <Card className="border-2">
              <CardContent className="pt-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Dude Ranch Retreats?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Unbiased Recommendations:</strong> We're not affiliated 
                        with specific ranches, so our guidance is always honest and in your best interest.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Time-Saving Search:</strong> Instead of spending hours 
                        researching, find your ideal ranch quickly with our organized, detailed listings.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Comprehensive Information:</strong> Get all the details 
                        you need—activities, accommodations, pricing, and more—in one place.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Family Expertise:</strong> Special focus on family-friendly 
                        options, with insights on which ranches are best for kids of different ages.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Regular Updates:</strong> Our listings are continuously 
                        updated with current information, ensuring accuracy and relevance.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Educational Content:</strong> Learn about ranch life, 
                        what to expect, and how to prepare through our guides and articles.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Ranch Adventure Today</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're dreaming of your first ranch vacation or you're a seasoned ranch enthusiast, 
              we're here to help you find the perfect Western escape.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" asChild>
                <Link to="/">Browse Ranches</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/faq">Read FAQs</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
