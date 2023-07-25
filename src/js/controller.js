import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe')

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`))
    }, s * 1000)
  })
}

// https://forkify-api.herokuapp.com/v2

// APT key-56ba4b15-c90e-4d7f-851d-6d4615c9ea3a

///////////////////////////////////////

//Rendering spinner


const controlRecipes = async function () {
  try {
    //Getting hash id from the url
    const id=window.location.hash.slice(1);
    //if no ID return immediately
    if(!id) return;
    console.log(id);
    //Loading spinner 
    recipeView.renderSpinner();

    //Loading Recipe
    await model.loadRecipe(id);
    // const {recipe}=model.state;

    //Rendering recipe
    recipeView.render(model.state.recipe)
    
  } catch (err) {
    console.log(err);
  }
}

//Loading receipe on recipe change and browser's new window
const eventType=['hashchange','load'];
eventType.forEach(ev=> window.addEventListener(ev,controlRecipes));
// window.addEventListener('hashchange',controlRecipes);
// window.addEventListener('load',controlRecipes)

