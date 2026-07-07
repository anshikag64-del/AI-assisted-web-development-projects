import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard, Baby, Briefcase, Wallet, HeartPulse, Utensils, MessageCircleHeart,
  Settings, Sparkles, Search, Bell, Sun, Moon, LogOut
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";

const NAV = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true, id: "dashboard" },
  { to: "/app/baby", label: "Baby", icon: Baby, id: "baby" },
  { to: "/app/career", label: "Career", icon: Briefcase, id: "career" },
  { to: "/app/finance", label: "Finance", icon: Wallet, id: "finance" },
  { to: "/app/health", label: "Health", icon: HeartPulse, id: "health" },
  { to: "/app/meals", label: "Meals", icon: Utensils, id: "meals" },
  { to: "/app/coach", label: "AI Coach", icon: MessageCircleHeart, id: "coach" },
  { to: "/app/settings", label: "Settings", icon: Settings, id: "settings" },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleLogout = async () => { await logout(); navigate("/", { replace: true }); };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-bloom-hero dark:bg-[#160f22]">
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden md:flex sticky top-0 h-screen w-64 flex-col p-4 gap-2">
            <div className="glass rounded-3xl p-5 flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#7C4DFF] to-[#FFB6C1] flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl tracking-tight">BloomNest</span>
            </div>
            <nav className="glass rounded-3xl p-3 flex-1 flex flex-col gap-1">
              {NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    data-testid={`nav-${item.id}`}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#7C4DFF] to-[#B388FF] text-white shadow-[0_10px_30px_-10px_rgba(124,77,255,0.6)]"
                          : "text-[#3F3A5A] dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/5"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" /> {item.label}
                  </NavLink>
                );
              })}
            </nav>
            <div className="glass rounded-3xl p-4 text-xs text-[#5B5476]">
              <div className="font-display text-base text-[#2A2540] dark:text-gray-200">You're doing great. 🌸</div>
              <div className="mt-1">Small steps, big love.</div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            {/* Topbar */}
            <div className="sticky top-0 z-30 p-4">
              <div className="glass rounded-full px-4 py-2 flex items-center gap-3">
                <div className="hidden sm:flex items-center flex-1 gap-2 px-3">
                  <Search className="w-4 h-4 text-[#7C4DFF]" />
                  <Input data-testid="topbar-search" placeholder="Search across your life…" className="border-0 bg-transparent focus-visible:ring-0 shadow-none placeholder:text-[#8B84A8]" />
                </div>
                <div className="flex-1 sm:hidden" />
                <button data-testid="topbar-notifications" className="w-9 h-9 rounded-full bg-white/70 dark:bg-white/10 flex items-center justify-center" aria-label="Notifications">
                  <Bell className="w-4 h-4" />
                </button>
                <button data-testid="topbar-theme" onClick={() => setDark(d => !d)} className="w-9 h-9 rounded-full bg-white/70 dark:bg-white/10 flex items-center justify-center" aria-label="Theme">
                  {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button data-testid="topbar-profile" className="flex items-center gap-2">
                      {user?.picture ? (
                        <img src={user.picture} alt="" className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7C4DFF] to-[#FFB6C1] flex items-center justify-center text-white text-sm font-medium">
                          {user?.name?.[0] || "M"}
                        </div>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-2xl">
                    <DropdownMenuLabel>
                      <div className="font-display text-base">{user?.name}</div>
                      <div className="text-xs text-[#5B5476] font-normal">{user?.email}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem data-testid="menu-logout" onClick={handleLogout} className="text-red-500">
                      <LogOut className="w-4 h-4 mr-2" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="px-4 sm:px-6 pb-16">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
