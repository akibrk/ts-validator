module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/index.ts'], // Ignore the src/index.ts file & other index.ts files
};
