import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export const NavBar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return (savedTheme as 'light' | 'dark') || (prefersDark ? 'dark' : 'light');
  });
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    // Update document class when theme changes
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  return (
    <nav className="bg-card backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={closeMobileMenu}>
              <h1 className="text-2xl font-bold text-foreground">Mibrary</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between space-x-8">
            <div className="flex space-x-6">
              <Link 
                to="/" 
                className={`transition-colors ${
                  location.pathname === "/" 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                Home
              </Link>
              <Link 
                to="/library" 
                className={`transition-colors ${
                  location.pathname === "/library" 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                My Library
              </Link>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">New Release</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Events</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-primary"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>
              <Button size="sm">Login</Button>
            </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-primary"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2 transition-transform duration-200 hover:scale-110"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Menu className={`h-8 w-8 absolute transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                <X className={`h-8 w-8 absolute transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-sm border-t border-border">
            <Link 
              to="/" 
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 transform hover:translate-x-1 ${
                location.pathname === "/" 
                  ? "text-primary bg-accent" 
                  : "text-muted-foreground hover:text-primary hover:bg-accent/50"
              } ${isMobileMenuOpen ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: '0.1s' }}
            >
              Home
            </Link>
            <Link 
              to="/library" 
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 transform hover:translate-x-1 ${
                location.pathname === "/library" 
                  ? "text-primary bg-accent" 
                  : "text-muted-foreground hover:text-primary hover:bg-accent/50"
              } ${isMobileMenuOpen ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              My Library
            </Link>
            <a 
              href="#" 
              className={`block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200 transform hover:translate-x-1 ${isMobileMenuOpen ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: '0.3s' }}
            >
              New Release
            </a>
            <a 
              href="#" 
              className={`block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200 transform hover:translate-x-1 ${isMobileMenuOpen ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: '0.4s' }}
            >
              Events
            </a>
            <a 
              href="#" 
              className={`block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200 transform hover:translate-x-1 ${isMobileMenuOpen ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: '0.5s' }}
            >
              About
            </a>
            <div className={`pt-4 pb-2 space-y-2 ${isMobileMenuOpen ? 'animate-fade-in' : ''}`} style={{ animationDelay: '0.6s' }}>
              <Button variant="outline" size="sm" className="w-full transition-all duration-200 hover:scale-105">
                Download App
              </Button>
              <Button size="sm" className="w-full transition-all duration-200 hover:scale-105">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};