export interface AuthUser {
  email: string;
  name: string;
}

export function saveAuth(email: string, name: string) {
  localStorage.setItem('auth_user', JSON.stringify({ email, name }));
}

export function getAuth(): AuthUser | null {
  try {
    const data = localStorage.getItem('auth_user');
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem('auth_user');
}

export function isAuthenticated(): boolean {
  return getAuth() !== null;
}
