import { useState } from "react";
import { useTheme } from "../context/useTheme";
import { Palette, X } from "lucide-react";

const themePresets = [
  {
    key: "dark",
    label: "Midnight Blue",
    colors: ["#060B18", "#1D4ED8", "#DC2626"],
  },
  {
    key: "light",
    label: "Clean White",
    colors: ["#F8FAFF", "#1D4ED8", "#DC2626"],
  },
  {
    key: "red",
    label: "Midnight Red",
    colors: ["#0D0608", "#DC2626", "#F59E0B"],
  },
  {
    key: "forest",
    label: "Forest Green",
    colors: ["#030D08", "#16A34A", "#DC2626"],
  },
];

function ThemeSwitcher() {
  const { activeTheme, switchTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    // Fixed to bottom right corner — always visible
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      {/* ── Theme options panel ── */}
      {open && (
        <div
          style={{
            background: theme.bgCard,
            border: `1px solid ${theme.border}`,
            backdropFilter: "blur(16px)",
          }}
          className="rounded-2xl p-4 flex flex-col gap-2 shadow-2xl min-w-[180px]"
        >
          <p
            style={{ color: theme.textMuted }}
            className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1"
          >
            Choose Theme
          </p>

          {themePresets.map((preset) => (
            <button
              key={preset.key}
              onClick={() => {
                switchTheme(preset.key);
                setOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer w-full text-left"
              style={{
                background:
                  activeTheme === preset.key
                    ? theme.primaryGlow
                    : "transparent",
                border: `1px solid ${activeTheme === preset.key ? theme.primary : "transparent"}`,
              }}
            >
              {/* Color swatches */}
              <div className="flex gap-1 flex-shrink-0">
                {preset.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-full border border-white/10"
                    style={{ background: color }}
                  />
                ))}
              </div>
              <span
                style={{ color: theme.text }}
                className="text-xs font-medium"
              >
                {preset.label}
              </span>
              {/* Active indicator */}
              {activeTheme === preset.key && (
                <span
                  className="ml-auto text-[10px] font-bold"
                  style={{ color: theme.primary }}
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── Toggle button ── */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
        style={{
          background: theme.accent,
          border: `2px solid ${theme.accentHover}`,
        }}
        aria-label="Toggle theme switcher"
      >
        {open ? (
          <X size={18} color="#fff" />
        ) : (
          <Palette size={18} color="#fff" />
        )}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
