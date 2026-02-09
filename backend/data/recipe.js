const sampleRecipes = [
  {
    title: "Classic Pancakes",
    description: "Fluffy homemade pancakes perfect for breakfast.",
    ingredients: [
      "1 cup all-purpose flour",
      "1 tbsp sugar",
      "1 tsp baking powder",
      "1 cup milk",
      "1 egg",
      "2 tbsp melted butter"
    ],
    instruction: [
      "Mix dry ingredients in a bowl.",
      "Whisk milk, egg, and butter separately.",
      "Combine wet and dry ingredients.",
      "Cook on a heated pan until golden brown."
    ],
    image: "/images/pancake.jpg",
    status: "approved",
    averageRating: 4.5,
    numReviews: 12,
   category: "Breakfast"
  },

  {
    title: "Spicy Chicken Curry",
    description: "Traditional spicy chicken curry with rich flavors.",
    ingredients: [
      "500g chicken",
      "2 onions",
      "2 tomatoes",
      "Garlic & ginger paste",
      "Spices",
      "Oil"
    ],
    instruction: [
      "Heat oil and sauté onions.",
      "Add garlic-ginger paste and spices.",
      "Add chicken and cook until tender.",
      "Add tomatoes and simmer."
    ],
    image: "/images/mainCourse.jpeg",
    status: "approved",
    averageRating: 4.8,
    numReviews: 20,
    category: "Dinner"
  },

  {
    title: "Veg Fried Rice",
    description: "Quick and easy vegetable fried rice.",
    ingredients: [
      "Cooked rice",
      "Carrot",
      "Beans",
      "Capsicum",
      "Soy sauce",
      "Oil"
    ],
    instruction: [
      "Heat oil in a wok.",
      "Stir-fry vegetables.",
      "Add rice and soy sauce.",
      "Mix well and serve hot."
    ],
    image: "/images/vegRice.jpeg",
    status: "approved",
    averageRating: 4.2,
    numReviews: 8,
    category: "Lunch"
  },

  {
    title: "Chocolate Brownies",
    description: "Rich and fudgy chocolate brownies.",
    ingredients: [
      "Dark chocolate",
      "Butter",
      "Sugar",
      "Eggs",
      "Flour",
      "Cocoa powder"
    ],
    instruction: [
      "Melt chocolate and butter.",
      "Mix sugar and eggs.",
      "Combine all ingredients.",
      "Bake at 180°C for 25 minutes."
    ],
    image: "/images/.jpeg",
    status: "pending",
    averageRating: 0,
    numReviews: 0,
    category: "Dessert"
  },

  {
    title: "Caesar Salad",
    description: "Fresh salad with creamy Caesar dressing.",
    ingredients: [
      "Lettuce",
      "Croutons",
      "Parmesan cheese",
      "Grilled chicken",
      "Caesar dressing"
    ],
    instruction: [
      "Wash and chop lettuce.",
      "Add chicken and croutons.",
      "Pour dressing and toss well.",
      "Top with parmesan cheese."
    ],
    image: "/images/caesar.jpeg",
    status: "approved",
    averageRating: 4.0,
    numReviews: 6,
    category: "Nepali Cuisine"
  },
];

export default sampleRecipes;
