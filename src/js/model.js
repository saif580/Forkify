//Business Logic Goes Here

import {API_URL} from './config.js';
import {getJSON} from './helpers.js';
import { RES_PER_PAGE } from './config.js';

//State To Store Data
export const state = {
  recipe: {},
  search:{
    query:'',
    results:[],
    page:1,
    resultsPerPage:RES_PER_PAGE
  }
};

//Business Logic To Load Recipe
export const loadRecipe = async function (id) {
  try {
    const data=await getJSON(`${API_URL}${id}`)
    const { recipe } = data.data;
    //Stroring Data In State
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredints: recipe.ingredients
    };
  } catch (err) {
    console.error(`${err}`);
    throw err
  } 
}

export const loadSearchResult=async function(query){
    try {
        state.search.query=query;
        const data=await getJSON(`${API_URL}?search=${query}`)
        state.search.results=data.data.recipes.map(rec=>{
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })
    } catch(err){
        console.log(err);
        throw err;
    }
}

export const getSearchResultsPage= function(page=state.search.page){
    state.search.page=page;
    //page=1 s=(0*10),e=10; page=2 s=(1*10),e=20
    const start=(page-1)*state.search.resultsPerPage;
    const end=page*state.search.resultsPerPage;
    return state.search.results.slice(start,end);
}

export const updateServings = function (newServings) {
    state.recipe.ingredints.forEach(ing => {
      ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
      // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
    });
    console.log(state.recipe);
  
    state.recipe.servings = newServings;
  };