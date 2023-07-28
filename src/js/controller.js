//Business controlling part goes here
//importing state and loadRecipe
import * as model from './model.js';
//importing views
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
//importing parcel and polyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if(module.hot){
  module.hot.accept();
}

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
    resultsView.renderSpinner();
    //Get search query
    const query=searchView.getQuery();
    if(!query) return;

    //load search results
    await model.loadSearchResult(query)

    //render the rsults
    resultsView.render(model.getSearchResultsPage());

    //Render intial pagination
    paginationView.render(model.state.search)
  } catch(err) {
    console.log(err);
  }
};

const controlPagination=function(goToPage){
  //render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //Render intial pagination
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.render(model.state.recipe);
};

const newFeature=function(){
  console.log("welcome To the Application");
}

const init=function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSerachResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  newFeature()
}
init();
