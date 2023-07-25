//Business Logic Goes Here

import {API_URL} from './config.js';
import {getJSON} from './helpers.js';

//State To Store Data
export const state = {
  recipe: {},
  search:{
    query:'',
    results:[],
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
        console.log(data);
        state.search.results=data.data.recipes.map(rec=>{
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })
        console.log(state.search.results);
    } catch(err){
        console.log(err);
        throw err;
    }
}
