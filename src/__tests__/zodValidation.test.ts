import { PersonSchema, GetPeopleResponseSchema, Person } from '@/services/people/peopleSchema';

describe('Zod Validation Integration Tests', () => {
  const validPersonData = {
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

  describe('Core Zod Schema Validation', () => {
    it('should validate a complete SWAPI person response', () => {
      const result = PersonSchema.safeParse(validPersonData);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('Luke Skywalker');
        expect(result.data.height).toBe('172');
        expect(result.data.mass).toBe('77');
        expect(result.data.gender).toBe('male');
        expect(result.data.films).toHaveLength(2);
        expect(result.data.species).toHaveLength(1);
      }
    });

    it('should generate correct TypeScript types from Zod schema', () => {
      const result = PersonSchema.safeParse(validPersonData);
      
      if (result.success) {
        const person: Person = result.data;
        
        // These assertions verify TypeScript type inference is working
        expect(typeof person.name).toBe('string');
        expect(typeof person.height).toBe('string');
        expect(typeof person.mass).toBe('string');
        expect(typeof person.gender).toBe('string');
        expect(Array.isArray(person.films)).toBe(true);
        expect(Array.isArray(person.species)).toBe(true);
        expect(Array.isArray(person.vehicles)).toBe(true);
        expect(Array.isArray(person.starships)).toBe(true);
        
        // Verify URL validations
        expect(person.homeworld).toMatch(/^https?:\/\/.+/);
        expect(person.url).toMatch(/^https?:\/\/.+/);
        person.films.forEach(filmUrl => {
          expect(filmUrl).toMatch(/^https?:\/\/.+/);
        });
      }
    });

    it('should validate arrays of people for API responses', () => {
      const peopleArray = [validPersonData, {
        ...validPersonData,
        name: 'C-3PO',
        height: '167',
        mass: '75',
        gender: 'n/a',
        url: 'https://swapi.info/api/people/2',
      }];

      const result = GetPeopleResponseSchema.safeParse(peopleArray);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toHaveLength(2);
        expect(result.data[0].name).toBe('Luke Skywalker');
        expect(result.data[1].name).toBe('C-3PO');
      }
    });

    it('should reject invalid person data with detailed error messages', () => {
      const invalidData = {
        name: 'Invalid Person',
        height: 'not-a-number',
        // Missing required fields
      };

      const result = PersonSchema.safeParse(invalidData);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        const missingFields = result.error.issues.map(issue => issue.path[0]);
        expect(missingFields).toContain('mass');
        expect(missingFields).toContain('gender');
        expect(missingFields).toContain('homeworld');
        expect(missingFields).toContain('films');
        expect(result.error.issues.length).toBeGreaterThan(10); // Many missing fields
      }
    });

    it('should validate URL fields strictly', () => {
      const invalidUrlData = {
        ...validPersonData,
        homeworld: 'not-a-url',
        url: 'also-invalid',
        films: ['https://valid.url', 'invalid-url'],
      };

      const result = PersonSchema.safeParse(invalidUrlData);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        const urlErrors = result.error.issues.filter(issue => 
          issue.path.includes('homeworld') || 
          issue.path.includes('url') || 
          issue.path.includes('films')
        );
        expect(urlErrors.length).toBeGreaterThan(0);
      }
    });

    it('should validate ISO datetime strings for created and edited fields', () => {
      const invalidDateData = {
        ...validPersonData,
        created: 'not-a-date',
        edited: '2024-13-40T99:99:99', // Invalid date format
      };

      const result = PersonSchema.safeParse(invalidDateData);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        const dateErrors = result.error.issues.filter(issue => 
          issue.path.includes('created') || issue.path.includes('edited')
        );
        expect(dateErrors.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Real-world Data Scenarios', () => {
    it('should handle characters with empty arrays', () => {
      const characterWithEmptyArrays = {
        ...validPersonData,
        films: [],
        species: [],
        vehicles: [],
        starships: [],
      };

      const result = PersonSchema.safeParse(characterWithEmptyArrays);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.films).toHaveLength(0);
        expect(result.data.species).toHaveLength(0);
        expect(result.data.vehicles).toHaveLength(0);
        expect(result.data.starships).toHaveLength(0);
      }
    });

    it('should handle characters with multiple items in arrays', () => {
      const characterWithMultipleItems = {
        ...validPersonData,
        films: [
          'https://swapi.info/api/films/1',
          'https://swapi.info/api/films/2',
          'https://swapi.info/api/films/3',
          'https://swapi.info/api/films/6',
        ],
        vehicles: [
          'https://swapi.info/api/vehicles/14',
          'https://swapi.info/api/vehicles/30',
        ],
        starships: [
          'https://swapi.info/api/starships/12',
          'https://swapi.info/api/starships/22',
        ],
      };

      const result = PersonSchema.safeParse(characterWithMultipleItems);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.films).toHaveLength(4);
        expect(result.data.vehicles).toHaveLength(2);
        expect(result.data.starships).toHaveLength(2);
        
        // Verify all URLs are valid
        result.data.films.forEach(url => expect(url).toMatch(/^https?:\/\/.+/));
        result.data.vehicles.forEach(url => expect(url).toMatch(/^https?:\/\/.+/));
        result.data.starships.forEach(url => expect(url).toMatch(/^https?:\/\/.+/));
      }
    });

    it('should handle different character data variations', () => {
      const variations = [
        {
          ...validPersonData,
          name: 'R2-D2',
          height: '96',
          mass: '32',
          gender: 'n/a',
          hair_color: 'n/a',
          skin_color: 'white, blue',
        },
        {
          ...validPersonData,
          name: 'Chewbacca',
          height: '228',
          mass: '112',
          gender: 'male',
          hair_color: 'brown',
          birth_year: '200BBY',
        },
        {
          ...validPersonData,
          name: 'Princess Leia',
          height: '150',
          mass: '49',
          gender: 'female',
          hair_color: 'brown',
          birth_year: '19BBY',
        },
      ];

      variations.forEach(character => {
        const result = PersonSchema.safeParse(character);
        expect(result.success).toBe(true);
        
        if (result.success) {
          expect(typeof result.data.name).toBe('string');
          expect(typeof result.data.height).toBe('string');
          expect(typeof result.data.mass).toBe('string');
          expect(typeof result.data.gender).toBe('string');
        }
      });
    });
  });

  describe('Schema Robustness', () => {
    it('should ignore extra fields not in schema (forward compatibility)', () => {
      const dataWithExtraFields = {
        ...validPersonData,
        extraField: 'this should be ignored',
        futureProperty: { nested: 'object' },
        newArray: ['item1', 'item2'],
      };

      const result = PersonSchema.safeParse(dataWithExtraFields);
      
      expect(result.success).toBe(true);
      if (result.success) {
        // Zod strips unknown fields by default
        expect('extraField' in result.data).toBe(false);
        expect('futureProperty' in result.data).toBe(false);
        expect('newArray' in result.data).toBe(false);
        
        // But keeps all the valid fields
        expect(result.data.name).toBe('Luke Skywalker');
        expect(result.data.films).toHaveLength(2);
      }
    });

    it('should maintain type safety with inferred types', () => {
      const result = PersonSchema.safeParse(validPersonData);
      
      if (result.success) {
        // This test ensures that the Zod inferred type Person matches expectations
        const person: Person = result.data;
        
        // These assignments should be type-safe
        const name: string = person.name;
        const height: string = person.height;
        const films: string[] = person.films;
        const created: string = person.created;
        
        expect(name).toBe('Luke Skywalker');
        expect(height).toBe('172');
        expect(films).toHaveLength(2);
        expect(created).toBe('2014-12-09T13:50:51.644000Z');
      }
    });

    it('should provide detailed validation errors for debugging', () => {
      const completelyInvalidData = {
        name: 123, // Should be string
        height: null, // Should be string
        mass: undefined, // Should be string
        films: 'not-an-array', // Should be array
        homeworld: 12345, // Should be URL string
        created: 'invalid-date', // Should be ISO datetime
      };

      const result = PersonSchema.safeParse(completelyInvalidData);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.issues;
        
        // Should have errors for each invalid field
        expect(errors.length).toBeGreaterThan(5);
        
        // Check that error paths are correctly identified
        const errorPaths = errors.map(issue => issue.path[0]);
        expect(errorPaths).toContain('name');
        expect(errorPaths).toContain('height');
        expect(errorPaths).toContain('mass');
        expect(errorPaths).toContain('films');
        expect(errorPaths).toContain('homeworld');
      }
    });
  });
});
