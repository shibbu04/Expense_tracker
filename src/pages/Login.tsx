import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface LoginProps {
  onLogin: (userData: { name: string; salary: number }) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [formData, setFormData] = useState({
    name: "",
    salary: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: formData.name,
      salary: Number(formData.salary),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
      <div className="w-full max-w-md p-8 space-y-6 bg-background rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-muted-foreground">Enter your details to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Name
            </label>
            <input
              type="text"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Monthly Salary (₹)
            </label>
            <input
              type="number"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your monthly salary"
              value={formData.salary}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Continue to Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}