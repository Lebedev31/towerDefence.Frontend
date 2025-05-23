"use client";
import { Provider } from "react-redux";
import { store } from "@/Api/store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
