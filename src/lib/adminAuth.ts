export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "vaidyam@2026";

export interface AdminSession {
  username: string;
  loggedInAt: string;
}

const STORAGE_KEY = "vaidyam-admin-session";

export const isAdminCredentialsValid = (username: string, password: string) => {
  return username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD;
};

export const saveAdminSession = (username: string) => {
  if (typeof window === "undefined") {
    return;
  }

  const session: AdminSession = {
    username,
    loggedInAt: new Date().toISOString(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

export const clearAdminSession = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
};

export const getAdminSession = (): AdminSession | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as AdminSession;
  } catch {
    return null;
  }
};
