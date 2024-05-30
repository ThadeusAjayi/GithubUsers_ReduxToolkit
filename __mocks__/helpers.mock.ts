jest.mock('../src/api/helpers.ts', () => ({
  getNextUrl: jest.fn(),
}));
