import axios from 'axios';
import React, { useState, useEffect } from 'react'
import RecipeCards from './RecipeCards';

function RecipeApp() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRecipes = async () => {
        try {
              const res = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=");
              setRecipes(res.data.meals);
              setLoading(true)
        } catch (err) {
            alert(err.message);
        }
    }
    useEffect(() => {
       getRecipes();
    }, []);
    
  return (
    <div className="container">
      <h2>Our Food Recipes</h2>
        <div className="recipes">
            {loading &&
             recipes.map((recipe)=>(
                <RecipeCards 
                 key={recipe.idMeal}
                 recipe={recipe} />
             ))}
        </div>
    </div>
  )
}

export default RecipeApp