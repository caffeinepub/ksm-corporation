import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Star } from 'lucide-react';

const collections = [
  {
    id: 'new-arrivals',
    title: 'New Arrivals',
    description: 'Fresh styles just landed. Be the first to discover our latest collection.',
    icon: Sparkles,
    gradient: 'from-emerald-500/10 to-emerald-600/5',
  },
  {
    id: 'trending',
    title: 'Trending Now',
    description: 'What everyone is loving right now. Shop the most popular items.',
    icon: TrendingUp,
    gradient: 'from-amber-500/10 to-amber-600/5',
  },
  {
    id: 'best-sellers',
    title: 'Best Sellers',
    description: 'Our top-rated products that customers can\'t get enough of.',
    icon: Star,
    gradient: 'from-purple-500/10 to-purple-600/5',
  },
];

export default function FeaturedCollections() {
  return (
    <section id="featured" className="py-20 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Collections</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated selections of our finest products, handpicked just for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => {
            const Icon = collection.icon;
            return (
              <Card
                key={collection.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-border/50 overflow-hidden"
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${collection.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7 text-foreground/80" />
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {collection.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {collection.description}
                  </p>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Explore Collection
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
