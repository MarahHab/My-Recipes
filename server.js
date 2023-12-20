const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dairyIngredients = ["cream", "cheese", "milk", "butter", "creme", "ricotta", "mozzarella", "custard", "cream cheese", "condensed milk", "heavy cream"];
const glutenIngredients = ["flour", "bread", "spaghetti", "biscuits", "beer"];
const unvegetarianIngredients = ["red snapper","chicken stock","lamb loin chops", "chicken thighs", "salmon", "chicken", "beef", "pork", "fish", "shrimp", "lamb", "bacon", "sausage", "cream", "cheese", "milk", "butter", "creme", "ricotta", "mozzarella", "custard", "cream cheese", "condensed milk", "heavy cream","parmigiano-reggiano"];


app.get('/', (req, res) => {
  res.end();
});

app.get('/recipes/:ingredient', async (req, res) => {
  try {
    const ingredient = req.params.ingredient;
    const apiUrl = `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${ingredient}`;

    const response = await axios.get(apiUrl);
    const responseData = response.data;
    const recipes = filtered(responseData.results);
    
    const glutenFree = req.query.glutenFree === 'true';
    const dairyFree = req.query.dairyFree === 'true';
    const unvegetarianFree = req.query.unvegetarianFree === 'true';

    const filteredRecipes = recipes.filter(recipe => {
      if (glutenFree && recipeContainsGluten(recipe)) { 
        
        return false;
      }

      if (dairyFree && recipeContainsDairy(recipe)) {
        
        return false;
      }
      if (unvegetarianFree && recipeContainsUnvegetarian(recipe)) {
        return false;
      }
      return true;
    });

  
    res.status(200).json({ recipes: filteredRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error Occured' });
  }
});

function recipeContainsGluten(recipe) {
  const ingredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
  return ingredients.some(ingredient => glutenIngredients.includes(ingredient));
}

function recipeContainsDairy(recipe) {
  const ingredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
  return ingredients.some(ingredient => dairyIngredients.includes(ingredient));
}

function recipeContainsUnvegetarian(recipe) {
  const ingredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
  return ingredients.some(ingredient => unvegetarianIngredients.includes(ingredient));
}

const filtered = function (arr) {
  return arr.map(recipe => ({
    title: recipe.title,
    thumbnail: recipe.thumbnail,
    href: recipe.href,
    ingredients: recipe.ingredients
  }));
}

const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
