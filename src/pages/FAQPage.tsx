import { MetaTags } from '@/components/seo/MetaTags';
import { FAQSchema } from '@/components/seo/Schema';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "What is a dude ranch?",
    answer: "A dude ranch is a type of vacation property that offers guests an authentic Western experience. Originally, 'dude' was slang for city-dwellers unfamiliar with ranch life. Today, dude ranches combine working ranch activities with comfortable accommodations, allowing visitors to experience horseback riding, cattle drives, and the Western lifestyle while enjoying quality lodging and meals."
  },
  {
    question: "What should I expect during my stay at a dude ranch?",
    answer: "Most dude ranches offer a comprehensive Western experience including daily horseback riding, ranch activities like cattle work or roping, hearty meals, and evening entertainment. Accommodations range from rustic cabins to luxury lodges. Many ranches are all-inclusive, covering meals, activities, and lodging. Activities typically include trail rides, ranch work, fishing, hiking, and family-friendly entertainment."
  },
  {
    question: "Do I need horseback riding experience?",
    answer: "No prior experience is necessary! Most dude ranches cater to all skill levels, from complete beginners to experienced riders. Ranches typically offer lessons, assign horses based on your ability, and have wranglers to guide you. Many ranches even have special programs for children and first-time riders to ensure everyone feels comfortable and safe."
  },
  {
    question: "What's the best time of year to visit a dude ranch?",
    answer: "The peak season for most dude ranches is summer (June-August), offering warm weather and full programming. However, each season has unique appeal: spring brings wildflowers and baby animals, fall offers stunning foliage and comfortable temperatures, and winter provides opportunities for snow activities and a quieter experience. Many ranches operate year-round, while others are seasonal."
  },
  {
    question: "Are dude ranches family-friendly?",
    answer: "Absolutely! Most dude ranches are designed with families in mind, offering activities for all ages. Many have kids' programs, family suites, children's riding lessons, and activities like fishing, swimming, and nature exploration. Some ranches also offer childcare services and have minimum age requirements for certain activities to ensure safety and enjoyment for all guests."
  },
  {
    question: "What should I pack for a dude ranch vacation?",
    answer: "Essential items include: comfortable jeans or riding pants, long-sleeve shirts for sun protection, sturdy boots with a heel (for riding), a wide-brimmed hat, sunscreen, and layers for varying temperatures. Most ranches provide a detailed packing list. While cowboy boots are classic, many guests wear hiking boots. Don't forget casual clothes for evening activities and a jacket for cooler mornings and evenings."
  },
  {
    question: "How much does a dude ranch vacation cost?",
    answer: "Dude ranch pricing varies widely based on location, amenities, and season. Budget-friendly ranches may start around $1,500-2,500 per person per week, mid-range ranches typically cost $2,500-4,000, and luxury ranches can exceed $5,000+ per person weekly. Many ranches offer all-inclusive packages covering lodging, meals, and activities. Some offer shorter stays or have special rates for children."
  },
  {
    question: "What's included in an all-inclusive dude ranch package?",
    answer: "All-inclusive packages typically cover: accommodations, three meals daily (often family-style), horseback riding and instruction, ranch activities, use of facilities (pools, hot tubs), and evening entertainment. Additional costs might include: airport transfers, alcoholic beverages, spa services, fishing licenses, off-ranch excursions, and gratuities for staff."
  },
  {
    question: "Can I visit a working ranch?",
    answer: "Yes! Working dude ranches, also called working guest ranches, are active cattle operations that welcome guests to participate in real ranch work. You might help with cattle drives, branding, feeding livestock, mending fences, or other daily ranching tasks. These ranches offer a more authentic, hands-on experience for those wanting to truly understand ranch life."
  },
  {
    question: "How far in advance should I book?",
    answer: "For peak summer season (especially June-August), we recommend booking 6-12 months in advance, particularly for popular ranches and larger groups. Off-season stays may be available with shorter notice. Holidays and special events book quickly. Early booking ensures you get your preferred dates, accommodations, and may offer early-bird discounts."
  },
  {
    question: "Are meals provided at dude ranches?",
    answer: "Most dude ranches include three hearty meals daily in their rates. Expect cowboy-style cooking: barbecue, steaks, fresh-baked breads, and homestyle sides. Many ranches serve family-style meals that encourage socializing with other guests. Most can accommodate dietary restrictions with advance notice. Some ranches also include snacks and beverages throughout the day."
  },
  {
    question: "What's the difference between a dude ranch and a guest ranch?",
    answer: "The terms are often used interchangeably, but historically 'dude ranch' refers to ranches focused on horseback riding and Western activities, while 'guest ranch' might offer a broader range of activities including spa services, golf, or other resort amenities. Working ranches are actual cattle operations, while resort ranches focus primarily on guest recreation."
  }
];

export default function FAQPage() {
  const meta = {
    title: "Frequently Asked Questions | Dude Ranch Retreats",
    description: "Get answers to common questions about dude ranch vacations, what to expect, what to pack, costs, and more. Everything you need to know before booking your Western adventure.",
    canonical: "https://duderanchretreats.com/faq",
    ogTitle: "Dude Ranch FAQ - Your Questions Answered",
    ogDescription: "Find answers to all your dude ranch questions. Learn about activities, costs, what to pack, and what to expect during your authentic Western vacation.",
  };

  return (
    <>
      <MetaTags meta={meta} />
      <FAQSchema faqs={faqs} />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Everything you need to know about planning your dude ranch adventure
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto max-w-4xl">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2">Still Have Questions?</CardTitle>
                <CardDescription className="text-lg">
                  We're here to help you plan the perfect ranch vacation
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with our ranch experts
                  </p>
                  <Button variant="outline" size="sm">Start Chat</Button>
                </div>

                <div className="text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get detailed answers
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="mailto:info@duderanchretreats.com">Send Email</a>
                  </Button>
                </div>

                <div className="text-center p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
                  <Phone className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Speak with an advisor
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="tel:1-800-RANCH-US">Call Now</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Book Your Ranch Adventure?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Browse our curated selection of America's finest dude ranches
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" asChild>
                <Link to="/">Browse Ranches</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
