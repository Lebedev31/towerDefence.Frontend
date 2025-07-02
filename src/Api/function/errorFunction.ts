import { ServerError } from "@/type/type";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { SerializedError } from "@reduxjs/toolkit";

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error !== null && "status" in error;
}

function isSerializedError(error: unknown): error is SerializedError {
  return typeof error === "object" && error !== null && "message" in error;
}

export function rtkError(error: unknown): string {
  console.log(error);

  if (isFetchBaseQueryError(error)) {
    if (typeof error.status === "number") {
      const data = error.data as ServerError;
      return data.message;
    } else {
      return error.error;
    }
  }

  if (isSerializedError(error)) {
    if (typeof error.message === "string") {
      return error.message;
    } else {
      return "Неизвестная ошибка";
    }
  }

  return "Неизвестная ошибка";
}
