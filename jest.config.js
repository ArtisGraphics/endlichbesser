module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    // Handle module aliases (if you're using them in your project)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Add coverage settings if needed
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
};
