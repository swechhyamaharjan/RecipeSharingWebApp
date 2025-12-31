import { NavLink } from "react-router"; // <-- use NavLink
import { FaPlus, FaUserCircle, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.jpg";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between h-16">
        {/* Left: Logo & Brand */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-12 w-12 object-contain" />
          <span className="text-xl font-bold text-green-600">RecipeHub</span>
        </NavLink>

        {/* Center: Nav + Search */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes..."
              className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Nav Links */}
          {[
            { name: "Home", path: "/" },
            { name: "Recipes", path: "/recipes" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-medium text-gray-700 hover:text-orange-600 ${
                  isActive ? "text-orange-600 font-bold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right: Create + Profile */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/create-recipe"
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center gap-1"
          >
            <FaPlus />
            <span>Create</span>
          </NavLink>
          <NavLink to="/profile">
            <FaUserCircle className="text-2xl text-gray-700 hover:text-gray-900" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
