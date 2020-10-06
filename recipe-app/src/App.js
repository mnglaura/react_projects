import React,{useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  const APP_ID = '02c33af1';
  const APP_KEY = '83b8c68d64682b6fecf7887e9e79a9e8';

  const [recipes, setRecipes] = useState([]); //state used to fetch and display data on screen
  const [search, setSearch] = useState(""); //state used to update state with the input box value. Once the user types, the state gets updated
  const [query, setQuery] = useState('chicken'); //state used to get the search item once form is submitted. Initial valud is 'chicken' and it will be changed

//when the page will render, useEffect() will be called once because
//of the second param [] and will call the getRecipes()

  useEffect(() => {
    getRecipes();
  }, [query]); //useEffect() will be called only when the query state gets updated. If [], then it will be called once when the app first renders

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch(''); //the input field is set back to '' based on value={search} propriety in input element
  }

  return(
    <div className="App">
      <form onSubmit ={getSearch} className="search-form">
        <input className="search-bar" type='text' value={search} onChange={updateSearch}/>
        <button className="search-button" type='submit'>
          Search
        </button> 
      </form>
      <div className ="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title ={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))};
      </div>
    </div>
  );
};

export default App;
