import { createClient } from '@sanity/client';
import { sanityConfig } from '@/sanity.config';

// Server-side client with write token - only use in API routes or Server Components
export const sanityClient = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
  token: process.env.SANITY_API_TOKEN, // Server-side only token
});

// Client-side client with read-only token - safe for client components
export const sanityClientWithToken = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: false,
  // Only use public token if you need client-side writes (not recommended)
  // For most cases, use API routes for write operations
  token: undefined, // Removed public token to prevent client-side writes
});
