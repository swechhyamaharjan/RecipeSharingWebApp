import { NavLink, useNavigate } from "react-router";
import { FaTachometerAlt, FaUsers, FaUtensils, FaFolderOpen, FaSignOutAlt, FaCog } from "react-icons/fa";

const AdminSidebar = () => {
  const navItems = [
    { to: "/admin", label: "Dashboard", icon: FaTachometerAlt, end: true },
    { to: "/admin/users", label: "Users", icon: FaUsers },
    { to: "/admin/recipes", label: "Recipes", icon: FaUtensils },
    { to: "/admin/category", label: "Categories", icon: FaFolderOpen },
  ];
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col fixed h-screen">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
      </div>

      {/* Navigation - Scrollable if needed */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-600 border-l-4 border-emerald-700"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 border-l-4 border-transparent"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`text-xl ${isActive ? "text-emerald-400" : ""}`} />
                <span className="font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions - Fixed at bottom */}
      <div className="p-4 border-t border-zinc-800 space-y-2">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 transition-all duration-200 w-full border-l-4 border-transparent"
        onClick={()=>navigate("/admin/setting")}>
          <FaCog className="text-xl" />
          <span className="font-medium">Settings</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 w-full border-l-4 border-red-500">
          <FaSignOutAlt className="text-xl" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;