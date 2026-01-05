'use client';
import Image from 'next/image';
import HeroSection from '@/components/ui/hero';
import VideoGallery from '@/components/ui/Gallery';
import { useState } from 'react';
import { ShoppingCart, Plus, Minus, X, Package, Ruler, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CheckoutForm } from '@/components/checkout-form';

interface Product {
  
  id: number;
  name: string;
  size: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  
    
}

interface CartItem extends Product {
  quantity: number;
}


const products: Product[] = [
  {
    id: 1,
    name: 'Cotton Rope 4mm',
    size: '4mm',
    price: 350.00,
    image: '/images/photo1.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium quality cotton rope, perfect for crafts and macramé',
    inStock: true,
  },
  {
    id: 2,
    name: 'Cotton Rope 6mm',
    size: '6mm',
    price: 350.00,
    image: '/images/photo2.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Versatile medium-thickness rope for various applications',
    inStock: true,
  },
  {
    id: 3,
    name: 'Cotton Rope 8mm',
    size: '8mm',
    price: 350.00,
    image: '/images/photo3.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Heavy-duty cotton rope for demanding projects',
    inStock: true,
  },
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

const orderNow = (product: Product) => {
  

  const message = `
Hello, I want to order this product:

🛒 Product: ${product.name}
💰 Price: ${product.price}
🔗 Product Link: ${window.location.href}
  `

  const whatsappUrl = `https://wa.me/923128057714?text=${encodeURIComponent(message)}`

  window.open(whatsappUrl, "_blank")
}


 
  


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Ubaid Rope</h1>
              <p className="text-sm text-slate-600">Premium Cotton Fabric</p>
            </div>
          </div>

        </div>
      </header>
<HeroSection/>
      <main className="container mx-auto px-4 py-12 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Premium Cotton Ropes
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            High-quality cotton fabric ropes available in multiple sizes for all
            your crafting, macramé, and project needs
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden transition-all hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.inStock && (
                  <Badge className="absolute right-4 top-4 bg-green-600">
                    <Check className="h-3 w-3 mr-1" />
                    In Stock
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Ruler className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Size: {product.size}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">
                    PKR{product.price.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => orderNow(product)}
                    size="lg"
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Order Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-20 rounded-2xl bg-slate-900 p-8 lg:p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              Why Choose Ubaid Rope?
            </h3>
            <p className="text-slate-300 text-lg mb-8">
              Premium quality cotton fabric ropes crafted for durability and
              versatility
            </p>
            <div className="grid gap-6 sm:grid-cols-3 text-left">
              <div className="rounded-xl bg-slate-800 p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-lg mb-2">100% Cotton</h4>
                <p className="text-sm text-slate-400">
                  Pure cotton fabric for the best quality and feel
                </p>
              </div>
              <div className="rounded-xl bg-slate-800 p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700">
                  <Ruler className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Multiple Sizes</h4>
                <p className="text-sm text-slate-400">
                  Available in 4mm, 6mm, and 8mm to suit any project
                </p>
              </div>
              <div className="rounded-xl bg-slate-800 p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-700">
                  <Package className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-lg mb-2">Fast Shipping</h4>
                <p className="text-sm text-slate-400">
                  Quick delivery to get your projects started
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <VideoGallery/>
        </section>
      </main>

      <footer className="border-t bg-slate-50 mt-20">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <div className="text-center text-slate-600">
            <p>&copy; 2026 Ubaid Rope. All rights reserved.</p>
            <p>Design & Devoelped by Zohaib Khan</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
