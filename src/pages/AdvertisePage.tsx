import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MetaTags } from '@/components/seo/MetaTags';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';

const AdvertisePage = () => {
  const metaData = {
    title: "List Your Dude Ranch | Advertise with Dude Ranch Directory",
    description: "Reach thousands of travelers looking for authentic Western experiences. Advertise your dude ranch on the premier directory for ranch vacations.",
    canonical: "https://duderanch-directory.com/advertise"
  };

  const breadcrumbItems = [
    { label: "Advertise Your Ranch" }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <MetaTags meta={metaData} />
      <Breadcrumbs items={breadcrumbItems} />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
          Advertise Your Dude Ranch
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Reach thousands of travelers looking for authentic Western experiences
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          <h2 className="text-2xl font-serif font-semibold mb-4">
            Get Started Today
          </h2>
          <p className="text-muted-foreground mb-6">
            Contact us to learn about our advertising packages and how we can help 
            promote your ranch to our growing community of Western adventure seekers.
          </p>
          <Button variant="rustic" size="lg">
            Contact Us
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvertisePage;