import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import { RecipesContext } from './RecipesContext';
import { AuthContext } from './AuthContext';

//   {
//     isOpen: false, // Flag para indicar se a searchBar está visível ou não
//     term: '', // Valor do input de texto da searchBar
//     option: '', // Valor do radio btn selecionado (Ingrediente, nome ou Primeira letra)
//   }

export const SearchBarContext = createContext();

export const SearchBarProvider = ({ children }) => {
  const { push } = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [term, setTerm] = useState('');
  const [option, setOption] = useState('');

  const { page } = useContext(AuthContext);
  const { setMealsList, setCocktailsList } = useContext(RecipesContext);

  const toggleSearchBar = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSearch = useCallback((searchTerm, searchOption) => {
    setTerm(searchTerm);
    setOption(searchOption);
  }, []);

  const checkResult = useCallback((result) => {
    if (result.meals && result.meals.length === 1) {
      push(`/comidas/${result.meals[0].idMeal}`);
    }
    if (result.drinks && result.drinks.length === 1) {
      push(`/bebidas/${result.drinks[0].idDrink}`);
    }
    if (result.meals && result.meals.length > 1) {
      setMealsList(result.meals);
    }
    if (result.drinks && result.drinks.length > 1) {
      setCocktailsList(result.drinks);
    }
    if (result.meals === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return null;
    }
    if (result.drinks === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return null;
    }
  }, [push, setMealsList, setCocktailsList]);

  const fetchByOption = useCallback(async (url, searchOption, searchTerm) => {
    switch (searchOption) {
    case 'ingredient': {
      const response = await fetch(`https://www.${url}.com/api/json/v1/1/filter.php?i=${searchTerm}`);
      const result = await response.json();
      checkResult(result);
      break;
    }
    case 'name': {
      const response = await fetch(`https://www.${url}.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const result = await response.json();
      checkResult(result);
      break;
    }
    case 'first-letter': {
      if (searchTerm.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
        return null;
      } const response = await fetch(`https://www.${url}.com/api/json/v1/1/search.php?f=${searchTerm}`);
      const result = await response.json();
      checkResult(result);
      break;
    }
    default:
      return null;
    }
  }, [checkResult]);

  useEffect(() => {
    switch (page) {
    case '/comidas': {
      const mealURL = 'themealdb';
      fetchByOption(mealURL, option, term);
      break;
    }
    case '/bebidas': {
      const cocktailURL = 'thecocktaildb';
      fetchByOption(cocktailURL, option, term);
      break;
    }
    default:
      break;
    }
  }, [page, term, option, fetchByOption]);

  const context = {
    isOpen,
    toggleSearchBar,
    handleSearch,
    setTerm,
    setOption,
  };

  return (
    <SearchBarContext.Provider value={ context }>
      { children }
    </SearchBarContext.Provider>
  );
};

SearchBarProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export const useSearch = () => useContext(SearchBarContext);
