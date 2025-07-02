export function deleteToken(): void {
  const key = process.env.NEXT_PUBLIC_TOKEN_KEY;
  if (key) {
    localStorage.removeItem(key);
    console.log(localStorage.getItem(key));
  } else {
    console.error("NEXT_PUBLIC_TOKEN_KEY is not defined");
    throw new Error("NEXT_PUBLIC_TOKEN_KEY is not defined");
  }
}

export function getToken(): string | null {
  const key = process.env.NEXT_PUBLIC_TOKEN_KEY;
  if (key) {
    const token = localStorage.getItem(key);
    return token;
  } else {
    console.error("NEXT_PUBLIC_TOKEN_KEY is not defined");
    throw new Error("NEXT_PUBLIC_TOKEN_KEY is not defined");
  }
}
