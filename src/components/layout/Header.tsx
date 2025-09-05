import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calendar, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/auth/AuthDialog";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SimpleSearchDialog from "@/components/features/SimpleSearchDialog";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Men's Hair", href: "/mens-hair" },
    { name: "Women's Beauty", href: "/womens-beauty" },
    { name: "Nail Studios", href: "/nail-studios" },
    { name: "Makeup Artists", href: "/makeup-artists" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const dashboardPath = role === "owner" ? "/store-owner-dashboard" : role === "freelancer" ? "/freelancer-dashboard" : "/user-dashboard";

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#1E293B] text-white shadow-md">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 relative">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-white" />
          </Link>

          <div className="block flex-1 min-w-0 pointer-events-none md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <div className="overflow-x-auto no-scrollbar pointer-events-auto px-3 sm:px-4">
              <nav className="flex items-center justify-start md:justify-center space-x-5 md:space-x-6 whitespace-nowrap">
                {navItems.map((item) => {
                  const active = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      state={item.href === "/" ? { allowHome: true } : undefined}
                      className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors hover:bg-white/10 ${active ? "font-semibold text-white" : "text-white/90"}`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button aria-label="Search" className="p-2 rounded-full hover:bg-white/10 text-white" onClick={()=> setSearchOpen(true)}>
              <Search className="w-5 h-5" />
            </button>
            {!user ? (
              <>
                <button onClick={() => setAuthOpen(true)} className="flex items-center gap-2 text-sm text-white/90 hover:text-[#EAB308] transition-colors">
                  <User className="w-4 h-4" />
                  <span>Login / Sign Up</span>
                </button>
                <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
              </>
            ) : (
              <div onMouseEnter={() => setAccountOpen(true)} onMouseLeave={() => setAccountOpen(false)} className="relative">
                <DropdownMenu open={accountOpen} onOpenChange={setAccountOpen}>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer select-none">
                      <Avatar className="h-8 w-8 ring-1 ring-white/30">
                        <AvatarFallback className="bg-white/10 text-white text-xs">{(user?.email?.[0] || "U").toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-white/90 hover:text-[#EAB308]">Account</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[12rem]">
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">Signed in as {user?.email || "user"}</div>
                    <DropdownMenuItem asChild>
                      <Link to={dashboardPath}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={dashboardPath} state={{ tab: "settings" }}>Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()} className="text-red-600">Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-1">
            <button aria-label="Search" className="p-2 text-white" onClick={()=> setSearchOpen(true)}>
              <Search className="w-6 h-6" />
            </button>
            <button
              className="p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20">
            <nav className="py-4 space-y-2 text-white">
              <div className="px-4 grid gap-2">
                {navItems.map((item) => {
                  const active = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      state={item.href === "/" ? { allowHome: true } : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className={`py-2 text-sm hover:text-[#3B82F6] hover:font-semibold ${active ? "font-semibold" : "text-white"}`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              <div className="px-4 pt-2 grid gap-2">
                {!user ? (
                  <button className="flex items-center gap-2 text-white/90 hover:text-[#EAB308] text-sm" onClick={() => { setAuthOpen(true); setIsMenuOpen(false); }}>
                    <User className="w-4 h-4" />
                    <span>Login / Sign Up</span>
                  </button>
                ) : (
                  <>
                    <Link to={dashboardPath} onClick={() => setIsMenuOpen(false)} className="text-sm text-white/90 hover:text-[#EAB308]">Profile</Link>
                    <Link to={dashboardPath} state={{ tab: "settings" }} onClick={() => setIsMenuOpen(false)} className="text-sm text-white/90 hover:text-[#EAB308]">Settings</Link>
                    <button className="text-left text-sm text-red-300 hover:text-red-400" onClick={() => { signOut(); setIsMenuOpen(false); }}>Logout</button>
                  </>
                )}
              </div>
              <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
            </nav>
          </div>
        )}
      </div>
      <SimpleSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Header;
