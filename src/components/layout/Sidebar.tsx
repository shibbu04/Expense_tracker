import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import {
  BarChart3,
  Home,
  IndianRupee,
  LogOut,
  // Menu,
  X,
} from "lucide-react";
// import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden",
          {
            "hidden": !isOpen,
          }
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r bg-background p-6 shadow-lg transition-transform duration-300 lg:static lg:block",
          {
            "-translate-x-full lg:translate-x-0": !isOpen,
          }
        )}
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">ExpenseTracker</span>
          <Button
            variant="ghost"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-8 flex flex-col space-y-2">
          <Button variant="ghost" className="justify-start">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start">
            <IndianRupee className="mr-2 h-4 w-4" />
            Expenses
          </Button>
          <Button variant="ghost" className="justify-start">
            <BarChart3 className="mr-2 h-4 w-4" />
            Reports
          </Button>
        </nav>
        <div className="absolute bottom-6 left-6">
          <Button variant="ghost" className="justify-start text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}