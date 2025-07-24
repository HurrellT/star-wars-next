import { getPeople, getPersonById } from '@/services/people/people';
import { PersonSchema, GetPeopleResponseSchema } from '@/services/people/peopleSchema';

// Mock fetch globally
global.fetch = jest.fn();

describe('Integration: API + Zod Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPersonData = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    homeworld: 'https://swapi.info/api/planets/1',
    films: ['https://swapi.info/api/films/1', 'https://swapi.info/api/films/2'],
    species: ['https://swapi.info/api/species/1'],
    vehicles: ['https://swapi.info/api/vehicles/14'],
    starships: ['https://swapi.info/api/starships/12'],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.info/api/people/1',
  };

  describe('End-to-End Data Flow', () => {
    it('should fetch data from API and validate with Zod schemas', async () => {
      // 1. Mock API response
      const mockFetch = jest.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [mockPersonData],
      } as Response);

      // 2. Fetch data through our service
      const people = await getPeople();

      // 3. Verify Zod validation worked
      const validation = GetPeopleResponseSchema.safeParse(people);
      expect(validation.success).toBe(true);

      // 4. Verify the validated data structure
      if (validation.success) {
        expect(validation.data).toHaveLength(1);
        expect(validation.data[0].name).toBe('Luke Skywalker');
        expect(validation.data[0].height).toBe('172');
        expect(validation.data[0].mass).toBe('77');
        expect(validation.data[0].films).toHaveLength(2);
      }
    });

    it('should handle individual person fetch with Zod validation', async () => {
      // 1. Mock API response for single person
      const mockFetch = jest.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPersonData,
      } as Response);

      // 2. Fetch single person
      const person = await getPersonById('1');

      // 3. Verify Zod schema validation
      const validation = PersonSchema.safeParse(person);
      expect(validation.success).toBe(true);
      
      if (validation.success) {
        // 4. Verify the validated data structure
        expect(validation.data.name).toBe('Luke Skywalker');
        expect(validation.data.films).toHaveLength(2);
        expect(validation.data.species).toHaveLength(1);
        expect(typeof validation.data.height).toBe('string');
        expect(typeof validation.data.mass).toBe('string');
        expect(validation.data.height).toBe('172');
        expect(validation.data.mass).toBe('77');
        expect(validation.data.gender).toBe('male');
      }
    });

    it('should properly handle API errors and Zod validation failures', async () => {
      // Test API error handling
      const mockFetch = jest.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(getPeople()).rejects.toThrow('Network response was not ok');

      // Test Zod validation failure
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [{ invalid: 'data' }],
      } as Response);

      await expect(getPeople()).rejects.toThrow('Invalid data received from API');
    });

    it('should validate complex data structures with nested arrays', async () => {
      const complexPersonData = {
        ...mockPersonData,
        films: [
          'https://swapi.info/api/films/1',
          'https://swapi.info/api/films/2',
          'https://swapi.info/api/films/3',
        ],
        species: [], // Empty array
        vehicles: ['https://swapi.info/api/vehicles/14'],
        starships: [
          'https://swapi.info/api/starships/12',
          'https://swapi.info/api/starships/22',
        ],
      };

      // Test Zod validation on complex structure
      const validation = PersonSchema.safeParse(complexPersonData);
      expect(validation.success).toBe(true);

      if (validation.success) {
        expect(validation.data.films).toHaveLength(3);
        expect(validation.data.species).toHaveLength(0);
        expect(validation.data.vehicles).toHaveLength(1);
        expect(validation.data.starships).toHaveLength(2);

        // Verify all URLs in arrays are valid
        validation.data.films.forEach(url => {
          expect(url).toMatch(/^https?:\/\/.+/);
        });
        validation.data.starships.forEach(url => {
          expect(url).toMatch(/^https?:\/\/.+/);
        });
      }
    });

    it('should ensure type safety between Zod schema and TypeScript types', () => {
      // This test verifies that our Zod-generated types work correctly
      const validation = PersonSchema.safeParse(mockPersonData);
      expect(validation.success).toBe(true);

      if (validation.success) {
        // Verify that TypeScript types are working correctly
        const person = validation.data;
        expect(typeof person.name).toBe('string');
        expect(Array.isArray(person.films)).toBe(true);
        expect(Array.isArray(person.species)).toBe(true);
        expect(Array.isArray(person.vehicles)).toBe(true);
        expect(Array.isArray(person.starships)).toBe(true);
        
        // Verify type-safe access to properties
        expect(person.name).toBe('Luke Skywalker');
        expect(person.height).toBe('172');
        expect(person.mass).toBe('77');
        expect(person.gender).toBe('male');
        expect(person.films).toContain('https://swapi.info/api/films/1');
        expect(person.species).toContain('https://swapi.info/api/species/1');
      }
    });
  });

  describe('Schema Evolution and Compatibility', () => {
    it('should handle additional fields gracefully (forward compatibility)', () => {
      const dataWithExtraFields = {
        ...mockPersonData,
        // Additional fields that might be added in future API versions
        extraField: 'some value',
        newArray: ['item1', 'item2'],
      };

      // Zod should ignore extra fields by default
      const validation = PersonSchema.safeParse(dataWithExtraFields);
      expect(validation.success).toBe(true);

      if (validation.success) {
        // Extra fields should not be present in validated data
        expect('extraField' in validation.data).toBe(false);
        expect('newArray' in validation.data).toBe(false);
      }
    });

    it('should maintain strict validation for required fields', () => {
      const incompleteData = {
        name: 'Incomplete Person',
        height: '180',
        // Missing many required fields
      };

      const validation = PersonSchema.safeParse(incompleteData);
      expect(validation.success).toBe(false);

      if (!validation.success) {
        const missingFields = validation.error.issues.map(issue => issue.path[0]);
        expect(missingFields).toContain('mass');
        expect(missingFields).toContain('gender');
        expect(missingFields).toContain('homeworld');
        expect(missingFields).toContain('films');
      }
    });
  });
});
