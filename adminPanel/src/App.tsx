import { useEffect } from 'react';
import { Layout } from './components/Layout';

const App = () => {
  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem("admin-theme");
    
    // Apply saved theme
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
    else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // Default to light theme if no preference is set
      document.documentElement.classList.remove("dark");
    }
    // Set initial theme in localStorage if not already set
  }, []);

  return <Layout />;
};

export default App;