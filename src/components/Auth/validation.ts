import { RegisterOptions } from "react-hook-form";
import { Auth, Registration } from "@/type/type";

// Указываем generic тип для RegisterOptions
type ValidationRules = {
  [key in keyof Registration]: RegisterOptions<Registration, key>;
};

export const validationRules: ValidationRules = {
  email: {
    required: "Email обязателен",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Неверный формат email",
    },
  },
  password: {
    required: "Пароль обязателен",
    minLength: {
      value: 6,
      message: "Минимальная длина пароля 6 символов",
    },
  },
  name: {
    required: "Имя обязательно",
    minLength: {
      value: 2,
      message: "Минимальная длина имени 2 символа",
    },
    maxLength: {
      value: 20,
      message: "Максимальная длина имени 20 символов",
    },
  },
  confirmPassword: {
    required: "Подтвердите пароль",
    validate: (value: string, formValues: Registration) =>
      value === formValues.password || "Пароли не совпадают",
  },
};

// Обновляем тип для authValidation
export const authValidation: Pick<ValidationRules, keyof Auth> = {
  email: validationRules.email,
  password: validationRules.password,
};
