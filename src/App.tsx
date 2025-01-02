import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<{ name: string; salary: number } | null>(null);

  const handleLogin = (data: { name: string; salary: number }) => {
    setUserData(data);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="relative min-h-screen bg-background font-sans antialiased">
      <div className="relative flex min-h-screen flex-col">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex-1 items-start lg:grid lg:grid-cols-[280px_1fr]">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <main className="flex w-full flex-col overflow-hidden">
            <Dashboard userData={userData!} />
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}