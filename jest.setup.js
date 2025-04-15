import "@testing-library/jest-dom";

// Можно добавить глобальные моки
global.fetch = jest.fn();

// Можно настроить поведение по умолчанию
jest.setTimeout(10000);
