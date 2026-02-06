import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Eye } from 'lucide-react';
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
    <Card className="group overflow-hidden border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 rounded-3xl">
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {!product.inStock && (
          <Badge className="absolute top-3 right-3 bg-destructive/90 text-destructive-foreground border-2 border-background rounded-full px-3 py-1">
            Out of Stock
          </Badge>
        )}
        {product.inStock && Number(product.stockCount) < 5 && (
          <Badge className="absolute top-3 right-3 bg-amber-500/90 text-white border-2 border-background rounded-full px-3 py-1">
            Low Stock
          </Badge>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        
        {/* Style Tags */}
        {product.styleTags && product.styleTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.styleTags.map((style) => (
              <Badge
                key={style}
                variant="secondary"
                className="text-xs rounded-full px-2 py-0.5"
              >
                {getStyleLabel(style)}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            {product.currency === 'EUR' ? '€' : '$'}
            {price.toFixed(2)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(product)}
          className="flex-1 rounded-full border-2 hover:bg-primary/10"
        >
          <Eye className="h-4 w-4 mr-2" />
          Details
        </Button>
        <Button
          size="sm"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="flex-1 rounded-full"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
