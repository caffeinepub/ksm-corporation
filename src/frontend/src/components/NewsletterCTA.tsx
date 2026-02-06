import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Sparkles } from 'lucide-react';
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
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto border-4 border-primary/30 overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 p-8 md:p-12">
            <CardHeader className="text-center p-0 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mail className="h-10 w-10 text-white drop-shadow-md" />
              </div>
              <CardTitle className="text-3xl md:text-4xl mb-3 font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Stay in the Loop
              </CardTitle>
              <CardDescription className="text-base md:text-lg font-medium">
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
                  className="flex-1 h-14 bg-background rounded-full border-2 font-medium"
                />
                <Button type="submit" size="lg" className="h-14 px-8 whitespace-nowrap rounded-full shadow-lg font-bold">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-4 font-medium">
                By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
