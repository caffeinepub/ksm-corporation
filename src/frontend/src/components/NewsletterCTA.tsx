import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic would go here
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto border-border/50 overflow-hidden">
          <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 p-8 md:p-12">
            <CardHeader className="text-center p-0 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl md:text-4xl mb-3">
                Stay in the Loop
              </CardTitle>
              <CardDescription className="text-base md:text-lg">
                Subscribe to our newsletter for exclusive deals, new arrivals, and style tips delivered straight to your inbox.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 bg-background"
                />
                <Button type="submit" size="lg" className="h-12 px-8 whitespace-nowrap">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-4">
                By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
