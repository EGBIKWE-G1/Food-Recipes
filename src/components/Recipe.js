import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import RecipeCard from "./RecipeCard";

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function Recipe() {
    const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
    
  // search for the recipe
  const searchRecipes = async () => {
    setIsLoading(true);
    const url = searchApi + query
    const res = await fetch(url);
    const data = await res.json();    
    setRecipes(data.meals);
    setIsLoading(false);
    console.log(data.meals);
  };

  useEffect(() => {
    searchRecipes()   
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  }

  return (
    <div className="container">
        <h2>My Food Recipes Is Ready</h2>
      <SearchBar
        isLoading={isLoading}
        query={query}  
        setQuery={setQuery}
        handleSubmit={handleSubmit}    
      />
      <div className="recipes">
        
        {recipes ? recipes.map(recipe => (
          <RecipeCard
             key={recipe.idMeal}
             recipe={recipe}
          />
        )) : "No Results."}
      </div>
    </div>
  )
}

export default Recipe