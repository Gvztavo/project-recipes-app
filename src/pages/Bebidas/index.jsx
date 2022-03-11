import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import Card from '../../components/Card/Card';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterButtonsDrinks from './FilterButtonsDrinks';

import { useAuth, useRecipes, useSearch } from '../../context';

function Bebidas() {
  const { location: { pathname } } = useHistory();

  const { handleMainPage } = useAuth();
  const { setTerm, setOption } = useSearch();
  const { setCocktails, cocktails: { list } } = useRecipes();

  useEffect(() => () => {
    setTerm('');
    setOption('');
  }, [setOption, setTerm]);

  useEffect(() => {
    const fetchDrinks = async () => {
      const LIST_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const responseList = await fetch(LIST_URL);
      const dataList = await responseList.json();
      const drinksList = await dataList.drinks;

      const CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const responseCategories = await fetch(CATEGORIES_URL);
      const dataCategories = await responseCategories.json();
      const drinksCategories = await dataCategories.drinks;

      setCocktails((prevState) => ({
        ...prevState,
        list: drinksList,
        categories: drinksCategories,
      }));
    };
    console.log(list);
    if (list && list.length === 0) {
      fetchDrinks();
    }
  }, []);

  useEffect(() => {
    handleMainPage(pathname);
  }, [handleMainPage, pathname]);

  const MAX_ELEMENTS = 12;

  const mapDrinklist = (drinksList) => drinksList
    .map(({ strDrink, strDrinkThumb, idDrink }, index) => Card(
      strDrink, strDrinkThumb, index, `/bebidas/${idDrink}`,
    )).slice(0, MAX_ELEMENTS);

  return (
    <main>
      <Header pageTitle="Bebidas" showSearchIcon />
      <FilterButtonsDrinks />
      {list.length === 0
        ? <h1>Loading...</h1>
        : <section className="ingredients-container">{mapDrinklist(list)}</section>}
      <Footer />
    </main>
  );
}

export default Bebidas;
