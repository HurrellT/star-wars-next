import { extractIdFromUrl, formatDate } from '@/utils/personUtils';

describe('Person Utilities', () => {
  describe('extractIdFromUrl', () => {
    it('should extract ID from SWAPI URL with trailing slash', () => {
      const url = 'https://swapi.info/api/people/1/';
      const result = extractIdFromUrl(url);
      expect(result).toBe('1');
    });

    it('should extract ID from SWAPI URL without trailing slash', () => {
      const url = 'https://swapi.info/api/people/42';
      const result = extractIdFromUrl(url);
      expect(result).toBe('42');
    });

    it('should handle different resource types', () => {
      const filmUrl = 'https://swapi.info/api/films/4/';
      const planetUrl = 'https://swapi.info/api/planets/8/';
      
      expect(extractIdFromUrl(filmUrl)).toBe('4');
      expect(extractIdFromUrl(planetUrl)).toBe('8');
    });

    it('should handle edge cases gracefully', () => {
      expect(extractIdFromUrl('https://swapi.info/api/people/')).toBe('people');
      expect(extractIdFromUrl('invalid-url')).toBe('invalid-url');
      expect(extractIdFromUrl('')).toBe('');
    });
  });

  describe('formatDate', () => {
    it('should format ISO datetime string correctly', () => {
      const dateString = '2014-12-09T13:50:51.644000Z';
      const result = formatDate(dateString);
      expect(result).toBe('December 9, 2014');
    });

    it('should handle different date formats', () => {
      const dateString = '2024-01-15T00:00:00.000Z';
      const result = formatDate(dateString);
      expect(result).toBe('January 14, 2024');
    });

    it('should handle valid date strings from our Zod schema', () => {
      // Test with dates that would pass our PersonSchema validation
      const validDates = [
        '2014-12-09T13:50:51.644000Z',
        '2014-12-20T21:17:56.891000Z',
        '2024-07-23T10:30:00.000Z',
      ];

      validDates.forEach(dateString => {
        const result = formatDate(dateString);
        expect(result).toMatch(/^[A-Z][a-z]+ \d{1,2}, \d{4}$/); // Format: "Month Day, Year"
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Integration with Zod Schema Validation', () => {
    it('should work correctly with URLs that pass PersonSchema validation', () => {
      // These URLs would pass the z.url() validation in our PersonSchema
      const validUrls = [
        'https://swapi.info/api/people/1',
        'https://swapi.info/api/films/1',
        'https://swapi.info/api/planets/1',
        'https://swapi.info/api/species/1',
        'https://swapi.info/api/vehicles/14',
        'https://swapi.info/api/starships/12',
      ];

      validUrls.forEach(url => {
        const id = extractIdFromUrl(url);
        expect(id).toBeTruthy();
        expect(typeof id).toBe('string');
        expect(id).not.toBe('');
      });
    });

    it('should handle datetime strings that pass PersonSchema validation', () => {
      // These datetime strings would pass the z.iso.datetime() validation
      const validDatetimes = [
        '2014-12-09T13:50:51.644000Z',
        '2014-12-20T21:17:56.891000Z',
        '2024-01-01T00:00:00.000000Z',
      ];

      validDatetimes.forEach(datetime => {
        const formatted = formatDate(datetime);
        expect(formatted).toBeTruthy();
        expect(typeof formatted).toBe('string');
        expect(formatted).toMatch(/\d{4}/); // Should contain a year
      });
    });
  });
});
