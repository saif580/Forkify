//importing icons and fractional(to show how many cups,spoons used)
import icons from 'url:../../img/icons.svg'
import { Fraction } from 'fractional'
import View from './view';

//creating class for receipe view then exporting the object of this class
class RecipeView {
  //private variables/members;cannot be accessed outside this class declared with _.
  _parentElement = document.querySelector('.recipe')
  _data
  _errorMessage='We could not find that recipe. Please try another one!';
  _message="";

  //Rendering the receipe
  render (data) {
    this._data = data
    const markUp = this._generateMarkup()
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markUp)
  }

  //Clearing HTML
  _clear () {
    this._parentElement.innerHTML = ''
  }

  //Spinner loading function
  renderSpinner = function () {
    const spinner = `
    <div class="spinner">
          <svg>
            <use href="${icons}_icon-loader"></use>
          </svg>
        </div>
    `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', spinner)
  }

  //Render Error markup
  renderError (message=this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}_icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

    //Render Message markup
    renderMessage (message=this._message) {
        const markup = `
        <div class="error">
                <div>
                  <svg>
                    <use href="${icons}_icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
      }

  addHandlerRender (handler) {
    //Loading receipe on recipe change and browser's new window
    const eventType = ['hashchange', 'load']
    eventType.forEach(ev => window.addEventListener(ev, handler))
  }

  //Generating markup for different recipes
  _generateMarkup () {
    return `
    <figure class="recipe__fig">
          <img src="${this._data.imageUrl}" alt="${
      this._data.title
    }" class="recipe__img" crossorigin />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}_icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}_icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}_icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}_icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}_icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}_icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredints.map(this._generateMarkupIngredient).join(' ')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}_icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `
  }

  //Generating ingredients markup
  _generateMarkupIngredient (ing) {
    return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}_icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ing.quantity ? new Fraction(ing.quantity).toString() : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>
    `
  }
}

export default new RecipeView()
