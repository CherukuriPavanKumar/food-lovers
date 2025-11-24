import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vizagfoodexplorer.com';
  
  // Static pages
  const routes = ['', '/about', '/contact', '/reviews', '/best-places'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // TODO: Add dynamic restaurant pages when you have data
  // const restaurants = await getRestaurants();
  // const restaurantPages = restaurants.map((restaurant) => ({
  //   url: `${baseUrl}/reviews/${restaurant.slug}`,
  //   lastModified: new Date(restaurant.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }));

  return routes;
}
