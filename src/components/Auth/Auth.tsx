"use clent";
import { useForm } from "react-hook-form";
import styles from "@/styles/auth.module.scss";
import { Auth as AuthType } from "@/type/type";
import { authValidation } from "./validation";
import { RegisterOptions } from "react-hook-form";
import { useAuthMutation } from "@/Api/ApiSlice/auth.api.slice";

export function Auth() {
  const [auth] = useAuthMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthType>({ mode: "onChange" });

  const onSubmit = async (data: AuthType) => {
    try {
      const response = await auth(data).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.auth_form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form_group}>
        <input
          {...register(
            "email",
            authValidation.email as RegisterOptions<AuthType>
          )}
          placeholder="Email"
          className={styles.form_input}
        />
        {errors.email && (
          <span className={styles.error_message}>{errors.email.message}</span>
        )}
      </div>

      <div className={styles.form_group}>
        <input
          {...register(
            "password",
            authValidation.password as RegisterOptions<AuthType>
          )}
          placeholder="Пароль"
          className={styles.form_input}
        />
        {errors.password && (
          <span className={styles.error_message}>
            {errors.password.message}
          </span>
        )}
      </div>

      <button type="submit" className={styles.form_button}>
        Войти
      </button>
    </form>
  );
}
