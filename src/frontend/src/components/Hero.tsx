import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  brandName: string;
  headline: string;
  description: string;
}

export default function Hero({ brandName, headline, description }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-block">
            <img
              src="/assets/generated/ksm-corporation-logo.dim_1024x1024.png"
              alt={brandName}
              className="h-20 w-auto opacity-90"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            {headline}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            {description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="text-base px-8 h-12 rounded-full">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 h-12 rounded-full">
              Explore Collections
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
