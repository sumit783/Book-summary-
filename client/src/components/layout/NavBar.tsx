import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { LoginDialog } from "@/components/layout/LoginDialog";

export const NavBar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem("theme");
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return (savedTheme as "light" | "dark") || (prefersDark ? "dark" : "light");
  });
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    // Update document class when theme changes
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <nav className=" backdrop-blur-xl border-b border-border sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Branding with logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md">
                {/* Logo placeholder */}
                <span className="text-white text-xl font-bold select-none">
                  M
                </span>
              </div>
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="hover:scale-105 transition-transform"
              >
                <h1 className="text-2xl font-extrabold text-foreground tracking-tight drop-shadow-sm">
                  Mibrary
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between space-x-10">
              <div className="flex space-x-6">
                <Link
                  to="/"
                  className={`relative px-2 py-1 transition-colors duration-200 font-medium rounded-lg after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary focus:text-primary ${
                    location.pathname === "/"
                      ? "text-primary after:scale-x-100"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/myLibrary"
                  className={`relative px-2 py-1 transition-colors duration-200 font-medium rounded-lg after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary focus:text-primary ${
                    location.pathname === "/myLibrary"
                      ? "text-primary after:scale-x-100"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  My Library
                </Link>
                <Link
                  to="/bookStore"
                  className={`relative px-2 py-1 transition-colors duration-200 font-medium rounded-lg after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary focus:text-primary ${
                    location.pathname === "/bookStore"
                      ? "text-primary after:scale-x-100"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  Book Store
                </Link>
                <Link
                  to="/about"
                  className={`relative px-2 py-1 transition-colors duration-200 font-medium rounded-lg after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary focus:text-primary ${
                    location.pathname === "/about"
                      ? "text-primary after:scale-x-100"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  About
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <span className="transition-transform duration-300 ease-in-out inline-block">
                  {theme === "light" ? (
                    <Moon className="h-5 w-5 animate-spin-slow" />
                  ) : (
                    <Sun className="h-5 w-5 animate-spin-slow" />
                  )}
                </span>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-tr from-primary to-secondary text-white shadow-md hover:scale-105 transition-transform"
                onClick={() => setLoginDialogOpen(true)}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2 z-50 relative">
              <div className="relative w-8 h-8 flex items-center justify-center">
                {!isMobileMenuOpen && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMobileMenu}
                    className="absolute inset-0 p-2 transition-transform duration-200 hover:scale-110"
                    aria-label="Open menu"
                  >
                    <Menu className="h-8 w-8" />
                  </Button>
                )}
                {isMobileMenuOpen && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeMobileMenu}
                    className="absolute inset-0 p-2 transition-transform duration-200 hover:scale-110"
                    aria-label="Close menu"
                  >
                    <X className="h-8 w-8" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {/* Overlay for mobile menu */}
          <div
            className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
              isMobileMenuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          ></div>
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } z-50 relative`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-xl border-t border-border rounded-b-2xl shadow-xl">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-semibold transition-all duration-300 transform hover:translate-x-1 shadow-sm relative after:absolute after:bottom-1 after:left-3 after:w-[calc(100%-1.5rem)] after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary focus:text-primary ${
                  location.pathname === "/"
                    ? "text-primary after:scale-x-100"
                    : "text-muted-foreground hover:text-primary"
                } ${isMobileMenuOpen ? "animate-fade-in" : ""}`}
                style={{ animationDelay: "0.1s" }}
              >
                Home
              </Link>
              <Link
                to="/myLibrary"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-semibold transition-all duration-300 transform hover:translate-x-1 shadow-sm relative after:absolute after:bottom-1 after:left-3 after:w-[calc(100%-1.5rem)] after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary focus:text-primary ${
                  location.pathname === "/myLibrary"
                    ? "text-primary after:scale-x-100"
                    : "text-muted-foreground hover:text-primary"
                } ${isMobileMenuOpen ? "animate-fade-in" : ""}`}
                style={{ animationDelay: "0.2s" }}
              >
                My Library
              </Link>
              <Link
                to="/bookStore"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-semibold transition-all duration-300 transform hover:translate-x-1 shadow-sm relative after:absolute after:bottom-1 after:left-3 after:w-[calc(100%-1.5rem)] after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary focus:text-primary ${
                  location.pathname === "/bookStore"
                    ? "text-primary after:scale-x-100"
                    : "text-muted-foreground hover:text-primary"
                } ${isMobileMenuOpen ? "animate-fade-in" : ""}`}
                style={{ animationDelay: "0.2s" }}
              >
                Book Store
              </Link>
              <Link
                to="/about"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-semibold transition-all duration-300 transform hover:translate-x-1 shadow-sm relative after:absolute after:bottom-1 after:left-3 after:w-[calc(100%-1.5rem)] after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary focus:text-primary ${
                  location.pathname === "/about"
                    ? "text-primary after:scale-x-100"
                    : "text-muted-foreground hover:text-primary"
                } ${isMobileMenuOpen ? "animate-fade-in" : ""}`}
                style={{ animationDelay: "0.5s" }}
              >
                About
              </Link>
              <div
                className={`pt-4 pb-2 space-y-2 ${
                  isMobileMenuOpen ? "animate-fade-in" : ""
                }`}
                style={{ animationDelay: "0.6s" }}
              >
                <Button
                  size="sm"
                  className="w-full transition-all duration-200 hover:scale-105 bg-gradient-to-tr from-primary to-secondary text-white shadow-md"
                  onClick={() => setLoginDialogOpen(true)}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
    </>
  );
};

// Add custom animation for theme icon
// In your global CSS (e.g., index.css or App.css), add:
// .animate-spin-slow { animation: spin 2s linear infinite; }
// .animate-fade-in { animation: fadeIn 0.5s both; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
