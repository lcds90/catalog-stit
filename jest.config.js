module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@app/(.*)$': '<rootDir>/src/$1',
    "@repositories/(.*)$": "<rootDir>/src/repositories/$1",
    "@implementations/(.*)$": "<rootDir>/src/repositories/implementations/$1",
    "@fixtures/(.*)$": "<rootDir>/src/repositories/implementations/fixtures/$1",
    "@entities/(.*)$": "<rootDir>/src/entities/$1",
    "@useCases/(.*)$": "<rootDir>/src/useCases/$1",
    "@routes/(.*)$": "<rootDir>/src/routes/$1",
  },
}
