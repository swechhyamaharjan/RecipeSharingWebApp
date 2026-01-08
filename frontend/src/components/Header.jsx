import { NavLink } from "react-router";
import { FaPlus, FaUserCircle, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import { useSelector, useDispatch } from "react-redux"
import { removeCredentails } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userapiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async()=>{
    try {
      await logout().unwrap();
      dispatch(removeCredentails())
      navigate("/")
    } catch (error) {
      toast.error(error?.data?.error)
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between h-16">
        {/*Logo & Brand */}
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
                `font-medium text-gray-700 hover:text-orange-600 ${isActive ? "text-orange-600 font-bold" : ""
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
          {!userInfo ? (
            <NavLink to="/signin">
              <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                Signin
              </button>
            </NavLink>
          ) : (
            <div className="relative group">
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
                  to="/bookmarks"
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
          )
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
