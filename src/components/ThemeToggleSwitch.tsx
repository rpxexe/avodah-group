"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles, Clock } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleSwitchProps {
  className?: string;
  variant?: "header" | "drawer";
  showScheduleHint?: boolean;
}

export default function ThemeToggleSwitch({
  className = "",
  variant = "header",
  showScheduleHint = false,
}: ThemeToggleSwitchProps) {
  const { theme, toggleTheme, isAutoSchedule, schedulePeriod, nextTransitionTime } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const isLight = theme === "light";

  // Format next transition time for human display (e.g. "7:00 PM" or "7:00 AM")
  const transitionLabel = nextTransitionTime
    ? nextTransitionTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : schedulePeriod === "day"
    ? "7:00 PM"
    : "7:00 AM";

  const nextModeLabel = schedulePeriod === "day" ? "Dark Mode" : "Light Mode";

  return (
    <div className={`relative inline-flex items-center gap-2.5 ${className}`}>
      {/* Interactive Toggle Switch Button */}
      <button
        type="button"
        role="switch"
        aria-checked={!isLight}
        aria-label={`Toggle appearance. Currently ${isLight ? "Light Mode" : "Dark Mode"}. Auto schedule: 7 AM to 7 PM Light, 7 PM to 7 AM Dark.`}
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative inline-flex items-center justify-between w-[58px] h-[30px] p-[3px] rounded-full cursor-pointer select-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 active:scale-95"
        style={{
          background: isLight
            ? "linear-gradient(135deg, #EBE6DA 0%, #DED7C8 100%)"
            : "linear-gradient(135deg, #151614 0%, #20221E 100%)",
          border: isLight
            ? "1px solid rgba(140, 109, 65, 0.35)"
            : "1px solid rgba(168, 135, 91, 0.45)",
          boxShadow: isLight
            ? "inset 0 2px 4px rgba(140, 109, 65, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)"
            : "inset 0 2px 5px rgba(0, 0, 0, 0.7), 0 2px 8px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Track Decorative Icons (Stationary subtle background icons) */}
        <div className="absolute inset-0 px-2 flex items-center justify-between pointer-events-none">
          {/* Day / Sun hint on the left */}
          <Sun
            className={`w-3.5 h-3.5 transition-opacity duration-300 ${
              isLight ? "opacity-20 text-[#8C6D41]" : "opacity-45 text-[#A8875B]"
            }`}
          />
          {/* Night / Moon hint on the right */}
          <Moon
            className={`w-3.5 h-3.5 transition-opacity duration-300 ${
              isLight ? "opacity-35 text-[#8C6D41]" : "opacity-20 text-[#D4AF37]"
            }`}
          />
        </div>

        {/* Sliding Tactile Thumb / Knob */}
        <motion.div
          className="relative z-10 w-[24px] h-[24px] rounded-full flex items-center justify-center shadow-md cursor-pointer overflow-hidden"
          animate={{
            x: isLight ? 0 : 28,
          }}
          transition={{
            type: "spring",
            stiffness: 480,
            damping: 30,
          }}
          style={{
            background: isLight
              ? "linear-gradient(135deg, #FFFFFF 0%, #F5EFE6 100%)"
              : "linear-gradient(135deg, #2B2C28 0%, #171816 100%)",
            border: isLight
              ? "1px solid rgba(201, 169, 124, 0.65)"
              : "1px solid rgba(212, 175, 55, 0.7)",
            boxShadow: isLight
              ? "0 2px 5px rgba(140, 109, 65, 0.28), 0 0 2px rgba(255, 255, 255, 0.8)"
              : "0 2px 7px rgba(0, 0, 0, 0.8), 0 0 6px rgba(212, 175, 55, 0.35)",
          }}
        >
          {/* Icon inside thumb with smooth rotation & flip */}
          <motion.div
            key={isLight ? "sun-thumb" : "moon-thumb"}
            initial={{ rotate: isLight ? -90 : 90, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: isLight ? 90 : -90, scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {isLight ? (
              <Sun className="w-3.5 h-3.5 text-[#8C6D41]" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[#D4AF37]" />
            )}
          </motion.div>
        </motion.div>
      </button>

      {/* Desktop Hover Tooltip (Explains the 7am-7pm schedule + current mode) */}
      {variant === "header" && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute top-full mt-2.5 right-0 z-50 pointer-events-none whitespace-nowrap px-3.5 py-2 rounded-lg bg-[var(--theme-surface)]/95 backdrop-blur-xl border border-[var(--theme-border-hover)] shadow-2xl text-[11px] font-sans text-[var(--theme-text)]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isAutoSchedule
                      ? "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]"
                      : "bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)]"
                  }`}
                />
                <span className="font-semibold text-[var(--theme-accent)] uppercase tracking-wider text-[10px]">
                  {isAutoSchedule ? "Auto Scheduled" : "Manual Override"}
                </span>
                <span className="text-[var(--theme-text-faint)]">•</span>
                <span className="capitalize font-medium">{isLight ? "Light Mode" : "Dark Mode"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[var(--theme-text-muted)] font-mono">
                <Clock className="w-3 h-3 text-[var(--theme-accent)]" />
                <span>7 AM – 7 PM Light • 7 PM – 7 AM Dark</span>
              </div>
              <p className="text-[9.5px] text-[var(--theme-text-faint)] mt-1 border-t border-[var(--theme-border)]/50 pt-1">
                {isAutoSchedule
                  ? `Next auto-switch to ${nextModeLabel} at ${transitionLabel}`
                  : `Overrides schedule until next transition (${transitionLabel})`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Drawer / Mobile Full Details Layout */}
      {showScheduleHint && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAutoSchedule ? "bg-emerald-500" : "bg-[#D4AF37]"
              }`}
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-text)]">
              {isLight ? "Light Active" : "Dark Active"}
            </span>
            <span className="text-[10px] text-[var(--theme-accent)] font-mono">
              ({isAutoSchedule ? "Auto" : "Manual"})
            </span>
          </div>
          <span className="text-[10px] text-[var(--theme-text-muted)] font-mono">
            7 AM–7 PM Light • 7 PM–7 AM Dark
          </span>
        </div>
      )}
    </div>
  );
}
