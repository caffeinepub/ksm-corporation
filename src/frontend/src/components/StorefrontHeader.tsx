import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useCart } from '../state/cart';
import CartSheet from './CartSheet';
import type { Category } from '../backend';

interface StorefrontHeaderProps {
  brandName: string;
  categories: Category[];
}

export default function StorefrontHeader({ brandName, categories }: StorefrontHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();

  const navItems = [
    ...categories.slice(0, 5).map((cat) => ({ id: cat.id, label: cat.title })),
    { id: 'products', label: 'Shop All' },
    { id: 'featured', label: 'Featured' },
  ];

  const handleNavClick = (id: string) => {
    // Check if it's a category (not 'products' or 'featured')
    const isCategory = categories.some(cat => cat.id === id);
    
    if (isCategory) {
      // Set hash to trigger category selection
      window.location.hash = id;
      
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
    } else {
      // For non-category items, scroll to the element directly
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
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavClick(item.id)}
                  className="relative font-semibold text-sm hover:text-primary transition-colors group rounded-lg"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-300" />
                </Button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative rounded-full hover:bg-primary/10"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full bg-accent">
                    {itemCount}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navItems.map((item) => (
                      <Button
                        key={item.id}
                        variant="ghost"
                        onClick={() => handleNavClick(item.id)}
                        className="justify-start text-lg font-semibold hover:text-primary hover:bg-primary/5 rounded-xl py-6 border-b border-border/30"
                      >
                        {item.label}
                      </Button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
