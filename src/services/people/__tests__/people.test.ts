import { getPeople, getPersonById } from '@/services/people/people';
import { PersonSchema, GetPeopleResponseSchema } from '@/services/people/peopleSchema';

// Mock the fetch function
global.fetch = jest.fn();

describe('People API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_SWAPI_BASE_URL = 'https://swapi.info/api';
  });

  describe('getPeople', () => {
    const mockPeopleResponse = [
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
    ];

    it('should fetch and validate people data successfully', async () => {
      const mockFetch = jest.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPeopleResponse,
      } as Response);

      const result = await getPeople();

      expect(mockFetch).toHaveBeenCalledWith('https://swapi.info/api/people');
      expect(result).toEqual(mockPeopleResponse);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Luke Skywalker');
    });

    it('should validate response using Zod schema', async () => {
      const mockFetch = jest.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPeopleResponse,
      } as Response);

      const result = await getPeople();

      // Verify that the result passes Zod validation
      const validationResult = GetPeopleResponseSchema.safeParse(result);
      expect(validationResult.success).toBe(true);
    });

    it('should throw error when network request fails', async () => {
      const mockFetch = jest.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(getPeople()).rejects.toThrow('Network response was not ok');
    });

    it('should throw error when API returns invalid data that fails Zod validation', async () => {
      const invalidResponse = [
        {
          name: 'Invalid Person',
          // Missing required fields
        },
      ];

      const mockFetch = jest.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => invalidResponse,
      } as Response);

      await expect(getPeople()).rejects.toThrow('Invalid data received from API');
    });

    it('should handle empty array response', async () => {
      const mockFetch = jest.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response);

      const result = await getPeople();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('getPersonById', () => {
    const mockPersonResponse = {
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
    };

    it('should fetch and validate person data successfully', async () => {
      const mockFetch = jest.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPersonResponse,
      } as Response);

      const result = await getPersonById('1');

      expect(mockFetch).toHaveBeenCalledWith('https://swapi.info/api/people/1');
      expect(result).toEqual(mockPersonResponse);
      expect(result.name).toBe('Luke Skywalker');
    });

    it('should validate response using Zod PersonSchema', async () => {
      const mockFetch = jest.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPersonResponse,
      } as Response);

      const result = await getPersonById('1');

      // Verify that the result passes Zod validation
      const validationResult = PersonSchema.safeParse(result);
      expect(validationResult.success).toBe(true);
      
      if (validationResult.success) {
        expect(validationResult.data.name).toBe('Luke Skywalker');
        expect(validationResult.data.films).toHaveLength(1);
      }
    });

    it('should throw error when network request fails', async () => {
      const mockFetch = jest.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(getPersonById('999')).rejects.toThrow('Network response was not ok');
    });

    it('should throw error when API returns invalid person data', async () => {
      const invalidPersonResponse = {
        name: 'Invalid Person',
        // Missing required fields like height, mass, etc.
      };

      const mockFetch = jest.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => invalidPersonResponse,
      } as Response);

      await expect(getPersonById('1')).rejects.toThrow('Invalid data received from API');
    });

    it('should handle person with all optional fields as arrays', async () => {
      const personWithArrays = {
        ...mockPersonResponse,
        films: ['https://swapi.info/api/films/1', 'https://swapi.info/api/films/2'],
        species: [],
        vehicles: ['https://swapi.info/api/vehicles/14', 'https://swapi.info/api/vehicles/30'],
        starships: [],
      };

      const mockFetch = jest.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => personWithArrays,
      } as Response);

      const result = await getPersonById('1');

      expect(result.films).toHaveLength(2);
      expect(result.species).toHaveLength(0);
      expect(result.vehicles).toHaveLength(2);
      expect(result.starships).toHaveLength(0);
    });
  });

  describe('Zod Schema Integration', () => {
    it('should ensure API responses match expected Zod schema structure', async () => {
      const mockResponse = {
        name: 'Test Person',
        height: '180',
        mass: '80',
        hair_color: 'brown',
        skin_color: 'light',
        eye_color: 'brown',
        birth_year: '1990',
        gender: 'male',
        homeworld: 'https://swapi.info/api/planets/1',
        films: ['https://swapi.info/api/films/1'],
        species: ['https://swapi.info/api/species/1'],
        vehicles: [],
        starships: [],
        created: '2024-01-01T00:00:00.000Z',
        edited: '2024-01-01T00:00:00.000Z',
        url: 'https://swapi.info/api/people/test',
      };

      // Test that our schema accepts this structure
      const schemaValidation = PersonSchema.safeParse(mockResponse);
      expect(schemaValidation.success).toBe(true);

      // Test that the API function would work with this data
      const mockFetch = jest.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await getPersonById('test');
      expect(result).toEqual(mockResponse);
    });
  });
});
