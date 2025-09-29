import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MetaTags } from '@/components/seo/MetaTags';
import { ArticleSchema } from '@/components/seo/Schema';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';

// Mock article data - in real app would fetch from CMS/database
const articles = {
  "top-family-friendly-dude-ranches-2024": {
    title: "Top 10 Family-Friendly Dude Ranches for 2024",
    excerpt: "Discover the best dude ranches that cater to families with children of all ages, offering safe activities and comfortable accommodations.",
    content: `
# Top 10 Family-Friendly Dude Ranches for 2024

Finding the perfect dude ranch for your family vacation can be challenging, especially when you have children of different ages. The best family-friendly dude ranches offer a perfect blend of adventure, safety, and comfort that ensures everyone from toddlers to grandparents has an unforgettable experience.

## What Makes a Dude Ranch Family-Friendly?

Family-friendly dude ranches go beyond just allowing children. They actively cater to families with:

- **Age-appropriate activities** for different developmental stages
- **Safety-first approach** to all ranch activities
- **Comfortable accommodations** that can house families
- **Flexible meal options** including kid-friendly foods
- **Childcare services** for parents who want some adult time

## Our Top 10 Family-Friendly Dude Ranches

### 1. Mountain Sky Guest Ranch, Montana
This working cattle ranch offers specialized kids' programs for different age groups, from "Little Buckaroos" (3-5 years) to teen adventure programs.

### 2. The Home Ranch, Colorado
Known for its inclusive atmosphere and excellent children's programs, this ranch provides riding lessons tailored to each child's skill level.

### 3. Flathead Lake Lodge, Montana
With its lakefront location, families can enjoy both traditional ranch activities and water sports like kayaking and fishing.

## Planning Your Family Ranch Vacation

When booking your family dude ranch vacation, consider:

- **Season**: Summer offers the most activities, but spring and fall provide unique experiences
- **Duration**: Most families find 5-7 days perfect for a first visit
- **Activities**: Ensure the ranch offers age-appropriate activities for all your children
- **Accommodations**: Family cabins vs. lodge rooms - consider your family's preferences

## Safety Considerations

Reputable family-friendly dude ranches prioritize safety with:
- Certified riding instructors
- Well-trained, gentle horses for beginners
- Safety equipment provided (helmets, etc.)
- Clear age restrictions for activities
- Emergency medical procedures in place

## Making the Most of Your Visit

To ensure your family gets the most out of your dude ranch experience:
- Arrive with an open mind and willingness to try new things
- Participate in group activities to meet other families
- Take advantage of photo opportunities
- Don't over-schedule - leave time for spontaneous adventures

Your family dude ranch vacation will create memories that last a lifetime. Choose a ranch that matches your family's interests and comfort level, and prepare for an authentic Western adventure that brings everyone together.
`,
    publishedAt: "2024-03-15",
    readTime: "8 min read",
    category: "Family Travel",
    author: "Sarah Martinez",
    image: "/assets/family-horseback.jpg",
    tags: ["family travel", "dude ranches", "vacation planning", "children activities"]
  }
};

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articles[slug as keyof typeof articles];

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  const metaData = {
    title: `${article.title} | Dude Ranch Directory Blog`,
    description: article.excerpt,
    canonical: `https://duderanch-directory.com/blog/${slug}`,
    ogTitle: article.title,
    ogDescription: article.excerpt,
    ogImage: `https://duderanch-directory.com${article.image}`
  };

  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: article.title }
  ];

  const schemaData = {
    id: slug!,
    title: article.title,
    excerpt: article.excerpt,
    slug: slug!,
    publishedAt: article.publishedAt,
    bodyMd: article.content
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MetaTags meta={metaData} />
      <ArticleSchema article={schemaData} />
      <Breadcrumbs items={breadcrumbItems} />

      {/* Back to Blog */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link to="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            {article.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </div>
            <span>By {article.author}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {article.content.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('# ')) {
              return <h1 key={index} className="text-3xl font-serif font-bold text-foreground mt-8 mb-4">{paragraph.substring(2)}</h1>;
            } else if (paragraph.startsWith('## ')) {
              return <h2 key={index} className="text-2xl font-serif font-bold text-foreground mt-6 mb-3">{paragraph.substring(3)}</h2>;
            } else if (paragraph.startsWith('### ')) {
              return <h3 key={index} className="text-xl font-serif font-bold text-foreground mt-4 mb-2">{paragraph.substring(4)}</h3>;
            } else if (paragraph.startsWith('- ')) {
              return <li key={index} className="text-muted-foreground ml-6">{paragraph.substring(2)}</li>;
            } else if (paragraph.trim() === '') {
              return <br key={index} />;
            } else {
              return <p key={index} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
            }
          })}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Share this article:</h3>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </article>

      {/* Related Articles */}
      <section className="mt-16 pt-12 border-t border-border">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-8 text-center">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Badge variant="secondary" className="mb-3">Travel Tips</Badge>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                <Link to="/blog/what-to-pack-dude-ranch-vacation">
                  What to Pack for Your First Dude Ranch Vacation
                </Link>
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                A comprehensive packing guide for dude ranch newcomers...
              </p>
              <Link 
                to="/blog/what-to-pack-dude-ranch-vacation"
                className="inline-flex items-center text-primary text-sm font-medium hover:underline"
              >
                Read More
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Badge variant="secondary" className="mb-3">Ranch Life</Badge>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                <Link to="/blog/ultimate-guide-working-ranch-vacations">
                  The Ultimate Guide to Working Ranch Vacations
                </Link>
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                Experience authentic ranch life by participating in daily operations...
              </p>
              <Link 
                to="/blog/ultimate-guide-working-ranch-vacations"
                className="inline-flex items-center text-primary text-sm font-medium hover:underline"
              >
                Read More
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;