import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  brandName: string;
  headline: string;
  description: string;
}

export default function Hero({ brandName, headline, description }: HeroProps) {
  const handleShopNowClick = () => {
    const element = document.getElementById('products');
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
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-background">
      {/* Doodle background */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="/assets/generated/doodle-pattern-bg.dim_1600x900.png"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>

      {/* Decorative sticker accents */}
      <div className="absolute top-20 right-12 w-24 h-24 opacity-60 animate-bounce hidden md:block">
        <img
          src="/assets/generated/jewelry-sparkle-sticker.dim_512x512.png"
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <div className="mb-6 inline-block transform hover:scale-105 transition-transform duration-300">
            <img
              src="/assets/generated/ksm-corporation-logo.dim_1024x1024.png"
              alt={brandName}
              className="h-24 w-auto drop-shadow-2xl"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
            {headline}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed max-w-2xl font-medium">
            {description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={handleShopNowClick}
              className="text-base px-8 h-14 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-accent border-4 border-primary/20"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 h-14 rounded-full border-4 hover:bg-primary/10 transform hover:scale-105 transition-all duration-300"
            >
              Explore Collections
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse" />
    </section>
  );
}
