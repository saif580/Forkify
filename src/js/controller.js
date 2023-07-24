const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

// APT key-56ba4b15-c90e-4d7f-851d-6d4615c9ea3a

///////////////////////////////////////

const getReceipe=async function(){
  try {
    const res=await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');
    const data=await res.json();
    if(!res.ok) throw new Error(`${data.message}`)
    console.log(res);
    let {recipe}=data.data;
    recipe={
      id:recipe.id,
      title:recipe.title,
      publisher:recipe.publisher,
      sourceUrl:recipe.source_url,
      imageUrl:recipe.image_url,
      servings:recipe.servings,
      cookingTime:recipe.cooking_time,
      ingredints:recipe.ingredients
    }
    console.log(recipe);
  } catch(err) {
    console.log(err);
  }
}
getReceipe();

