// Сохранить значение по ключу
export function saveToLocalStorage(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error("Ошибка при сохранении в localStorage:", error);
    return false;
  }
}

// Получить значение по ключу
// -----------------------------
// Функция, которая получает значение по указанному ключу из localStorage.
// Если значение не найдено, то возвращает null.
// Если возникла ошибка, то выводит ее в консоль и возвращает null.
export function getFromLocalStorage(key: string): string | null {
  try {
    // Получаем значение по ключу
    const value = localStorage.getItem(key);
    // Если значение не найдено, то возвращаем null
    if (value === null) {
      return null;
    }
    // Возвращаем полученное значение
    return value;
  } catch (error) {
    // Если возникла ошибка, то выводим ее в консоль
    console.error(
      `Ошибка при получении из localStorage (ключ: ${key}):`,
      error
    );
    // Возвращаем null
    return null;
  }
}

// Функция для удаления значения из localStorage по указанному ключу.
// Возвращает true, если удаление прошло успешно, и false, если возникла ошибка.
export function removeFromLocalStorage(key: string): boolean {
  try {
    // Пытаемся удалить элемент из localStorage по переданному ключу.
    localStorage.removeItem(key);
    // Если удаление прошло успешно, возвращаем true.
    return true;
  } catch (error) {
    // Если возникла ошибка, выводим ее в консоль с сообщением об ошибке.
    console.error("Ошибка при удалении из localStorage:", error);
    // Возвращаем false, чтобы указать, что операция удаления не удалась.
    return false;
  }
}
