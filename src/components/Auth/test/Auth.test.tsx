import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Auth } from "../Auth";

// Создаем мок-функцию на уровне модуля
const mockLoginFn = jest
  .fn()
  .mockResolvedValue({ data: { token: "test-token" } });

// Мокаем модуль с использованием созданной мок-функции
jest.mock("@/Api/ApiSlice/auth.api.slice.ts", () => ({
  useLoginMutation: () => [mockLoginFn, { isLoading: false }],
}));

describe("Тестирование Input", () => {
  test("Проверка ввода текста и наличия инпутов", () => {
    render(<Auth />);
    // Находим импуты по их плейсхолдерам
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Пароль");
    // Проверяем, что инпуты отрендерены
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Проверяем, что инпуты изначально пустые
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");

    // Проверяем возможность ввода текста в инпут Email
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    expect(emailInput).toHaveValue("test@test.com");

    // Проверяем возможность ввода текста в инпут Пароль
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    expect(passwordInput).toHaveValue("123456");
  });
});

describe("Тестирование валидации формы Auth", () => {
  // Тест 1: Проверка пустых полей
  test("Проверка обязательных полей при пустой форме", async () => {
    // Рендерим компонент
    render(<Auth />);

    // Находим кнопку отправки формы
    const submitButton = screen.getByText("Войти");

    // Кликаем по кнопке без заполнения полей
    fireEvent.click(submitButton);

    // Ждем появления сообщений об ошибках
    await waitFor(() => {
      // Проверяем наличие сообщений об ошибках
      expect(screen.getByText("Email обязателен")).toBeInTheDocument();
      expect(screen.getByText("Пароль обязателен")).toBeInTheDocument();
    });
  });

  // Тест 2: Проверка некорректного email
  test("Проверка валидации некорректного email", async () => {
    render(<Auth />);

    // Находим поле email
    const emailInput = screen.getByPlaceholderText("Email");

    // Вводим некорректный email
    fireEvent.change(emailInput, { target: { value: "неправильный-email" } });

    // Убираем фокус с поля для активации валидации
    fireEvent.blur(emailInput);

    // Проверяем появление сообщения об ошибке
    await waitFor(() => {
      expect(screen.getByText("Неверный формат email")).toBeInTheDocument();
    });
  });

  // Тест 3: Проверка короткого пароля
  test("Проверка валидации короткого пароля", async () => {
    render(<Auth />);

    // Находим поле пароля
    const passwordInput = screen.getByPlaceholderText("Пароль");

    // Вводим короткий пароль
    fireEvent.change(passwordInput, { target: { value: "123" } });

    // Убираем фокус с поля
    fireEvent.blur(passwordInput);

    // Проверяем сообщение об ошибке
    await waitFor(() => {
      expect(
        screen.getByText("Минимальная длина пароля 6 символов")
      ).toBeInTheDocument();
    });
  });

  // Тест 4: Проверка успешной валидации
  test("Проверка успешной валидации при корректных данных", async () => {
    render(<Auth />);

    // Находим поля ввода
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Пароль");

    // Вводим корректные данные
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    // Проверяем отсутствие ошибок
    await waitFor(() => {
      expect(
        screen.queryByText("Неверный формат email")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Минимальная длина пароля 6 символов")
      ).not.toBeInTheDocument();
    });
  });

  test("Проверка вызова RTK Query мутации", async () => {
    render(<Auth />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Пароль");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    fireEvent.click(screen.getByText("Войти"));

    // Теперь mockLoginFn доступен здесь
    await waitFor(() => {
      expect(mockLoginFn).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "123456",
      });
    });
  });
});
