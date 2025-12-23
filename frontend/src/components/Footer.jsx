import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          
          {/* Brand & Description */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-green-500">RecipeHub</h1>
            <p className="mt-2 text-gray-400 max-w-xs">
              Share your favorite recipes and discover new ones from food lovers around the world.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:items-start gap-2 text-center md:text-left">
            <h2 className="font-semibold text-white">Explore</h2>
            <Link to="/recipes" className="hover:text-green-500">Recipes</Link>
            <Link to="/create-recipe" className="hover:text-green-500">Create Recipe</Link>
            <Link to="/profile" className="hover:text-green-500">Profile</Link>
          </div>

          {/* Social / Contact */}
          <div className="flex flex-col md:items-start gap-2 text-center md:text-left">
            <h2 className="font-semibold text-white">Contact</h2>
            <p className="text-gray-400">support@recipehub.com</p>
            <div className="flex gap-3 mt-1 justify-center md:justify-start">
              <a href="#" className="hover:text-green-500">Facebook</a>
              <a href="#" className="hover:text-green-500">Instagram</a>
              <a href="#" className="hover:text-green-500">Twitter</a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} RecipeHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
