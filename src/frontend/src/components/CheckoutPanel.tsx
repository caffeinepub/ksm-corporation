import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { useCart } from '../state/cart';
import { usePlaceOrder } from '../hooks/useQueries';
import { toast } from 'sonner';

interface CheckoutPanelProps {
  onBack: () => void;
  onClose: () => void;
}

export default function CheckoutPanel({ onBack, onClose }: CheckoutPanelProps) {
  const { items, totalAmount, clearCart } = useCart();
  const placeOrderMutation = usePlaceOrder();
  const [orderId, setOrderId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const formatPrice = (price: number, currency: string) => {
    const amount = price / 100;
    const symbol = currency === 'EUR' ? '€' : '$';
    return `${symbol}${amount.toFixed(2)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address) {
      toast.error('Please fill in all fields');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      const lineItems = items.map((item) => ({
        productId: item.productId,
        quantity: BigInt(item.quantity),
        size: item.size || undefined,
        color: item.color || undefined,
      }));

      const newOrderId = await placeOrderMutation.mutateAsync({
        buyerName: formData.name,
        buyerEmail: formData.email,
        shippingAddress: formData.address,
        lineItems,
        currency: items[0]?.currency || 'EUR',
      });

      setOrderId(newOrderId);
      clearCart();
      toast.success('Order placed successfully!', {
        description: 'Check your email for confirmation',
      });
    } catch (error) {
      console.error('Order error:', error);
      
      // Provide user-friendly error message
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to place order. Please check your cart and try again.';
      
      toast.error('Order Failed', {
        description: errorMessage,
      });
    }
  };

  if (orderId) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center mb-8 shadow-luxury">
            <CheckCircle2 className="h-14 w-14 text-success" />
          </div>
          <h2 className="text-3xl font-bold mb-3 display-heading">Order Confirmed!</h2>
          <p className="text-muted-foreground mb-6 text-lg">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-6 mb-8 border border-border/50 shadow-soft max-w-md w-full">
            <p className="text-sm text-muted-foreground mb-2 font-medium">Order ID</p>
            <p className="font-mono font-bold text-xl text-primary">{orderId}</p>
          </div>
          <p className="text-sm text-muted-foreground mb-10 max-w-md">
            We've sent a confirmation email to <span className="font-semibold text-foreground">{formData.email}</span>
          </p>
          <Button onClick={onClose} size="lg" className="rounded-full shadow-md hover:shadow-lg transition-all duration-300 px-8">
            <Sparkles className="mr-2 h-5 w-5" />
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2 rounded-full hover:bg-primary/5">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Button>
        <h2 className="text-3xl font-bold display-heading">Checkout</h2>
        <p className="text-sm text-muted-foreground mt-1">Complete your order securely</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-semibold">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
                className="rounded-xl h-12 border-border/50 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
                className="rounded-xl h-12 border-border/50 focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="font-semibold">Shipping Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Main St, City, Country, ZIP"
                required
                rows={3}
                className="rounded-xl border-border/50 focus:border-primary transition-colors resize-none"
              />
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4 bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl p-5 border border-border/50">
            <h3 className="font-bold text-lg">Order Summary</h3>
            <div className="space-y-3 text-sm">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <span className="text-foreground font-medium block">{item.name}</span>
                    <span className="text-muted-foreground text-xs">
                      Qty: {item.quantity}
                      {item.size && ` • Size: ${item.size}`}
                      {item.color && ` • Color: ${item.color}`}
                    </span>
                  </div>
                  <span className="font-semibold text-foreground whitespace-nowrap">
                    {formatPrice(item.price * item.quantity, item.currency)}
                  </span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {formatPrice(totalAmount, items[0]?.currency || 'EUR')}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 space-y-3">
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full h-14 shadow-md hover:shadow-lg transition-all duration-300 text-base font-bold"
            disabled={placeOrderMutation.isPending || items.length === 0}
          >
            {placeOrderMutation.isPending ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Processing Order...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Place Order
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            By placing your order, you agree to our terms and conditions
          </p>
        </div>
      </form>
    </div>
  );
}
