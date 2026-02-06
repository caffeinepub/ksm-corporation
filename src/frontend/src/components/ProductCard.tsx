import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Eye, Sparkles } from 'lucide-react';
import type { Product } from '../backend';
import { getStyleLabel } from '../hooks/useQueries';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  const price = Number(product.price) / 100;

  return (
    <Card className="group overflow-hidden border border-border/40 hover:border-primary/40 transition-all duration-500 hover:shadow-luxury product-hover bg-card rounded-2xl">
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Stock badges */}
        {!product.inStock && (
          <Badge className="absolute top-4 right-4 bg-destructive/95 text-destructive-foreground border border-background/20 rounded-full px-3 py-1.5 font-semibold shadow-lg backdrop-blur-sm">
            Sold Out
          </Badge>
        )}
        {product.inStock && Number(product.stockCount) < 5 && (
          <Badge className="absolute top-4 right-4 bg-amber-500/95 text-white border border-background/20 rounded-full px-3 py-1.5 font-semibold shadow-lg backdrop-blur-sm">
            Only {Number(product.stockCount)} Left
          </Badge>
        )}
        
        {/* New/Featured badge */}
        {product.inStock && Number(product.stockCount) > 10 && (
          <Badge className="absolute top-4 left-4 bg-success/95 text-success-foreground border border-background/20 rounded-full px-3 py-1.5 font-semibold shadow-lg backdrop-blur-sm">
            <Sparkles className="h-3 w-3 mr-1 inline" />
            New
          </Badge>
        )}
      </div>
      
      <CardContent className="p-5 space-y-3">
        <div className="space-y-2">
          <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        {/* Style Tags */}
        {product.styleTags && product.styleTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.styleTags.slice(0, 3).map((style) => (
              <Badge
                key={style}
                variant="secondary"
                className="text-xs rounded-full px-2.5 py-0.5 font-medium border border-border/50"
              >
                {getStyleLabel(style)}
              </Badge>
            ))}
            {product.styleTags.length > 3 && (
              <Badge
                variant="secondary"
                className="text-xs rounded-full px-2.5 py-0.5 font-medium border border-border/50"
              >
                +{product.styleTags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {product.currency === 'EUR' ? '€' : '$'}
            {price.toFixed(2)}
          </span>
          {product.sizes && product.sizes.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {product.sizes.length} size{product.sizes.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(product)}
          className="flex-1 rounded-full border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
        >
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
        <Button
          size="sm"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="flex-1 rounded-full shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          {product.inStock ? 'Add' : 'Unavailable'}
        </Button>
      </CardFooter>
    </Card>
  );
}

