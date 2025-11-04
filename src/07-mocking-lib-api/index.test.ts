import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockData = { id: 1, title: 'Test' };
  const relativePath = '/posts/1';
  let axiosGet: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    axiosGet = jest.fn().mockResolvedValue({ data: mockData });
    (axios.create as jest.Mock).mockReturnValue({
      get: axiosGet,
    });
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(axiosGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockData);
  });
});
