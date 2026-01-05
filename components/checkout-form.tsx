'use client';

import { useState } from 'react';
import { Loader2, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
}

interface CheckoutFormProps {
  cart: CartItem[];
  total: number;
  onBack: () => void;
  onSuccess: () => void;
}

export function CheckoutForm({ cart, total, onBack, onSuccess }: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    city: '',
    postalCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            ...formData,
            items: cart,
            totalAmount: total,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      toast.success('Order placed successfully!');
      onSuccess();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold text-slate-900">Checkout</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Full Name</Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      placeholder="John Doe"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      name="customerEmail"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Phone Number</Label>
                  <Input
                    id="customerPhone"
                    name="customerPhone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingAddress">Shipping Address</Label>
                  <Input
                    id="shippingAddress"
                    name="shippingAddress"
                    placeholder="123 Main Street"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      placeholder="10001"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {isLoading ? 'Placing Order...' : 'Place Order'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-[300px] space-y-3 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-slate-900">{item.name}</p>
                        <p className="text-sm text-slate-600">
                          {item.size} x {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="border-t pt-2 flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-slate-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
