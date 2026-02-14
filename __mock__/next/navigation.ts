export const useRouter = () => ({
  back: jest.fn(),
  push: jest.fn(),
  forward: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
});
