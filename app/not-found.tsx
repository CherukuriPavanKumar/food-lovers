import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-emerald-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" className="inline-flex items-center gap-2 w-full sm:w-auto">
              <Home size={18} />
              Go Home
            </Button>
          </Link>
          
          <Link href="/reviews">
            <Button variant="outline" className="inline-flex items-center gap-2 w-full sm:w-auto">
              <Search size={18} />
              Browse Reviews
            </Button>
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500">
            Looking for something specific? Try our{' '}
            <Link href="/reviews" className="text-emerald-600 hover:underline">
              reviews page
            </Link>
            {' '}or{' '}
            <Link href="/best-places" className="text-emerald-600 hover:underline">
              best places
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
