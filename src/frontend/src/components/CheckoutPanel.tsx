import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
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
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (orderId) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
          <p className="text-muted-foreground mb-4">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <div className="bg-muted/50 rounded-2xl p-4 mb-6 border-2 border-dashed border-border">
            <p className="text-sm text-muted-foreground mb-1">Order ID</p>
            <p className="font-mono font-bold text-lg">{orderId}</p>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            We've sent a confirmation email to {formData.email}
          </p>
          <Button onClick={onClose} size="lg" className="rounded-full">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2 rounded-full">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Button>
        <h2 className="text-2xl font-bold">Checkout</h2>
        <p className="text-sm text-muted-foreground">Complete your order</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
                className="rounded-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
                className="rounded-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Shipping Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Main St, City, Country, ZIP"
                required
                rows={3}
                className="rounded-2xl"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    {formatPrice(item.price * item.quantity, item.currency)}
                  </span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">
                {formatPrice(totalAmount, items[0]?.currency || 'EUR')}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full"
            disabled={placeOrderMutation.isPending}
          >
            {placeOrderMutation.isPending ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Place Order'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
