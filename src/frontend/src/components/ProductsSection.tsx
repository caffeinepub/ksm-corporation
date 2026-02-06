import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductDetailDialog from './ProductDetailDialog';
import { useProductsByCategory, getStyleOptions, getStyleLabel } from '../hooks/useQueries';
import type { Product, Category, RegionStyle } from '../backend';
import { useCart } from '../state/cart';
import { toast } from 'sonner';

interface ProductsSectionProps {
  categories: Category[];
}

export default function ProductsSection({ categories }: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || 'womens-clothing');
  const [selectedStyle, setSelectedStyle] = useState<RegionStyle | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { addItem } = useCart();

  // Handle hash-based navigation for category selection
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove '#'
      if (hash && categories.some(cat => cat.id === hash)) {
        setSelectedCategory(hash);
      }
    };

    // Check initial hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [categories]);

  // Update hash when category changes via tabs
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    window.location.hash = categoryId;
  };

  const { data: products = [], isLoading, isError } = useProductsByCategory(selectedCategory);

  // Get available style options
  const styleOptions = getStyleOptions();

  // Filter products by selected style
  const filteredProducts = selectedStyle === 'all' 
    ? products 
    : products.filter(product => 
        product.styleTags.includes(selectedStyle as RegionStyle)
      );

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    if (!product.inStock) {
      toast.error('This product is out of stock');
      return;
    }

    // Quick add with defaults (first size/color if available)
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      currency: product.currency,
      imageUrl: product.imageUrl,
      size: product.sizes[0] || undefined,
      color: product.colors[0] || undefined,
      quantity: 1,
    });

    toast.success(`Added ${product.name} to cart`, {
      description: 'View your cart to complete checkout',
    });
  };

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <section id="products" className="py-24 bg-gradient-to-br from-background via-primary/3 to-accent/5 scroll-mt-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background/80 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-12 w-40 h-40 opacity-10 animate-float hidden lg:block">
        <img
          src="/assets/generated/sneaker-sticker.dim_512x512.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute bottom-20 left-12 w-48 h-48 opacity-10 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>
        <img
          src="/assets/generated/clothing-rack-sticker.dim_768x768.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Premium Collection</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold display-heading bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Discover Your Style
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Curated fashion pieces from around the world, designed to elevate your wardrobe
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex justify-center">
          <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full max-w-5xl">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 h-auto p-2 bg-card/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-soft">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md font-semibold transition-all duration-300 py-3 text-xs md:text-sm"
                >
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Category description */}
        {currentCategory && (
          <div className="text-center mb-8">
            <p className="text-muted-foreground max-w-xl mx-auto">
              {currentCategory.description}
            </p>
          </div>
        )}

        {/* Style Filter */}
        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="flex flex-wrap gap-2 justify-center bg-card/80 backdrop-blur-md rounded-2xl border border-border/50 p-4 shadow-soft">
              <Button
                variant={selectedStyle === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStyle('all')}
                className="rounded-full font-medium transition-all duration-300 hover:scale-105"
              >
                All Styles
              </Button>
              {styleOptions.map((style) => (
                <Button
                  key={style}
                  variant={selectedStyle === style ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStyle(style)}
                  className="rounded-full font-medium transition-all duration-300 hover:scale-105"
                >
                  {getStyleLabel(style)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center py-24 space-y-4">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="text-muted-foreground font-medium">Loading our collection...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-24 space-y-4">
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">😔</span>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              Oops! We couldn't load the products. Please try again later.
            </p>
            <Button onClick={() => window.location.reload()} className="rounded-full shadow-md">
              Retry
            </Button>
          </div>
        )}

        {!isLoading && !isError && filteredProducts.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <p className="text-lg text-muted-foreground">
              {selectedStyle === 'all' 
                ? 'No products available in this category yet. Check back soon for new arrivals!'
                : `No ${getStyleLabel(selectedStyle as RegionStyle)} style products available in this category.`
              }
            </p>
            {selectedStyle !== 'all' && (
              <Button 
                onClick={() => setSelectedStyle('all')} 
                variant="outline" 
                className="rounded-full mt-4"
              >
                View All Styles
              </Button>
            )}
          </div>
        )}

        {!isLoading && !isError && filteredProducts.length > 0 && (
          <>
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                  onAddToCart={handleQuickAdd}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <ProductDetailDialog
        product={selectedProduct}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </section>
  );
}
