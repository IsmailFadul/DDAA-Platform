import type { Learner } from "@/types/assessment";

const STORAGE_KEY = "ddaa_learner_session";

export function saveUser(user: Learner): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function getUser(): Learner | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return null;

    const user: unknown = JSON.parse(stored);

    if (
      typeof user !== "object" ||
      user === null ||
      !("name" in user) ||
      !("email" in user) ||
      typeof user.name !== "string" ||
      typeof user.email !== "string" ||
      !user.name.trim() ||
      !user.email.trim()
    ) {
      return null;
    }

    return {
      name: user.name,
      email: user.email,
    };
  } catch {
    return null;
  }
}

export function logoutUser(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}