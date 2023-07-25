import icons from 'url:../../img/icons.svg'

export default class View {
  _data
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
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
    `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', spinner)
  }

  //Render Error markup
  renderError (message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  //Render Message markup
  renderMessage (message = this._message) {
    const markup = `
        <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
        `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }
}
