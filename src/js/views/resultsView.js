import View from './view.js';
import icons from 'url:../../img/icons.svg'

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage='No Recipe Found For Your Search! Please Try Again!';
  _message="";

  _generateMarkup = function () {
    return this._data.map(this._generatorMarkupPreview).join('');
  };
  _generatorMarkupPreview(result) {
    return `
        <li class="preview">
            <a class="preview__link" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" crossorigin />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>
        `;
  }
}

export default new ResultsView();
