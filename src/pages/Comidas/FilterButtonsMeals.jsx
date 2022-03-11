import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';

import { useRecipes } from '../../context';

import './styles.css';

function FilterButtonsMeals() {
  const [isFiltered, setIsFiltered] = useState(false);
  const [categoryBtnIndex, setCategoryBtnIndex] = useState(null);
  const { meals: { categories }, setMealsList } = useRecipes();
  const MAX_ELEMENT = 5;

  const fetchByAll = async () => {
    const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const responseList = await fetch(API_URL);
    const dataList = await responseList.json();
    const mealsList = await dataList.meals;
    setMealsList(mealsList);
    setIsFiltered((prevState) => !prevState);
  };

  const fetchByCategory = async (category, index) => {
    if (!isFiltered || index !== categoryBtnIndex) {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(url);
      const { meals } = await response.json();
      setMealsList(meals);
      setIsFiltered((prevState) => !prevState);
      setCategoryBtnIndex(index);
    } else {
      fetchByAll();
    }
  };

  return (
    <div className="filter-buttons">
      <Button
        data-testid="All-category-filter"
        onClick={ fetchByAll }
      >
        All
      </Button>
      {categories.map((category, index) => {
        if (index < MAX_ELEMENT) {
          return (
            <Button
              key={ index }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => fetchByCategory(category.strCategory, index) }
            >
              {category.strCategory}
            </Button>);
        }
        return null;
      })}
    </div>

  );
}

export default FilterButtonsMeals;
