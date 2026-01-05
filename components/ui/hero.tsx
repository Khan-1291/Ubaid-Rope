import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  const heroStyle = {
    // FIX 1: Wrap path in url()
    backgroundImage: "url('/images/hero.jpeg')", 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '90vh',
    width: '100%',
    color: 'white',
  };

  return (
    // FIX 2: Move heroStyle to the container that should have the background
    <section style={heroStyle} className="relative overflow-hidden">
      {/* Optional Overlay to make text readable on the image */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="container relative z-10 mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center min-h-screen">
        
        {/* Left Content */}
        <div>
          <span className="inline-block mb-4 rounded-full bg-black px-4 py-1 text-sm text-white">
            🔥 Best Deals Available
          </span>

          {/* FIX 3: Changed text colors to white/gray-200 for visibility against background image */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Shop Smarter <br />
            <span>Order Instantly</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200 max-w-xl">
            Discover premium products at unbeatable prices.  
            Order now and get instant support via WhatsApp.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#products"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-black font-medium hover:bg-gray-100 transition"
            >
              Shop Now
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="https://wa.me/923128057714"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-black/20 backdrop-blur-sm px-6 py-3 font-medium text-white hover:bg-white/10 transition"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative hidden lg:block">
          <div className="absolute -inset-6 rounded-3xl bg-black/20 blur-2xl"></div>
          <Image
            src="/hero-product.png" 
            alt="Hero Product"
            width={500}
            height={500}
            className="relative rounded-3xl object-cover"
            priority
          />
        </div>

      </div>
    </section>
  )
}
