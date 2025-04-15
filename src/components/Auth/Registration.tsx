import { useForm } from "react-hook-form";
import styles from "@/styles/auth.module.scss";
import { Registration as RegistrationType } from "@/type/type";
import { validationRules } from "./validation";

export function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationType>({ mode: "onChange" });

  const onSubmit = (data: RegistrationType) => {
    console.log("Форма регистрации отправлена:", data);
  };

  return (
    <form className={styles.auth_form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form_group}>
        <input
          {...register("name", validationRules.name)}
          placeholder="Имя"
          className={styles.form_input}
        />
        {errors.name && (
          <span className={styles.error_message}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.form_group}>
        <input
          {...register("email", validationRules.email)}
          placeholder="Email"
          className={styles.form_input}
        />
        {errors.email && (
          <span className={styles.error_message}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.form_group}>
        <input
          {...register("password", validationRules.password)}
          placeholder="Пароль"
          className={styles.form_input}
        />
        {errors.password && (
          <span className={styles.error_message}>
            {errors.password.message}
          </span>
        )}
      </div>

      <div className={styles.form_group}>
        <input
          {...register("confirmPassword", validationRules.confirmPassword)}
          type="password"
          placeholder="Повторить пароль"
          className={styles.form_input}
        />
        {errors.confirmPassword && (
          <span className={styles.error_message}>
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button type="submit" className={styles.form_button}>
        Зарегистрироваться
      </button>
    </form>
  );
}
