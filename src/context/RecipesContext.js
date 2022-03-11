import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

const initialState = {
  categories: [], // Lista de categorias recuperadas pela API
  list: [], // Lista de comidas recuperadas pela API
  inProgress: {}, // Objeto onde cada chave é o id da receita em andamento e o valor correspondente é o array com os ingredientes já marcados
};

// finishedRecipes: Array com as receitas finalizadas
// favoriteRecipes: Array com as receitas favoritas

export const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [meals, setMeals] = useState(() => {
    const getInProgressFromLocalStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    if (getInProgressFromLocalStorage === null) {
      return initialState;
    }
    if (getInProgressFromLocalStorage.meals) {
      return {
        ...initialState,
        inProgress: getInProgressFromLocalStorage.meals,
      };
    } return initialState;
  });

  const [cocktails, setCocktails] = useState(() => {
    const getInProgressFromLocalStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    if (getInProgressFromLocalStorage === null) {
      return initialState;
    }
    if (getInProgressFromLocalStorage.cocktails) {
      return {
        ...initialState,
        inProgress: getInProgressFromLocalStorage.cocktails,
      };
    } return initialState;
  });
  const [finishedRecipes, setFinishedRecipes] = useState(() => {
    const getDoneFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getDoneFromLocalStorage !== null) {
      return getDoneFromLocalStorage;
    } return [];
  });
  const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
    const getFavFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavFromLocalStorage !== null) {
      return getFavFromLocalStorage;
    } return [];
  });

  const setMealsList = useCallback((mealsList) => {
    setMeals((prevState) => ({
      ...prevState,
      list: mealsList,
    }));
  }, []);

  const setCocktailsList = useCallback((cocktailsList) => {
    setCocktails((prevState) => ({
      ...prevState,
      list: cocktailsList,
    }));
  }, []);

  // Referência: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const checkFavorite = useCallback((favRecipe, type, colorAfter) => {
    setFavoriteRecipes((prevState) => {
      const checkPrevState = prevState
        .some(
          (fav) => fav.id === (favRecipe[`id${capitalize(type)}`] || favRecipe.id),
        );
      if (checkPrevState) {
        const property = capitalize(type);
        return prevState
          .filter((fav) => fav.id !== (favRecipe[`id${property}`] || favRecipe.id));
      } return [...prevState, favRecipe];
    });
    document.querySelector('.favIcon').setAttribute('src', `${colorAfter}`);
  }, []);

  const handleFavorite = useCallback((type, recipe, colorAfter) => {
    const favRecipe = {
      id: (recipe[`id${capitalize(type)}`] || recipe.id),
      type: (type === 'meal' ? 'comida' : 'bebida'),
      area: ((recipe.strArea || recipe.area) || ''),
      category: (recipe.strCategory || recipe.category),
      alcoholicOrNot: ((recipe.strAlcoholic || recipe.alcoholicOrNot) || ''),
      name: (recipe[`str${capitalize(type)}`] || recipe.name),
      image: (recipe[`str${capitalize(type)}Thumb`] || recipe.image),
    };
    checkFavorite(favRecipe, type, colorAfter);
  }, [checkFavorite]);

  // Referência para capturar a data: https://stackoverflow.com/questions/11971130/converting-a-date-to-european-format

  const handleFinished = (type, recipe) => {
    const doneRecipe = {
      id: (recipe[`id${capitalize(type)}`] || recipe.id),
      type: (type === 'meal' ? 'comida' : 'bebida'),
      area: ((recipe.strArea || recipe.area) || ''),
      category: (recipe.strCategory || recipe.category),
      alcoholicOrNot: ((recipe.strAlcoholic || recipe.alcoholicOrNot) || ''),
      name: (recipe[`str${capitalize(type)}`] || recipe.name),
      image: (recipe[`str${capitalize(type)}Thumb`] || recipe.image),
      doneDate: new Date().toLocaleDateString('en-GB'),
      tags: ((recipe.strTags || recipe.tags)
        ? ([...recipe.strTags.split(',')] || [...recipe.tags.split(',')]) : []),
    };
    setFinishedRecipes((prevState) => [...prevState, doneRecipe]);
  };

  const setInProgress = (obj, id, ingredients) => ({
    ...obj,
    inProgress: {
      ...obj.inProgress,
      [id]: ingredients,
    },
  });

  const inProgressTypes = {
    bebidas: (id, ingredients) => {
      setCocktails((prevState) => setInProgress(prevState, id, ingredients));
    },
    comidas: (id, ingredients) => {
      setMeals((prevState) => setInProgress(prevState, id, ingredients));
    },
  };

  const handleInProgress = (type,
    id,
    ingredients) => inProgressTypes[type](id, ingredients);

  useEffect(() => {
    if (favoriteRecipes.length === 0) {
      localStorage.setItem('favoriteRecipes', '[]');
    } else if (favoriteRecipes.some((fav) => fav.id)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes]));
    }
  }, [favoriteRecipes]);

  useEffect(() => {
    if (finishedRecipes.length === 0) {
      localStorage.setItem('doneRecipes', '[]');
    } else if (finishedRecipes.some((done) => done.id)) {
      localStorage.setItem('doneRecipes', JSON.stringify([...finishedRecipes]));
    }
  }, [finishedRecipes]);

  useEffect(() => {
    const getInProgressFromLocalStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    const checkCocktailsInProgress = Object.keys(cocktails.inProgress).length;
    if (checkCocktailsInProgress === 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({}));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...getInProgressFromLocalStorage,
        cocktails: cocktails.inProgress,
      }));
    }
  }, [cocktails]);

  useEffect(() => {
    const getInProgressFromLocalStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    const checkMealsInProgress = Object.keys(meals.inProgress).length;
    if (checkMealsInProgress === 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({}));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...getInProgressFromLocalStorage,
        meals: meals.inProgress,
      }));
    }
  }, [meals]);

  const context = {
    setFinishedRecipes,
    setMeals,
    setMealsList,
    setCocktails,
    setCocktailsList,
    handleFavorite,
    handleFinished,
    handleInProgress,
    favoriteRecipes,
    finishedRecipes,
    meals,
    cocktails,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
};

RecipesProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export const useRecipes = () => useContext(RecipesContext);
