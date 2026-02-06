import { SiFacebook, SiX, SiInstagram, SiLinkedin } from 'react-icons/si';
import { Heart } from 'lucide-react';
import type { Category } from '../backend';

interface FooterProps {
  brandName: string;
  categories: Category[];
}

export default function Footer({ brandName, categories }: FooterProps) {
  const handleCategoryClick = (categoryId: string) => {
    // Set hash to trigger category selection
    window.location.hash = categoryId;
    
    // Scroll to products section
    const productsElement = document.getElementById('products');
    if (productsElement) {
      const headerOffset = 80;
      const elementPosition = productsElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/assets/generated/ksm-corporation-logo.dim_1024x1024.png" 
                alt={brandName}
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {brandName}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your one-stop destination for fashion, accessories, and lifestyle essentials.
            </p>
          </div>

          {/* Shop Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-200"
                  >
                    {category.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-200">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-200">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 inline-block transform duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <SiFacebook className="h-5 w-5 text-primary" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <SiX className="h-5 w-5 text-primary" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <SiInstagram className="h-5 w-5 text-primary" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <SiLinkedin className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2026. Built with <Heart className="inline h-4 w-4 text-accent fill-accent" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
