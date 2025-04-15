import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Registration } from "../Registration";

describe("Тестирование компонента Registration", () => {
  // Тест на проверку начального состояния полей name и confirmPassword
  test("Проверка начального состояния полей", () => {
    render(<Registration />);

    const nameInput = screen.getByPlaceholderText("Имя");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Повторить пароль");

    expect(nameInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();

    // Проверяем что поля изначально пустые
    expect(nameInput).toHaveValue("");
    expect(confirmPasswordInput).toHaveValue("");
  });

  // Тест на валидацию поля name
  test("Проверка валидации поля name", async () => {
    render(<Registration />);

    const nameInput = screen.getByPlaceholderText("Имя");

    // Проверка на минимальную длину
    fireEvent.change(nameInput, { target: { value: "a" } });
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(
        screen.getByText("Минимальная длина имени 2 символа")
      ).toBeInTheDocument();
    });

    // Проверка на максимальную длину
    fireEvent.change(nameInput, { target: { value: "a".repeat(21) } });
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(
        screen.getByText("Максимальная длина имени 20 символов")
      ).toBeInTheDocument();
    });
  });

  // Тест на совпадение паролей
  test("Проверка совпадения паролей", async () => {
    render(<Registration />);

    const passwordInput = screen.getByPlaceholderText("Пароль");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Повторить пароль");

    // Вводим разные пароли
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password456" },
    });
    fireEvent.blur(confirmPasswordInput);

    await waitFor(() => {
      expect(screen.getByText("Пароли не совпадают")).toBeInTheDocument();
    });

    // Вводим одинаковые пароли
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.blur(confirmPasswordInput);

    await waitFor(() => {
      expect(screen.queryByText("Пароли не совпадают")).not.toBeInTheDocument();
    });
  });

  test("Тестирование кнопки отправки формы", async () => {
    render(<Registration />);

    const nameInput = screen.getByPlaceholderText("Имя");
    const passwordInput = screen.getByPlaceholderText("Пароль");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Повторить пароль");
    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", {
      name: /Зарегистрироваться/i,
    });

    // Вводим корректные данные
    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });

    // Проверяем, что кнопка активна
    expect(submitButton).not.toBeDisabled();

    // Имитируем клик по кнопке
    fireEvent.click(submitButton);
  });
});
