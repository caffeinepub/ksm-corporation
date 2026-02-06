import { Card, CardContent } from '@/components/ui/card';
import { Shirt, Baby, Gem, Footprints, PawPrint, Users, Package } from 'lucide-react';
import type { Category } from '../backend';

interface CategoryShowcaseProps {
  brandName: string;
  categories: Category[];
}

const iconMap: Record<string, any> = {
  men: Shirt,
  women: Users,
  children: Users,
  infants: Baby,
  jewelry: Gem,
  shoes: Footprints,
  pets: PawPrint,
  lifestyle: Package,
  nfts: Gem,
};

const gradientMap: Record<string, string> = {
  men: 'from-emerald-500/10 to-emerald-600/5',
  women: 'from-amber-500/10 to-amber-600/5',
  children: 'from-teal-500/10 to-teal-600/5',
  infants: 'from-rose-500/10 to-rose-600/5',
  jewelry: 'from-purple-500/10 to-purple-600/5',
  shoes: 'from-blue-500/10 to-blue-600/5',
  pets: 'from-orange-500/10 to-orange-600/5',
  lifestyle: 'from-green-500/10 to-green-600/5',
  nfts: 'from-indigo-500/10 to-indigo-600/5',
};

export default function CategoryShowcase({ brandName, categories }: CategoryShowcaseProps) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our complete collection spanning all ages and styles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.id] || Package;
            const gradient = gradientMap[category.id] || 'from-gray-500/10 to-gray-600/5';
            
            return (
              <Card
                key={category.id}
                id={category.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 overflow-hidden scroll-mt-24"
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-foreground/80" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Brand Story Section */}
        <div className="mt-20 max-w-4xl mx-auto text-center">
          <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-4">Our Story</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {brandName} started with one idea: to create a place where everyone can find the style they want in one store. 
              From clothes for men, women, and children to shoes, jewelry, and sportswear, {brandName} brings everything together under one name. 
              The goal is simple: make fashion easy, affordable, and available for everyone in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
