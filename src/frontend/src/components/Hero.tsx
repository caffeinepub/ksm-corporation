import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';

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
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background min-h-[85vh] flex items-center">
      {/* Doodle background */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/assets/generated/doodle-pattern-bg.dim_1600x900.png"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>

      {/* Decorative sticker accents */}
      <div className="absolute top-24 right-16 w-32 h-32 opacity-40 animate-float hidden lg:block">
        <img
          src="/assets/generated/jewelry-sparkle-sticker.dim_512x512.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain sticker-shadow"
        />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-4xl">
          {/* Logo */}
          <div className="mb-8 inline-block transform hover:scale-105 transition-transform duration-300">
            <img
              src="/assets/generated/ksm-corporation-logo.dim_1024x1024.png"
              alt={brandName}
              className="h-28 w-auto drop-shadow-2xl"
            />
          </div>
          
          {/* Main headline */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 display-heading">
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
              {headline}
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-foreground/70 mb-10 leading-relaxed max-w-2xl font-medium">
            {description}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={handleShopNowClick}
              className="text-lg px-10 h-16 rounded-full shadow-luxury hover:shadow-fashion transform hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-accent border-2 border-primary/20 font-bold"
            >
              <ShoppingBag className="mr-2 h-6 w-6" />
              Shop Now
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.getElementById('featured');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="text-lg px-10 h-16 rounded-full border-2 hover:bg-primary/5 hover:border-primary/50 transform hover:scale-105 transition-all duration-300 font-bold"
            >
              <Sparkles className="mr-2 h-6 w-6" />
              Explore Collections
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-medium">Free Shipping Over €100</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-medium">30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient blobs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
}

