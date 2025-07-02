// Этот файл конфигурации Jest используется для настройки среды тестирования в проекте Next.js с использованием TypeScript и React.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // Обработка алиасов путей
    "^@/(.*)$": "<rootDir>/src/$1",
    // Обработка импортов стилей
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest"],
  },
  // Шаблоны для поиска тестовых файлов
  testMatch: ["**/*.test.tsx", "**/*.test.ts"],
  // Покрытие кода тестами
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
  ],
  modulePaths: ["<rootDir>/src/"],
  roots: ["<rootDir>/src/"],
};

module.exports = createJestConfig(customJestConfig);
