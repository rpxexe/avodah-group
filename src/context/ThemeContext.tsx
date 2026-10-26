"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

export type Theme = "dark" | "light";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isAutoSchedule: boolean;
  schedulePeriod: "day" | "night";
  nextTransitionTime: Date | null;
  resetToAutoSchedule: () => void;
}

interface ThemeOverride {
  theme: Theme;
  expiresAt: number; // timestamp in milliseconds
  setAt: number;
}

/**
 * Determine the scheduled theme based on the 7 AM / 7 PM rule:
 * - 7:00 PM (19:00) to 6:59:59 AM (< 07:00): "dark"
 * - 7:00:00 AM (07:00) to 6:59:59 PM (< 19:00): "light"
 */
export function getScheduleTheme(date: Date = new Date()): Theme {
  const hour = date.getHours();
  return hour >= 19 || hour < 7 ? "dark" : "light";
}

/**
 * Calculate the next transition timestamp (either 7:00 AM or 7:00 PM).
 */
export function getNextTransition(date: Date = new Date()): Date {
  const currentHour = date.getHours();
  const transition = new Date(date);
  transition.setMinutes(0, 0, 0);

  if (currentHour < 7) {
    // Before 7:00 AM: Next transition is 7:00 AM today
    transition.setHours(7);
  } else if (currentHour < 19) {
    // Between 7:00 AM and 7:00 PM: Next transition is 7:00 PM (19:00) today
    transition.setHours(19);
  } else {
    // 7:00 PM or later: Next transition is 7:00 AM tomorrow
    transition.setDate(transition.getDate() + 1);
    transition.setHours(7);
  }

  return transition;
}

/**
 * Compute the effective theme and whether auto-scheduling is active.
 */
export function computeEffectiveTheme(): { theme: Theme; isAutoSchedule: boolean } {
  if (typeof window === "undefined") {
    return { theme: "dark", isAutoSchedule: true };
  }

  const now = Date.now();
  const scheduled = getScheduleTheme(new Date(now));

  try {
    const rawOverride = localStorage.getItem("ak_theme_override");
    if (rawOverride) {
      const parsed: ThemeOverride = JSON.parse(rawOverride);
      // Valid unexpired override
      if (parsed && typeof parsed.expiresAt === "number" && now < parsed.expiresAt) {
        if (parsed.theme === "dark" || parsed.theme === "light") {
          return { theme: parsed.theme, isAutoSchedule: false };
        }
      } else {
        // Expired override, clean it up
        localStorage.removeItem("ak_theme_override");
      }
    }
  } catch {
    // Storage access error or JSON parse error
  }

  return { theme: scheduled, isAutoSchedule: true };
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
  isAutoSchedule: true,
  schedulePeriod: "night",
  nextTransitionTime: null,
  resetToAutoSchedule: () => {},
});

const themeListeners = new Set<() => void>();

function notifyThemeListeners() {
  themeListeners.forEach((listener) => listener());
}

function subscribeTheme(callback: () => void) {
  themeListeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    themeListeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getThemeSnapshot(): Theme {
  return computeEffectiveTheme().theme;
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const storeTheme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerSnapshot);
  const [localTheme, setLocalTheme] = useState<Theme | null>(null);

  const theme = localTheme ?? storeTheme;

  // Compute status helpers
  const now = new Date();
  const schedulePeriod: "day" | "night" = now.getHours() >= 19 || now.getHours() < 7 ? "night" : "day";
  const { isAutoSchedule } = computeEffectiveTheme();
  const nextTransitionTime = getNextTransition(now);

  // Synchronize <html> attributes and class list
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("ak_theme", theme);
    } catch {}
  }, [theme]);

  // Setup timers for automatic boundary switching at 7 AM and 7 PM
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const scheduleNextCheck = () => {
      const currentDate = new Date();
      const nextTransition = getNextTransition(currentDate);
      const delay = Math.max(1000, nextTransition.getTime() - currentDate.getTime() + 400);

      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        // Clear any expired override
        try {
          const raw = localStorage.getItem("ak_theme_override");
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && Date.now() >= parsed.expiresAt) {
              localStorage.removeItem("ak_theme_override");
            }
          }
        } catch {}

        setLocalTheme(null);
        notifyThemeListeners();
        scheduleNextCheck();
      }, delay);
    };

    scheduleNextCheck();

    // Heartbeat every 20 seconds to catch system sleep/wake, timezone, or clock changes
    const intervalId = setInterval(() => {
      const effective = computeEffectiveTheme();
      if ((localTheme ?? storeTheme) !== effective.theme && effective.isAutoSchedule) {
        setLocalTheme(null);
        notifyThemeListeners();
      }
    }, 20000);

    // When returning to tab or waking computer, check immediately
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        const effective = computeEffectiveTheme();
        if ((localTheme ?? storeTheme) !== effective.theme && effective.isAutoSchedule) {
          setLocalTheme(null);
          notifyThemeListeners();
        }
      }
    };

    window.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleVisibility);

    return () => {
      if (timerId) clearTimeout(timerId);
      clearInterval(intervalId);
      window.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleVisibility);
    };
  }, [localTheme, storeTheme]);

  const setTheme = useCallback((nextTheme: Theme) => {
    setLocalTheme(nextTheme);

    const currentDate = new Date();
    const scheduled = getScheduleTheme(currentDate);

    if (nextTheme === scheduled) {
      // Reverted to match schedule, clear override
      try {
        localStorage.removeItem("ak_theme_override");
        localStorage.setItem("ak_theme", nextTheme);
      } catch {}
    } else {
      // User manual override active until the next schedule transition (7 AM / 7 PM)
      const nextTransition = getNextTransition(currentDate);
      const override: ThemeOverride = {
        theme: nextTheme,
        expiresAt: nextTransition.getTime(),
        setAt: currentDate.getTime(),
      };
      try {
        localStorage.setItem("ak_theme_override", JSON.stringify(override));
        localStorage.setItem("ak_theme", nextTheme);
      } catch {}
    }

    notifyThemeListeners();
  }, []);

  const toggleTheme = useCallback(() => {
    const current = localTheme ?? storeTheme;
    setTheme(current === "dark" ? "light" : "dark");
  }, [localTheme, storeTheme, setTheme]);

  const resetToAutoSchedule = useCallback(() => {
    try {
      localStorage.removeItem("ak_theme_override");
    } catch {}
    setLocalTheme(null);
    notifyThemeListeners();
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        isAutoSchedule,
        schedulePeriod,
        nextTransitionTime,
        resetToAutoSchedule,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
