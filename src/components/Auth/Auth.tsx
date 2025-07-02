"use client";
import { useForm } from "react-hook-form";
import styles from "@/styles/auth.module.scss";
import { Auth as AuthType } from "@/type/type";
import { authValidation } from "./validation";
import { RegisterOptions } from "react-hook-form";
import { useAuthMutation } from "@/Api/ApiSlice/auth.api.slice";
import { toast } from "react-toastify";
import { rtkError } from "@/Api/function/errorFunction";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export function Auth() {
  const [auth, { isLoading }] = useAuthMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthType>({ mode: "onChange" });

  const onSubmit = async (data: AuthType) => {
    try {
      const response = await auth(data).unwrap();
      if (!response.message.success) {
        toast.error("Отсутсвует токен авторизации");
      } else {
        router.push("/menu");
      }
    } catch (error) {
      const errorMessage = rtkError(error);
      toast.error(errorMessage);
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
        {!isLoading && "Войти"}
        <ClipLoader
          color="#36d7b7" // Цвет спиннера
          loading={isLoading} // Видимость контролируется пропсом loading
          size={25} // Размер в px
          aria-label="Загрузка" // Текст для скринридеров
          data-testid="loader"
        />
      </button>
    </form>
  );
}
