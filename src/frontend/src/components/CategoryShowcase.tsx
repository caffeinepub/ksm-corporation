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
  men: 'from-blue-400 via-blue-500 to-blue-600',
  women: 'from-cyan-400 via-cyan-500 to-cyan-600',
  children: 'from-green-400 via-green-500 to-green-600',
  infants: 'from-sky-400 via-sky-500 to-sky-600',
  jewelry: 'from-yellow-400 via-yellow-500 to-yellow-600',
  shoes: 'from-orange-400 via-orange-500 to-orange-600',
  pets: 'from-teal-400 via-teal-500 to-teal-600',
  lifestyle: 'from-emerald-400 via-emerald-500 to-emerald-600',
  nfts: 'from-indigo-400 via-indigo-500 to-indigo-600',
};

export default function CategoryShowcase({ brandName, categories }: CategoryShowcaseProps) {
  const handleCategoryClick = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-primary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Explore our complete collection spanning all ages and styles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.id] || Package;
            const gradient = gradientMap[category.id] || 'from-gray-400 via-gray-500 to-gray-600';

            return (
              <Card
                key={category.id}
                id={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 border-4 border-border/50 hover:border-primary/50 overflow-hidden scroll-mt-24 rounded-3xl bg-gradient-to-br from-card to-card/80 transform hover:rotate-1"
              >
                <CardContent className="p-6">
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                    <Icon className="h-10 w-10 text-white drop-shadow-md" />
                  </div>
                  <h3 className="text-xl font-black mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Brand Story Section */}
        <div className="mt-20 max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-4 border-primary/20 rounded-3xl p-8 md:p-12 shadow-xl transform hover:scale-105 transition-all duration-300">
            <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Story
            </h3>
            <p className="text-lg text-foreground/80 leading-relaxed font-medium">
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
