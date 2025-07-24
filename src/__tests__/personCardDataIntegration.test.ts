import { PersonSchema, Person } from '@/services/people/peopleSchema';
import * as personUtils from '@/utils/personUtils';

// Mock the person utilities
jest.mock('@/utils/personUtils', () => ({
  extractIdFromUrl: jest.fn(),
  formatDate: jest.fn(),
}));

describe('PersonCard Data Integration (without UI)', () => {
  const mockExtractIdFromUrl = jest.mocked(personUtils.extractIdFromUrl);
  const mockFormatDate = jest.mocked(personUtils.formatDate);

  beforeEach(() => {
    jest.clearAllMocks();
    mockExtractIdFromUrl.mockReturnValue('1');
    mockFormatDate.mockReturnValue('December 9, 2014');
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

  describe('Zod Schema Validation for Component Data', () => {
    it('should validate person data that would be passed to PersonCard component', () => {
      const result = PersonSchema.safeParse(mockPersonData);
      
      expect(result.success).toBe(true);
      if (result.success) {
        const person: Person = result.data;
        
        // Verify the data structure matches what PersonCard expects
        expect(person.name).toBe('Luke Skywalker');
        expect(person.height).toBe('172');
        expect(person.mass).toBe('77');
        expect(person.gender).toBe('male');
        
        // Verify arrays are properly typed
        expect(Array.isArray(person.films)).toBe(true);
        expect(person.films).toHaveLength(2);
        expect(Array.isArray(person.species)).toBe(true);
        expect(person.species).toHaveLength(1);
      }
    });

    it('should work with utility functions that would be used in PersonCard', () => {
      const result = PersonSchema.safeParse(mockPersonData);
      
      if (result.success) {
        const person = result.data;
        
        // Test utility function integration
        const personId = personUtils.extractIdFromUrl(person.url);
        const formattedDate = personUtils.formatDate(person.created);
        
        expect(mockExtractIdFromUrl).toHaveBeenCalledWith('https://swapi.info/api/people/1');
        expect(mockFormatDate).toHaveBeenCalledWith('2014-12-09T13:50:51.644000Z');
        
        // These would be used in the PersonCard component logic
        expect(personId).toBe('1');
        expect(formattedDate).toBe('December 9, 2014');
      }
    });

    it('should handle different character variations that PersonCard might receive', () => {
      const variations = [
        {
          ...mockPersonData,
          name: 'Princess Leia',
          height: '150',
          mass: '49',
          gender: 'female',
          url: 'https://swapi.info/api/people/5',
        },
        {
          ...mockPersonData,
          name: 'R2-D2',
          height: '96',
          mass: '32',
          gender: 'n/a',
          hair_color: 'n/a',
          url: 'https://swapi.info/api/people/3',
        }
      ];

      variations.forEach(characterData => {
        const result = PersonSchema.safeParse(characterData);
        
        expect(result.success).toBe(true);
        if (result.success) {
          const person = result.data;
          
          // Verify data types that PersonCard would use
          expect(typeof person.name).toBe('string');
          expect(typeof person.height).toBe('string');
          expect(typeof person.mass).toBe('string');
          expect(typeof person.gender).toBe('string');
          
          // Verify the data can be safely used in component logic
          expect(person.name.length).toBeGreaterThan(0);
          expect(person.height).toBeTruthy();
          expect(person.mass).toBeTruthy();
        }
      });
    });

    it('should provide type-safe data for component props', () => {
      const result = PersonSchema.safeParse(mockPersonData);
      
      if (result.success) {
        const person: Person = result.data;
        
        // Simulate the data transformations that PersonCard would do
        const displayData = {
          name: person.name,
          height: `${person.height} cm`,
          mass: `${person.mass} kg`,
          gender: person.gender,
          id: mockExtractIdFromUrl(person.url),
        };
        
        expect(displayData.name).toBe('Luke Skywalker');
        expect(displayData.height).toBe('172 cm');
        expect(displayData.mass).toBe('77 kg');
        expect(displayData.gender).toBe('male');
        expect(displayData.id).toBe('1');
        
        // Verify TypeScript types are correct
        expect(typeof displayData.name).toBe('string');
        expect(typeof displayData.height).toBe('string');
        expect(typeof displayData.mass).toBe('string');
        expect(typeof displayData.gender).toBe('string');
        expect(typeof displayData.id).toBe('string');
      }
    });

    it('should handle edge cases that PersonCard component might encounter', () => {
      const edgeCases = [
        {
          ...mockPersonData,
          height: 'unknown',
          mass: 'unknown',
          gender: 'n/a',
        },
        {
          ...mockPersonData,
          films: [], // Empty arrays
          species: [],
          vehicles: [],
          starships: [],
        }
      ];

      edgeCases.forEach(edgeCase => {
        const result = PersonSchema.safeParse(edgeCase);
        
        expect(result.success).toBe(true);
        if (result.success) {
          const person = result.data;
          
          // Verify PersonCard could handle these values
          expect(typeof person.height).toBe('string');
          expect(typeof person.mass).toBe('string');
          expect(typeof person.gender).toBe('string');
          expect(Array.isArray(person.films)).toBe(true);
          expect(Array.isArray(person.species)).toBe(true);
          
          // These should be safe to display in UI
          const safeDisplayHeight = person.height || 'N/A';
          const safeDisplayMass = person.mass || 'N/A';
          const safeDisplayGender = person.gender || 'N/A';
          
          expect(typeof safeDisplayHeight).toBe('string');
          expect(typeof safeDisplayMass).toBe('string');
          expect(typeof safeDisplayGender).toBe('string');
        }
      });
    });
  });

  describe('Component Logic Simulation', () => {
    it('should simulate PersonCard click handler logic with validated data', () => {
      const result = PersonSchema.safeParse(mockPersonData);
      
      if (result.success) {
        const person = result.data;
        
        // Simulate what PersonCard's handleClick would do
        const personId = personUtils.extractIdFromUrl(person.url);
        const navigationPath = `/person/${personId}`;
        
        expect(mockExtractIdFromUrl).toHaveBeenCalledWith(person.url);
        expect(navigationPath).toBe('/person/1');
        
        // Verify the URL is valid for navigation
        expect(navigationPath).toMatch(/^\/person\/\w+$/);
      }
    });

    it('should simulate PersonCard rendering logic with different data types', () => {
      const testCases = [
        { name: 'Luke Skywalker', height: '172', mass: '77', gender: 'male' },
        { name: 'C-3PO', height: '167', mass: '75', gender: 'n/a' },
        { name: 'R2-D2', height: '96', mass: '32', gender: 'n/a' },
      ];

      testCases.forEach(testCase => {
        const fullPersonData = { ...mockPersonData, ...testCase };
        const result = PersonSchema.safeParse(fullPersonData);
        
        if (result.success) {
          const person = result.data;
          
          // Simulate PersonCard's display logic
          const displayInfo = {
            title: person.name,
            heightDisplay: `${person.height} cm`,
            massDisplay: `${person.mass} kg`,
            genderDisplay: person.gender,
            capitalizedGender: person.gender.charAt(0).toUpperCase() + person.gender.slice(1),
          };
          
          expect(displayInfo.title).toBe(testCase.name);
          expect(displayInfo.heightDisplay).toBe(`${testCase.height} cm`);
          expect(displayInfo.massDisplay).toBe(`${testCase.mass} kg`);
          expect(displayInfo.genderDisplay).toBe(testCase.gender);
          expect(typeof displayInfo.capitalizedGender).toBe('string');
        }
      });
    });
  });
});
