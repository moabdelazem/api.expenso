import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { Home, DollarSign, Github, Menu, CirclePlus } from "lucide-react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Route = createRootRoute({
  component: () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900">
        <header className="bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <span className="text-xl font-semibold text-gray-800 dark:text-white">
                    Expenso
                  </span>
                </Link>
              </div>
              <nav className="hidden md:flex space-x-4">
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
                  to="/expenses"
                  icon={<CirclePlus className="w-4 h-4" />}
                >
                  New
                </NavLink>
              </nav>
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
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
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
  },
});

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
