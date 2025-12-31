import React from "react";

const About = () => {
  return (
    <div className="min-h-screen from-neutral-50 to-stone-100">
      <div className="max-w-6xl mx-auto px-6 py-20">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-stone-900 mb-6">
            About RecipeHub
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 to-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Description */}
        <p className="text-xl text-stone-600 text-center max-w-3xl mx-auto mb-20 leading-relaxed">
          RecipeHub is your ultimate destination to share, discover, and enjoy
          delicious recipes from food lovers around the world. Whether you're a
          professional chef or a home cook, RecipeHub makes it easy to save your
          favorite recipes, rate them, comment, and explore new culinary ideas.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-stone-200 group">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">📝</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-3">Share Recipes</h2>
            <p className="text-stone-600 leading-relaxed">
              Create and share your own recipes with the community easily.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-stone-200 group">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">🔍</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-3">Discover</h2>
            <p className="text-stone-600 leading-relaxed">
              Browse top recipes, trending dishes, and explore new culinary ideas.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-stone-200 group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-3xl">💬</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-3">Interact</h2>
            <p className="text-stone-600 leading-relaxed">
              Rate, comment, like, and bookmark recipes you love to keep them handy.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-3xl p-12 shadow-xl text-center border border-stone-200">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Join RecipeHub Today!
          </h2>
          <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
            Start sharing your recipes and exploring the culinary world.
          </p>
          <a
            href="/register"
            className="inline-block bg-gradient-to-r from-emerald-500 to-green-600 text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get Started
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default About;
