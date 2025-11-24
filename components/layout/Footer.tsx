'use client';

import Link from 'next/link';
import { Instagram, Facebook, Youtube, Mail, Heart } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-bold text-xl mb-4">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-gray-400 mb-4">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-sm text-gray-500">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/reviews" className="hover:text-emerald-400 transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/best-places" className="hover:text-emerald-400 transition-colors">
                  Best Places
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a
                href={SITE_CONFIG.author.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={SITE_CONFIG.author.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={SITE_CONFIG.author.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.author.social.email}`}
                className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-500">
              For collaborations and business inquiries
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 mt-2 flex items-center justify-center gap-1">
            Made with <Heart size={12} className="text-red-500 fill-red-500" /> for food lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
