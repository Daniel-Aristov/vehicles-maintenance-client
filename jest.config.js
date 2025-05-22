/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': '@vue/vue3-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  coverageDirectory: 'coverage',
  setupFiles: ['<rootDir>/src/test/setup.ts'],
  globals: {
    'vue-jest': {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('v-')
      }
    }
  },
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  }
}
