//Business Logic Goes Here

//State To Store Data
export const state = {
  recipe: {}
};

//Business Logic To Load Recipe
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    //Throwing Error If res.ok is False
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
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
    alert(err)
  }
}
