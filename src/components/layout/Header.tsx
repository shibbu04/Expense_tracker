import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "../ui/Button";
import { Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 items-center justify-between">
          <div className="mr-4 hidden lg:flex">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a
                href="/"
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                Overview
              </a>
              <a
                href="/expenses"
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                Expenses
              </a>
              <a
                href="/reports"
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                Reports
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}