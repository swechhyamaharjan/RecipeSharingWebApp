import connectDB from "./utils/db.js";

import users from "./data/user.js";
import sampleRecipes from "./data/recipe.js";
import sampleCategories from "./data/category.js"

import User from "./model/user.js";
import Category from "./model/category.js";
import Recipe from "./model/recipe.js";

connectDB();

async function loadData() {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    await Recipe.deleteMany();

    // Insert users
    const insertedUsers = await User.insertMany(users);
    const adminUser = insertedUsers[0]._id;

    // Insert categories
    const insertedCategories = await Category.insertMany(sampleCategories);

    // Create category name → id map
    const categoryMap = {};
    insertedCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Attach admin user & category ID to recipes
    const recipesWithRefs = sampleRecipes.map((recipe) => ({
      ...recipe,
      user: adminUser,
      category: categoryMap[recipe.category], // category name
    }));

    //Insert recipes
    await Recipe.insertMany(recipesWithRefs);

    console.log("Data loaded successfully");
    process.exit();
  } catch (error) {
    console.error("Error loading data:", error);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await User.deleteMany();
    await Category.deleteMany();
    await Recipe.deleteMany();

    console.log("Data destroyed successfully");
    process.exit();
  } catch (error) {
    console.error("Error destroying data:", error);
    process.exit(1);
  }
}

console.log(process.argv);
if (process.argv[2] === "-d") {
  destroyData();
} else {
  loadData();
}
