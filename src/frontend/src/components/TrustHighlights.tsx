import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Truck, RefreshCw, HeadphonesIcon } from 'lucide-react';

const highlights = [
  {
    id: 'secure',
    title: 'Secure Shopping',
    description: 'Your data is protected with industry-leading encryption and security measures.',
    icon: ShieldCheck,
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    id: 'shipping',
    title: 'Fast & Free Shipping',
    description: 'Enjoy free shipping on orders over $50 with delivery in 3-5 business days.',
    icon: Truck,
    gradient: 'from-green-400 to-green-600',
  },
  {
    id: 'returns',
    title: 'Easy Returns',
    description: '30-day hassle-free returns. Not satisfied? Send it back for a full refund.',
    icon: RefreshCw,
    gradient: 'from-orange-400 to-orange-600',
  },
  {
    id: 'support',
    title: '24/7 Support',
    description: 'Our customer service team is always here to help with any questions.',
    icon: HeadphonesIcon,
    gradient: 'from-cyan-400 to-cyan-600',
  },
];

export default function TrustHighlights() {
  return (
    <section id="why-us" className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Why Shop With Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            We're committed to providing you with the best shopping experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <Card
                key={highlight.id}
                className="text-center border-4 border-border/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 hover:border-primary/50 rounded-3xl bg-gradient-to-br from-card to-card/80 transform hover:rotate-1"
              >
                <CardContent className="p-6">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${highlight.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className="h-10 w-10 text-white drop-shadow-md" />
                  </div>
                  <h3 className="text-xl font-black mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
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
