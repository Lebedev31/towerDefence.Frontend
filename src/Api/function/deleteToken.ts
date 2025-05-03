export function deleteToken(): void {
  const key = process.env.NEXT_PUBLIC_TOKEN_KEY;
  if (key) {
    localStorage.removeItem(key);
  }
}
