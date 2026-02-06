import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import type { Product } from '../backend';
import { useCart } from '../state/cart';
import { toast } from 'sonner';
import { getStyleLabel } from '../hooks/useQueries';

interface ProductDetailDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductDetailDialog({ product, open, onOpenChange }: ProductDetailDialogProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  // Reset selections when dialog opens or product changes
  useEffect(() => {
    if (open && product) {
      setSelectedSize('');
      setSelectedColor('');
      setQuantity(1);
    }
  }, [open, product?.id]);

  if (!product) return null;

  const price = Number(product.price) / 100;

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (product.colors.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      currency: product.currency,
      imageUrl: product.imageUrl,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      quantity,
    });

    toast.success(`Added ${quantity} ${product.name} to cart`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border-2">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted/30">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {!product.inStock && (
              <Badge className="absolute top-3 right-3 bg-destructive/90 text-destructive-foreground border-2 border-background rounded-full">
                Out of Stock
              </Badge>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {product.currency === 'EUR' ? '€' : '$'}
                {price.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground">
                {product.inStock
                  ? `${product.stockCount} in stock`
                  : 'Currently unavailable'}
              </p>
            </div>

            {/* Style Tags */}
            {product.styleTags && product.styleTags.length > 0 && (
              <div className="space-y-2">
                <Label>Style</Label>
                <div className="flex flex-wrap gap-2">
                  {product.styleTags.map((style) => (
                    <Badge
                      key={style}
                      variant="secondary"
                      className="rounded-full px-3 py-1"
                    >
                      {getStyleLabel(style)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div className="space-y-2">
                <Label>Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {product.colors.length > 0 && (
              <div className="space-y-2">
                <Label>Color</Label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Quantity</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="rounded-full"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(Number(product.stockCount), quantity + 1))}
                  disabled={quantity >= Number(product.stockCount)}
                  className="rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            size="lg"
            className="w-full rounded-full"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
