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

  // Default fallback configuration
  const defaultConfig = {
    brandName: 'Linden Storefront',
    heroHeadline: 'Clothing for every occasion',
    heroDescription: 'Discover our latest collection of men\'s, women\'s, and children\'s clothing. Shop now and enjoy free delivery in Europe for orders above 100€.',
    categories: [
      {
        id: 'men',
        title: 'Men',
        description: 'Fashion and accessories for men',
        imageUrl: '',
      },
      {
        id: 'women',
        title: 'Women',
        description: 'Latest trends for women',
        imageUrl: '',
      },
      {
        id: 'children',
        title: 'Children',
        description: 'Clothing for kids',
        imageUrl: '',
      },
      {
        id: 'infants',
        title: 'Infants',
        description: 'Fashion for babies',
        imageUrl: '',
      },
      {
        id: 'jewelry',
        title: 'Jewelry',
        description: 'Accessories for all occasions',
        imageUrl: '',
      },
      {
        id: 'shoes',
        title: 'Shoes',
        description: 'Footwear for everyone',
        imageUrl: '',
      },
      {
        id: 'pets',
        title: 'Pets',
        description: 'Pet fashion and accessories',
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
