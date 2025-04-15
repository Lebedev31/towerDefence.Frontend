// src/store/api/auth.api.ts (Файл-заглушка)

// Экспортируем функцию с таким же именем, как ожидает ваш компонент.
// Реализация не важна, так как Jest все равно ее заменит моком.
export const useLoginMutation = () => {
  console.warn("Using placeholder useLoginMutation from dummy file!"); // Необязательно, для отладки
  // Возвращаем структуру, похожую на то, что вернет RTK Query хук
  return [() => Promise.resolve({}), { isLoading: false }];
};

// Если компонент Auth импортирует что-то еще из этого файла,
// добавьте и эти экспорты в виде заглушек.
