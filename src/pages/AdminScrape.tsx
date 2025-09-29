import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AdminScrape() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScrape = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('scrape-ranches');
      
      if (error) throw error;
      
      setResult(data);
      toast.success('Scraping completed successfully!');
    } catch (error) {
      console.error('Error scraping ranches:', error);
      toast.error('Failed to scrape ranches');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Ranch Data Scraper</CardTitle>
          <CardDescription>
            Scrape and import ranch data from duderanch.org and duderanch.com
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleScrape} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Scraping...' : 'Start Scraping'}
          </Button>

          {result && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Results:</h3>
              <p>Total ranches found: {result.total}</p>
              <p>Successfully inserted: {result.inserted}</p>
              <p>Errors: {result.errors}</p>
              <p className="text-sm text-muted-foreground mt-2">{result.message}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
