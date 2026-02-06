import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
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
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || 'men');
  const [selectedStyle, setSelectedStyle] = useState<RegionStyle | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { addItem } = useCart();

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

    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-background via-primary/5 to-accent/10 scroll-mt-20 relative overflow-hidden">
      {/* Decorative wavy divider */}
      <div className="absolute top-0 left-0 w-full h-24 -mt-1">
        <img
          src="/assets/generated/wavy-divider.dim_1600x240.png"
          alt=""
          className="w-full h-full object-cover opacity-50"
          aria-hidden="true"
        />
      </div>

      {/* Decorative stickers */}
      <div className="absolute top-32 right-8 w-32 h-32 opacity-20 animate-pulse hidden lg:block">
        <img
          src="/assets/generated/sneaker-sticker.dim_512x512.png"
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="absolute bottom-32 left-8 w-40 h-40 opacity-20 animate-pulse hidden lg:block">
        <img
          src="/assets/generated/clothing-rack-sticker.dim_768x768.png"
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Shop Our Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our carefully curated selection of clothing and accessories
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex justify-center">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full max-w-4xl">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 h-auto p-2 bg-card/50 backdrop-blur-sm rounded-2xl border-2 border-border/50">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
                >
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Style Filter */}
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="flex flex-wrap gap-2 justify-center bg-card/50 backdrop-blur-sm rounded-2xl border-2 border-border/50 p-3">
              <Button
                variant={selectedStyle === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStyle('all')}
                className="rounded-full"
              >
                All Styles
              </Button>
              {styleOptions.map((style) => (
                <Button
                  key={style}
                  variant={selectedStyle === style ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStyle(style)}
                  className="rounded-full"
                >
                  {getStyleLabel(style)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">
              Oops! We couldn't load the products. Please try again later.
            </p>
            <Button onClick={() => window.location.reload()} className="rounded-full">
              Retry
            </Button>
          </div>
        )}

        {!isLoading && !isError && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">
              {selectedStyle === 'all' 
                ? 'No products available in this category yet. Check back soon!'
                : `No ${getStyleLabel(selectedStyle as RegionStyle)} style products available in this category.`
              }
            </p>
          </div>
        )}

        {!isLoading && !isError && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
                onAddToCart={handleQuickAdd}
              />
            ))}
          </div>
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
