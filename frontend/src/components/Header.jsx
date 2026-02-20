import { NavLink } from "react-router";
import { FaPlus, FaUserCircle, FaSearch, FaBars, FaTimes, FaBell } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import { useSelector, useDispatch } from "react-redux"
import { removeCredentials } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userapiSlice";
import { useGetMyNotificationQuery } from "../slices/notificationApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";


const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const { data: notifications = [] } = useGetMyNotificationQuery(undefined, {
    pollingInterval: 5000,
    skip: !userInfo
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [keyword, setKeyword] = useState("");

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Debounced live search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword.trim()) {
        navigate(`/recipes?keyword=${keyword}`);
      } else if (keyword === "" && window.location.pathname === "/recipes") {
        navigate("/recipes");
      }
    }, 500); // 500ms delay for debouncing
    return () => clearTimeout(timer);
  }, [keyword, navigate]);

  const searchHandler = async (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/recipes?keyword=${keyword}`);
      setMobileMenuOpen(false);
    } else {
      navigate("/recipes");
    }
  }

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(removeCredentials())
      navigate("/")
      setMobileMenuOpen(false);
    } catch (error) {
      toast.error(error?.data?.error)
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between h-16">
        {/*Logo & Brand */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
          <span className="text-lg sm:text-xl font-bold text-green-600">RecipeHub</span>
        </NavLink>

        {/* Center: Nav + Search - Desktop Only */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          {/* Search */}
          <form className="relative" onSubmit={searchHandler}>
            <input
              type="text"
              placeholder="Search recipes..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={searchHandler} />
          </form>

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
                `font-medium text-gray-700 hover:text-orange-600 ${isActive ? "text-orange-600 font-bold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right: Create + Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          <NavLink
            to="/notification"
            className="relative text-gray-700 hover:text-orange-600 text-xl sm:text-2xl"
          >
            <FaBell />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/create-recipe"
            className="bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md hover:bg-green-600 flex items-center gap-1 text-sm sm:text-base"
          >
            <FaPlus />
            <span className="hidden sm:inline">Create</span>
          </NavLink>

          {!userInfo ? (
            <NavLink to="/signin">
              <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm sm:text-base">
                Signin
              </button>
            </NavLink>
          ) : (
            <div className="relative group hidden lg:block">
              <div className="flex items-center gap-2">
                <FaUserCircle className="text-2xl text-gray-700 hover:text-gray-900 cursor-pointer" />
                <span className="text-sm text-gray-700">
                  {userInfo.fullname}
                </span>
              </div>

              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible
                   transition-all duration-200 z-50" >
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >
                  Profile
                </NavLink>

                <NavLink
                  to="/my-recipes"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >
                  My Recipes
                </NavLink>

                <NavLink
                  to="/bookmark"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Bookmarks
                </NavLink>

                <hr className="my-1" />

                <button onClick={logoutHandler}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-700 text-2xl"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          {/* Search Bar Mobile */}
          <div className="px-4 py-3">
            <form onSubmit={searchHandler} className="relative">
              <input
                type="text"
                placeholder="Search recipes..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={searchHandler} />
            </form >
          </div>

          {/* Nav Links Mobile */}
          <div className="px-4 py-2 space-y-1">
            {[
              { name: "Home", path: "/" },
              { name: "Recipes", path: "/recipes" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md font-medium text-gray-700 hover:bg-gray-100 ${isActive ? "text-orange-600 bg-orange-50" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* User Menu Mobile */}
          {userInfo && (
            <div className="px-4 py-2 border-t border-gray-200">
              <div className="flex items-center gap-2 px-4 py-2">
                <FaUserCircle className="text-2xl text-gray-700" />
                <span className="text-sm text-gray-700 font-medium">
                  {userInfo.fullname}
                </span>
              </div>

              <div className="space-y-1 mt-2">
                <NavLink
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md" >
                  Profile
                </NavLink>

                <NavLink
                  to="/my-recipes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md" >
                  My Recipes
                </NavLink>

                <NavLink
                  to="/bookmark"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  Bookmarks
                </NavLink>

                <button onClick={logoutHandler}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 rounded-md">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;