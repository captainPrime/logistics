import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  coveragePathIgnorePatterns: ['dist/*'],
  detectOpenHandles: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '.*\\.test\\.ts$',
  collectCoverageFrom: ['**/*.(t|j)s'],
  testEnvironment: 'node',
  forceExit: true,
};
export default config;
