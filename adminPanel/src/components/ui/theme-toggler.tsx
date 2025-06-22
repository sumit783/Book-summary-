"use client";

import { useState, useEffect } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { Button } from "./button";

type Theme = "light" | "dark";

export function ThemeToggler() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("admin-theme") as Theme;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("admin-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="flex items-end justify-end gap-2">
      
      {/* Light/Dark Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="h-8 w-8 p-0 border-border hover:bg-accent hover:text-accent-foreground"
        title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
      >
        {theme === "light" ? (
          <IconMoon className="h-4 w-4" />
        ) : (
          <IconSun className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
} 