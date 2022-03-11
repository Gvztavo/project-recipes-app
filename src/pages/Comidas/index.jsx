import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import Card from '../../components/Card/Card';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterButtonsMeals from './FilterButtonsMeals';

import { useAuth, useRecipes, useSearch } from '../../context';

function Comidas() {
  const { location: { pathname } } = useHistory();

  const { handleMainPage } = useAuth();
  const { setTerm, setOption } = useSearch();
  const { setMeals, meals: { list } } = useRecipes();

  const MAX_ELEMENTS = 12;

  useEffect(() => () => {
    setTerm('');
    setOption('');
  }, [setOption, setTerm]);

  useEffect(() => {
    const fetchMeals = async () => {
      const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const responseList = await fetch(API_URL);
      const dataList = await responseList.json();
      const mealsList = await dataList.meals;

      const URL_MEALS_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const responseCategories = await fetch(URL_MEALS_CATEGORIES);
      const dataCategories = await responseCategories.json();
      const mealsCategories = await dataCategories.meals;

      setMeals((prevState) => ({
        ...prevState,
        list: mealsList,
        categories: mealsCategories,
      }));
    };
    if (list.length === 0) {
      fetchMeals();
    }
  }, []);

  useEffect(() => {
    handleMainPage(pathname);
  }, [handleMainPage, pathname]);

  const mapMeallist = (mealsList) => mealsList
    .map(({ strMeal, strMealThumb, idMeal }, index) => Card(
      strMeal, strMealThumb, index, `/comidas/${idMeal}`,
    ))
    .slice(0, MAX_ELEMENTS);

  return (
    <main>
      <Header pageTitle="Comidas" showSearchIcon />
      <FilterButtonsMeals />
      {list.length === 0
        ? <h1>Loading...</h1>
        : <section className="ingredients-container">{mapMeallist(list)}</section>}
      <Footer />
    </main>
  );
}

export default Comidas;
