import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { X } from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent showCloseButton={false} className="backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80 border border-border shadow-2xl rounded-2xl p-0 overflow-hidden max-w-md">
        {/* Custom Close Button */}
        <DialogClose asChild>
          <button className="absolute top-4 right-4 z-20 text-neutral-400 hover:text-primary transition-colors text-xl font-bold p-1 rounded-full bg-white/70 dark:bg-neutral-900/70 shadow-md focus:outline-none">
            <X className="w-6 h-6" />
            <span className="sr-only">Close</span>
          </button>
        </DialogClose>
        {/* Decorative SVG Geometric Pattern */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Modern diagonal grid pattern */}
          <svg width="100%" height="100%" className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="32" height="32" patternTransform="rotate(45)">
                <rect x="0" y="0" width="32" height="32" fill="none" />
                <line x1="0" y1="0" x2="0" y2="32" stroke="#a5b4fc" strokeWidth="2" opacity="0.08" />
              </pattern>
              <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
                <circle cx="2" cy="2" r="2" fill="#818cf8" opacity="0.07" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalLines)" />
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        {/* Gradient/Glassmorphism Header */}
        <div className="relative flex flex-col items-center justify-center px-8 pt-8 pb-4 bg-gradient-to-tr from-primary/30 via-secondary/20 to-background/80 dark:from-primary/40 dark:via-secondary/30 dark:to-background/80 z-10">
          <DialogHeader className="w-full">
            <DialogTitle className="mb-1 text-2xl font-extrabold text-center tracking-tight drop-shadow-sm">
              {tab === 'login' ? 'Login to your account' : 'Create an account'}
            </DialogTitle>
            <DialogDescription className="mb-2 text-center text-muted-foreground">
              {tab === 'login' ? 'Welcome back! Please enter your details.' : 'Sign up to get started.'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full mb-2 space-x-2 mt-2">
            <button
              className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-200 text-base ${tab === 'login' ? 'bg-primary text-white shadow-lg scale-105' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
              onClick={() => setTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-200 text-base ${tab === 'signup' ? 'bg-primary text-white shadow-lg scale-105' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
              onClick={() => setTab('signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
        {/* Animated Tab Content */}
        <div className="relative px-8 pt-4 pb-8 animate-fade-in z-10">
          {tab === 'login' ? (
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200">Email</label>
                <input type="email" className="w-full px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/60 transition text-base shadow-sm" placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200">Password</label>
                <input type="password" className="w-full px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/60 transition text-base shadow-sm" placeholder="••••••••" />
              </div>
              <button type="submit" className="w-full py-2 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white font-semibold shadow-md hover:scale-105 transition-transform text-base">Login</button>
            </form>
          ) : (
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200">Name</label>
                <input type="text" className="w-full px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/60 transition text-base shadow-sm" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200">Email</label>
                <input type="email" className="w-full px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/60 transition text-base shadow-sm" placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200">Password</label>
                <input type="password" className="w-full px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary/60 transition text-base shadow-sm" placeholder="Create a password" />
              </div>
              <button type="submit" className="w-full py-2 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white font-semibold shadow-md hover:scale-105 transition-transform text-base">Sign Up</button>
            </form>
          )}
          {/* Divider with OR */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-muted-foreground/20" />
            <span className="mx-4 text-muted-foreground text-xs font-semibold uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-muted-foreground/20" />
          </div>
          {/* Social Login Buttons */}
          <div className="flex gap-4 justify-center">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-base font-medium">
              <FcGoogle className="w-5 h-5" /> Google
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-base font-medium">
              <FaGithub className="w-5 h-5" /> GitHub
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add to your global CSS if not present:
// .glassmorphism { background: rgba(255,255,255,0.7); box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37); backdrop-filter: blur(8px); }
// .animate-fade-in { animation: fadeIn 0.5s both; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } } 