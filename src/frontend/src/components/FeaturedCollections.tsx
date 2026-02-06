import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Star } from 'lucide-react';

const collections = [
  {
    id: 'new-arrivals',
    title: 'New Arrivals',
    description: 'Fresh styles just landed. Be the first to discover our latest collection.',
    icon: Sparkles,
    gradient: 'from-emerald-400 via-emerald-500 to-emerald-600',
  },
  {
    id: 'trending',
    title: 'Trending Now',
    description: 'What everyone is loving right now. Shop the most popular items.',
    icon: TrendingUp,
    gradient: 'from-amber-400 via-amber-500 to-amber-600',
  },
  {
    id: 'best-sellers',
    title: 'Best Sellers',
    description: 'Our top-rated products that customers can\'t get enough of.',
    icon: Star,
    gradient: 'from-sky-400 via-sky-500 to-sky-600',
  },
];

export default function FeaturedCollections() {
  return (
    <section id="featured" className="py-20 bg-gradient-to-br from-background via-accent/5 to-primary/5 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Featured Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Curated selections of our finest products, handpicked just for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => {
            const Icon = collection.icon;
            return (
              <Card
                key={collection.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 border-4 border-border/50 hover:border-primary/50 overflow-hidden rounded-3xl bg-gradient-to-br from-card to-card/80 transform hover:rotate-1"
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${collection.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white drop-shadow-md" />
                  </div>
                  <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors">
                    {collection.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed font-medium">
                    {collection.description}
                  </p>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors rounded-full border-2 font-bold">
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
