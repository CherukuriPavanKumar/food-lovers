import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import AllSections from '@/components/home/AllSections';
import BackToTop from '@/components/ui/BackToTop';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
  keywords: ['food review', 'visakhapatnam', 'vizag', 'restaurants', 'food blogger'],
  authors: [{ name: SITE_CONFIG.author.name }],
  openGraph: {
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    type: 'website',
    locale: 'en_IN',
  }
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AllSections />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
