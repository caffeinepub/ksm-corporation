import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import { Heart } from 'lucide-react';
import type { Category } from '../backend';

interface FooterProps {
  brandName: string;
  categories: Category[];
}

export default function Footer({ brandName, categories }: FooterProps) {
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
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
    <footer className="bg-gradient-to-br from-card via-primary/5 to-accent/5 border-t-4 border-primary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <img
              src="/assets/generated/ksm-corporation-logo-horizontal.dim_1600x400.png"
              alt={`${brandName} logo`}
              className="h-10 w-auto mb-4 drop-shadow-md"
            />
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed font-medium">
              Fashion for everyone. Quality clothing, shoes, jewelry, and accessories from infants to adults,
              all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black mb-4 text-lg">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-medium">
              {categories.slice(0, 4).map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => handleNavClick(category.id)}
                    className="hover:text-primary transition-colors hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {category.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNavClick('products')}
                  className="hover:text-primary transition-colors hover:translate-x-1 transform duration-200 inline-block"
                >
                  Shop All
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-black mb-4 text-lg">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-medium">
              <li>
                <button
                  onClick={() => handleNavClick('featured')}
                  className="hover:text-primary transition-colors hover:translate-x-1 transform duration-200 inline-block"
                >
                  Featured
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('why-us')}
                  className="hover:text-primary transition-colors hover:translate-x-1 transform duration-200 inline-block"
                >
                  Why Us
                </button>
              </li>
              <li><a href="#about" className="hover:text-primary transition-colors hover:translate-x-1 transform duration-200 inline-block">About Us</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors hover:translate-x-1 transform duration-200 inline-block">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left font-medium">
            © 2026. Built with <Heart className="inline h-4 w-4 text-red-500 fill-red-500 animate-pulse" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline font-bold"
            >
              caffeine.ai
            </a>
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-all transform hover:scale-125 duration-200"
              aria-label="Facebook"
            >
              <SiFacebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-all transform hover:scale-125 duration-200"
              aria-label="Instagram"
            >
              <SiInstagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-all transform hover:scale-125 duration-200"
              aria-label="X (Twitter)"
            >
              <SiX className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
