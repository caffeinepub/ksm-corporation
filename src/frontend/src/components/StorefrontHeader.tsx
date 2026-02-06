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
    ...categories.map((cat) => ({ id: cat.id, label: cat.title })),
    { id: 'products', label: 'Shop All' },
    { id: 'featured', label: 'Featured' },
    { id: 'why-us', label: 'Why Us' },
  ];

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
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b-4 border-primary/20 bg-gradient-to-r from-background via-primary/5 to-accent/5 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/ksm-corporation-logo-horizontal.dim_1600x400.png"
                alt={`${brandName} logo`}
                className="h-12 w-auto drop-shadow-md"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.slice(0, 5).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-sm font-bold text-foreground/80 hover:text-primary transition-colors hover:scale-110 transform duration-200"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden md:flex rounded-full hover:bg-primary/10">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search {brandName}</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative rounded-full hover:bg-primary/10"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground rounded-full border-2 border-background">
                    {itemCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping bag ({itemCount} items)</span>
              </Button>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden rounded-full hover:bg-primary/10">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] rounded-l-3xl border-l-2">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className="text-left text-lg font-bold text-foreground/80 hover:text-primary transition-colors py-2 hover:translate-x-2 transform duration-200"
                      >
                        {item.label}
                      </button>
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
