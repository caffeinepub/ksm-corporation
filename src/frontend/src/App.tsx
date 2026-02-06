import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import StorefrontHeader from './components/StorefrontHeader';
import Hero from './components/Hero';
import CategoryShowcase from './components/CategoryShowcase';
import ProductsSection from './components/ProductsSection';
import FeaturedCollections from './components/FeaturedCollections';
import TrustHighlights from './components/TrustHighlights';
import NewsletterCTA from './components/NewsletterCTA';
import Footer from './components/Footer';
import { useStorefrontConfig } from './hooks/useQueries';
import { CartProvider } from './state/cart';

const queryClient = new QueryClient();

function StorefrontApp() {
  const { data: config } = useStorefrontConfig();

  // Default fallback configuration matching backend category set
  const defaultConfig = {
    brandName: 'Linden-Storefront',
    heroHeadline: 'Explore the Latest Fashion',
    heroDescription: 'Clothing essentials for women, men, and children, plus accessories and jewelry. Shop high-quality shoes and bags and enjoy convenient buying experience.',
    categories: [
      {
        id: 'womens-clothing',
        title: "Women's Clothing",
        description: 'Modern styles and timeless classics for women.',
        imageUrl: '',
      },
      {
        id: 'mens-clothing',
        title: "Men's Clothing",
        description: 'Fashionable and functional apparel for men.',
        imageUrl: '',
      },
      {
        id: 'childrens-clothing',
        title: "Children's Clothing",
        description: 'Fun, durable clothing for kids of all ages.',
        imageUrl: '',
      },
      {
        id: 'infant-clothing',
        title: 'Infant Clothing',
        description: 'Soft, safe clothing for newborns and babies.',
        imageUrl: '',
      },
      {
        id: 'shoes',
        title: 'Shoes',
        description: 'Footwear for every occasion and season.',
        imageUrl: '',
      },
      {
        id: 'jewelry',
        title: 'Jewelry',
        description: 'Elegant and trendy jewelry and accessories.',
        imageUrl: '',
      },
      {
        id: 'accessories',
        title: 'Accessories',
        description: 'Handbags, wallets, scarves, and more',
        imageUrl: '',
      },
      {
        id: 'bags',
        title: 'Bags',
        description: 'Totes, crossbody bags, backpacks, and luggage',
        imageUrl: '',
      },
    ],
  };

  // Use fetched config or fallback to defaults
  const activeConfig = config || defaultConfig;

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <StorefrontHeader brandName={activeConfig.brandName} categories={activeConfig.categories} />
        <main className="flex-1">
          <Hero
            brandName={activeConfig.brandName}
            headline={activeConfig.heroHeadline}
            description={activeConfig.heroDescription}
          />
          <CategoryShowcase
            brandName={activeConfig.brandName}
            categories={activeConfig.categories}
          />
          <ProductsSection categories={activeConfig.categories} />
          <FeaturedCollections />
          <TrustHighlights />
          <NewsletterCTA />
        </main>
        <Footer brandName={activeConfig.brandName} categories={activeConfig.categories} />
        <Toaster />
      </div>
    </CartProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StorefrontApp />
    </QueryClientProvider>
  );
}
