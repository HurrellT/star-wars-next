import { PersonSchema, GetPeopleResponseSchema, Person } from '@/services/people/peopleSchema';

describe('People Schemas', () => {
  describe('PersonSchema', () => {
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

    it('should validate a valid person object', () => {
      const result = PersonSchema.safeParse(validPersonData);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data).toEqual(validPersonData);
        expect(result.data.name).toBe('Luke Skywalker');
        expect(result.data.films).toHaveLength(2);
      }
    });

    it('should generate correct TypeScript types', () => {
      const result = PersonSchema.safeParse(validPersonData);
      
      if (result.success) {
        const person: Person = result.data;
        // Type assertion to verify TypeScript types are working
        expect(typeof person.name).toBe('string');
        expect(typeof person.height).toBe('string');
        expect(typeof person.mass).toBe('string');
        expect(Array.isArray(person.films)).toBe(true);
        expect(Array.isArray(person.species)).toBe(true);
      }
    });

    it('should fail validation when required fields are missing', () => {
      const invalidData = {
        name: 'Luke Skywalker',
        // Missing required fields
      };

      const result = PersonSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues).toHaveLength(15); // All missing required fields except name
        const missingFields = result.error.issues.map(issue => issue.path[0]);
        expect(missingFields).toContain('height');
        expect(missingFields).toContain('mass');
        expect(missingFields).toContain('gender');
      }
    });

    it('should fail validation when URL fields are invalid', () => {
      const invalidUrlData = {
        ...validPersonData,
        homeworld: 'not-a-valid-url',
        url: 'also-not-a-url',
      };

      const result = PersonSchema.safeParse(invalidUrlData);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const urlErrors = result.error.issues.filter(issue => 
          issue.code === 'invalid_format'
        );
        expect(urlErrors.length).toBeGreaterThan(0);
      }
    });

    it('should fail validation when films array contains invalid URLs', () => {
      const invalidFilmsData = {
        ...validPersonData,
        films: ['https://swapi.info/api/films/1', 'invalid-url'],
      };

      const result = PersonSchema.safeParse(invalidFilmsData);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues.some(issue => 
          issue.path.includes('films')
        )).toBe(true);
      }
    });

    it('should fail validation when datetime fields are invalid', () => {
      const invalidDateData = {
        ...validPersonData,
        created: 'not-a-valid-datetime',
        edited: '2024-13-32T25:70:70.000Z', // Invalid date
      };

      const result = PersonSchema.safeParse(invalidDateData);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const dateErrors = result.error.issues.filter(issue => 
          (issue.path.includes('created') || issue.path.includes('edited'))
        );
        expect(dateErrors.length).toBeGreaterThan(0);
      }
    });
  });

  describe('GetPeopleResponseSchema', () => {
    const validPeopleResponse = [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: 'https://swapi.info/api/planets/1',
        films: ['https://swapi.info/api/films/1'],
        species: ['https://swapi.info/api/species/1'],
        vehicles: ['https://swapi.info/api/vehicles/14'],
        starships: ['https://swapi.info/api/starships/12'],
        created: '2014-12-09T13:50:51.644000Z',
        edited: '2014-12-20T21:17:56.891000Z',
        url: 'https://swapi.info/api/people/1',
      },
      {
        name: 'C-3PO',
        height: '167',
        mass: '75',
        hair_color: 'n/a',
        skin_color: 'gold',
        eye_color: 'yellow',
        birth_year: '112BBY',
        gender: 'n/a',
        homeworld: 'https://swapi.info/api/planets/1',
        films: ['https://swapi.info/api/films/1'],
        species: ['https://swapi.info/api/species/2'],
        vehicles: [],
        starships: [],
        created: '2014-12-10T15:10:51.357000Z',
        edited: '2014-12-20T21:17:50.309000Z',
        url: 'https://swapi.info/api/people/2',
      },
    ];

    it('should validate an array of valid person objects', () => {
      const result = GetPeopleResponseSchema.safeParse(validPeopleResponse);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data).toHaveLength(2);
        expect(result.data[0].name).toBe('Luke Skywalker');
        expect(result.data[1].name).toBe('C-3PO');
      }
    });

    it('should validate an empty array', () => {
      const result = GetPeopleResponseSchema.safeParse([]);
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data).toHaveLength(0);
      }
    });

    it('should fail validation when array contains invalid person objects', () => {
      const invalidResponse = [
        validPeopleResponse[0], // Valid person
        { name: 'Invalid Person' }, // Missing required fields
      ];

      const result = GetPeopleResponseSchema.safeParse(invalidResponse);
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
        // Should have errors for the invalid person at index 1
        expect(result.error.issues.some(issue => 
          issue.path[0] === 1
        )).toBe(true);
      }
    });

    it('should fail validation when input is not an array', () => {
      const result = GetPeopleResponseSchema.safeParse({ not: 'an array' });
      expect(result.success).toBe(false);
      
      if (!result.success) {
        expect(result.error.issues[0].code).toBe('invalid_type');
      }
    });
  });
});
