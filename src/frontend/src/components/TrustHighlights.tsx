import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Truck, RefreshCw, HeadphonesIcon } from 'lucide-react';

const highlights = [
  {
    id: 'secure',
    title: 'Secure Shopping',
    description: 'Your data is protected with industry-leading encryption and security measures.',
    icon: ShieldCheck,
  },
  {
    id: 'shipping',
    title: 'Fast & Free Shipping',
    description: 'Enjoy free shipping on orders over $50 with delivery in 3-5 business days.',
    icon: Truck,
  },
  {
    id: 'returns',
    title: 'Easy Returns',
    description: '30-day hassle-free returns. Not satisfied? Send it back for a full refund.',
    icon: RefreshCw,
  },
  {
    id: 'support',
    title: '24/7 Support',
    description: 'Our customer service team is always here to help with any questions.',
    icon: HeadphonesIcon,
  },
];

export default function TrustHighlights() {
  return (
    <section id="why-us" className="py-20 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Shop With Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <Card
                key={highlight.id}
                className="text-center border-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
