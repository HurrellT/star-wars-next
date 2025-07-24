export const extractIdFromUrl = (url: string): string => {
  // URL format: https://swapi.dev/api/people/1/
  if (!url) return '';
  
  const segments = url.split('/').filter(Boolean);
  return segments[segments.length - 1] || segments[segments.length - 2] || '';
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
