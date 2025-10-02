import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" })
});

export function EmailCapture() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validation = emailSchema.safeParse({ email });
    
    if (!validation.success) {
      toast({
        title: "Invalid Email",
        description: validation.error.errors[0].message,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('email_subscribers')
        .insert([
          { 
            email: validation.data.email.toLowerCase(),
            source: 'homepage_capture',
            subscribed_at: new Date().toISOString()
          }
        ]);

      if (error) {
        // Check if email already exists
        if (error.code === '23505') {
          toast({
            title: "Already Subscribed",
            description: "This email is already on our list! Check your inbox for updates.",
            variant: "default"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Welcome to the Ranch Family! 🤠",
          description: "You'll receive exclusive ranch recommendations and special offers.",
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: "Oops!",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <Card className="max-w-4xl mx-auto border-2 border-accent/20 shadow-hero bg-card/95 backdrop-blur">
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-primary px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold uppercase tracking-wide">Exclusive Updates</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Get Ranch Recommendations Delivered to Your Inbox
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of ranch enthusiasts receiving insider tips, featured ranch spotlights, 
                and exclusive deals on authentic Western experiences.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 text-base border-2 rounded-xl"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-14 px-8 font-semibold text-base rounded-xl shadow-warm hover:shadow-hero transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                We respect your privacy. Unsubscribe anytime. No spam, just ranches.
              </p>
            </form>

            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">📍</div>
                <h3 className="font-semibold text-sm mb-1">Curated Picks</h3>
                <p className="text-xs text-muted-foreground">Hand-selected ranches for every budget</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">💰</div>
                <h3 className="font-semibold text-sm mb-1">Exclusive Deals</h3>
                <p className="text-xs text-muted-foreground">Special offers just for subscribers</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">🤠</div>
                <h3 className="font-semibold text-sm mb-1">Insider Tips</h3>
                <p className="text-xs text-muted-foreground">Expert advice from ranch veterans</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
