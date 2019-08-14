////////////////////////////////////////////////////////////////////////
// Search View
////////////////////////////////////////////////////////////////////////

import { elements } from "./base";

///////////////////////////////////////////////////////////////////////
// Export Functions
////////////////////////////////////////////////////////////////////////

export const getInput = () => elements.searchInput.value; // returns value of search input field

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResList.innerHTML = "";
  elements.searchResPages.innerHTML = "";
};

///////////////////////////////////////////////////////////////////////
// Functions
///////////////////////////////////////////////////////////////////////

// 'Pasta with tomato and spinach'
// acc = 0 / acc + cur.length = 5  / newTitle  = ['Pasta']
// acc = 5 / acc + cur.length = 9  / newTitle  = ['Pasta', 'with']
// acc = 9 / acc + cur.length = 16  / newTitle  = ['Pasta', 'with', 'tomato']
// acc = 15 / acc + cur.length = 18 / newTitle  = ['Pasta', 'with', 'tomato']
// acc = 18 / acc + cur.length = 24  / newTitle  = ['Pasta', 'with', 'tomato']

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    // split title into array
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0); // 0 is initial value of accumulator
    return `${newTitle.join(" ")}...`;
  }
  return title;
};

// const renderRecipe = recipe => {
//   const markup = `
//     <li>
//         <a class="results__link" href="#${recipe.recipe_id}">
//             <figure class="results__fig">
//                 <img src="${recipe.image_url}" alt="${recipe.title}">
//             </figure>
//             <div class="results__data">
//                 <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
//                 <p class="results__author">${recipe.publisher}</p>
//             </div>
//         </a>
//     </li>
//     `;

//   elements.searchResList.insertAdjacentHTML("beforeend", markup);
// };

const renderRecipe = recipe => {
  const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
                      recipe.title
                    )}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

// Type : 'prev' or 'next'
const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
<span>Page ${type === "prev" ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${
          type === "prev" ? "left" : "right"
        }"></use>
    </svg>
    
</button>
`;

const renderButtons = (page, numResult, resPerPage) => {
  // Math.ceil will round up
  // ex: 4.5 = 5 pages
  const pages = Math.ceil(numResult / resPerPage);
  let button;

  if (page === 1 && pages > 1) {
    // Render button for the next page
    button = createButton(page, "next");
  } else if (page < pages) {
    // Render buttons for both next and previouse page
    button = `
    ${(button = createButton(page, "prev"))}
    ${(button = createButton(page, "next"))}
    `;
  } else if (page === pages && pages > 1) {
    // If page is on the last page only render the previous button
    button = createButton(page, "prev");
  }

  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // render results of current page
  const start = (page - 1) * resPerPage; // 0
  const end = page * resPerPage; // 10

  // Renders 10 recipes on Page
  // recipes will be passed in as state.search.result line 20 index.js from Search.js

  recipes.slice(start, end).forEach(renderRecipe);

  // Render pagination butttons
  renderButtons(page, recipes.length, resPerPage);
};
