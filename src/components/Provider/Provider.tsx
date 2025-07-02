"use client";
//import { Provider } from "react-redux";
//import { store } from "@/Api/store";

//export function ReduxProvider({ children }: { children: React.ReactNode }) {
//  return <Provider store={store}>{children}</Provider>;
//}

// src/components/Provider/Provider.tsx

"use client";

import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/Api/store";
import { useRef } from "react";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Создаем экземпляр стора при первом рендере
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
