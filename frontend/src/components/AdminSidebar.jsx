import { NavLink } from "react-router";
import { FaTachometerAlt, FaUsers, FaUtensils, FaFolderOpen, FaSignOutAlt, FaCog } from "react-icons/fa";
import { useSelector } from "react-redux";

const AdminSidebar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: FaTachometerAlt, end: true },
    { to: "/admin/users", label: "Users", icon: FaUsers },
    { to: "/admin/recipes", label: "Recipes", icon: FaUtensils },
    { to: "/admin/category", label: "Categories", icon: FaFolderOpen },
  ];

  return (
    <aside className="w-72 bg-zinc-950 text-zinc-100 min-h-screen p-6 border-r border-zinc-800 flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
        <div className="h-1 w-12 bg-emerald-500 mt-3 rounded-full"></div>
         <p className="text-md text-zinc-400 mt-8">
          Welcome, <span className="text-emerald-400 font-medium">{userInfo?.fullname}</span>
        </p>
      </div>

      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-500"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 border-l-4 border-transparent"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-5 h-5" />
                <span className={`font-medium ${isActive ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-2 pt-6 border-t border-zinc-800">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 transition-all duration-200 border-l-4 border-transparent">
          <FaCog className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 border-l-4 border-transparent hover:border-red-500">
          <FaSignOutAlt className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;