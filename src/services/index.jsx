// const mealListEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
// const drinkListEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const mealCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const drinkCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

function fetchMealCategories() {
  return fetch(mealCategories)
    .then((res) => res.json())
    .then((data) => data.meals);
}

export function fetchDrinkCategories() {
  return fetch(drinkCategories)
    .then((res) => res.json())
    .then((data) => data.drinks);
}

export default function fetchCategories(page) {
  if (page === 'Meals') return fetchMealCategories;
  if (page === 'Drinks') return fetchDrinkCategories;
}
