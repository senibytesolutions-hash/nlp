import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import logo from "../../assets/nlp-logo.jpeg";
import { useAuth } from "../../context/AuthContext.jsx";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard, end: true },
  { label: "Applications", to: "/admin/applications", icon: FileText },
  { label: "Announcements", to: "/admin/announcements", icon: Megaphone },
];

const SidebarContent = ({ onNavigate }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-parchment/10 px-6 py-6">
        <img src={logo} alt="NLP crest" className="h-9 w-9 rounded-full object-cover" />
        <div className="leading-none">
          <p className="font-display text-sm font-semibold text-parchment">NLP Admin</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-parchment/40">
            Control Panel
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6">
        <ul className="flex flex-col gap-1">
          {navItems.map(({ label, to, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gold-600/20 text-gold-200"
                      : "text-parchment/65 hover:bg-parchment/5 hover:text-parchment"
                  }`
                }
              >
                <Icon size={17} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-parchment/10 px-4 py-5">
        <p className="truncate px-2 text-xs text-parchment/45">{admin?.email}</p>
        <NavLink
          to="/"
          className="mt-3 flex items-center gap-2 rounded-md px-2 py-2 text-xs font-medium text-parchment/60 hover:text-gold-200"
        >
          <ExternalLink size={14} /> View public site
        </NavLink>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-parchment/70 hover:text-gold-200"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>
    </div>
  );
};

const AdminLayout = ({ title, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone/50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 bg-ink md:block">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-stone-dark/60 bg-ink px-4 py-4 text-parchment md:hidden">
        <div className="flex items-center gap-2">
          <img src={logo} alt="NLP crest" className="h-8 w-8 rounded-full object-cover" />
          <span className="font-display text-sm font-semibold">NLP Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open admin menu"
          className="p-1"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-ink md:hidden"
            >
              <div className="flex justify-end px-4 pt-4">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close admin menu"
                  className="p-1 text-parchment"
                >
                  <X size={22} />
                </button>
              </div>
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="md:pl-64">
        <div className="container-content py-10">
          {title && (
            <h1 className="mb-8 font-display text-2xl font-semibold text-ink sm:text-3xl">
              {title}
            </h1>
          )}
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
