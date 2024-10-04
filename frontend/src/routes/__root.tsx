import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import {
  Home,
  DollarSign,
  Github,
  Menu,
  CirclePlus,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-950/80 border-b border-gray-200 dark:border-neutral-800 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                Expenso
              </span>
            </Link>
            <nav className="hidden md:flex space-x-1">
              <NavLink to="/" icon={<Home className="w-4 h-4" />}>
                Home
              </NavLink>
              <NavLink to="/expenses" icon={<DollarSign className="w-4 h-4" />}>
                Expenses
              </NavLink>
              <NavLink
                to="/create-expense"
                icon={<CirclePlus className="w-4 h-4" />}
              >
                New
              </NavLink>
            </nav>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-gray-600 dark:text-gray-400"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
              <div className="md:hidden">
                <Sheet
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="w-6 h-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[200px] sm:w-[300px]">
                    <nav className="flex flex-col space-y-4 mt-6">
                      <NavLink to="/" icon={<Home className="w-4 h-4" />}>
                        Home
                      </NavLink>
                      <NavLink
                        to="/expenses"
                        icon={<DollarSign className="w-4 h-4" />}
                      >
                        Expenses
                      </NavLink>
                      <NavLink
                        to="/create-expense"
                        icon={<CirclePlus className="w-4 h-4" />}
                      >
                        New Expense
                      </NavLink>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-white dark:bg-neutral-950 border-t border-gray-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
              © 2024 Expenso. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/moabdelazem/expenso"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
              >
                <Github className="w-6 h-6" />
                <span className="sr-only">GitHub repository</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-200 [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/20 [&.active]:text-blue-600 dark:[&.active]:text-blue-400"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

export default Route;
