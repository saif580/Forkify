//Business controlling part goes here
//importing state and loadRecipe
import * as model from './model.js';
//importing views
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
//importing parcel and polyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';



// https://forkify-api.herokuapp.com/v2

// APT key-56ba4b15-c90e-4d7f-851d-6d4615c9ea3a

///////////////////////////////////////
//controlRecipe  function
const controlRecipes = async function () {
  try {
    //Getting hash id from the url
    const id=window.location.hash.slice(1);

    //if no ID return immediately
    if(!id) return;

    //Loading spinner 
    recipeView.renderSpinner();

    //Loading Recipe
    await model.loadRecipe(id);

    //Rendering recipe
    recipeView.render(model.state.recipe)
    
  } catch (err) {
    recipeView.renderError()
  }
};

const controlSerachResults=async function(){
  try {
    //Get search query
    const query=searchView.getQuery();
    if(!query) return;

    //load search results
    await model.loadSearchResult(query)

    //render the rsults
    console.log(model.state.search.results);
  } catch(err) {
    console.log(err);
  }
};

const init=function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSerachResults)
}
init();
