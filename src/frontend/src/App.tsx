import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StorefrontHeader from './components/StorefrontHeader';
import Hero from './components/Hero';
import CategoryShowcase from './components/CategoryShowcase';
import FeaturedCollections from './components/FeaturedCollections';
import TrustHighlights from './components/TrustHighlights';
import NewsletterCTA from './components/NewsletterCTA';
import Footer from './components/Footer';
import { useStorefrontConfig } from './hooks/useQueries';

const queryClient = new QueryClient();

function StorefrontApp() {
  const { data: config, isLoading, isError } = useStorefrontConfig();

  // Default fallback configuration
  const defaultConfig = {
    brandName: 'KSM Corporation',
    heroHeadline: 'Fashion for Everyone',
    heroDescription: 'From infants to adults, discover quality clothing, shoes, jewelry, and accessories all in one place. Style made simple.',
    categories: [
      {
        id: 'men',
        title: "Men's Collection",
        description: 'Casual, formal, and everyday essentials',
        imageUrl: '',
      },
      {
        id: 'women',
        title: "Women's Collection",
        description: 'Tops, bottoms, underwear, and bras',
        imageUrl: '',
      },
      {
        id: 'children',
        title: 'Children (2-12 years)',
        description: 'Durable and comfortable for active kids',
        imageUrl: '',
      },
      {
        id: 'infants',
        title: 'Infants (0-24 months)',
        description: 'Soft, gentle clothing for sensitive skin',
        imageUrl: '',
      },
      {
        id: 'jewelry',
        title: 'Jewelry',
        description: 'Elegant accessories for every occasion',
        imageUrl: '',
      },
      {
        id: 'shoes',
        title: 'Shoes & Footwear',
        description: 'Sneakers, boots, sandals for all ages',
        imageUrl: '',
      },
      {
        id: 'pets',
        title: 'Pet Clothing',
        description: 'Stylish outfits for dogs and cats',
        imageUrl: '',
      },
    ],
  };

  // Use fetched config or fallback to defaults
  const activeConfig = config || defaultConfig;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StorefrontHeader brandName={activeConfig.brandName} />
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
        <FeaturedCollections />
        <TrustHighlights />
        <NewsletterCTA />
      </main>
      <Footer brandName={activeConfig.brandName} />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StorefrontApp />
    </QueryClientProvider>
  );
}
