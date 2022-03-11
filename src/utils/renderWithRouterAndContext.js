import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { AuthContext } from '../context/AuthContext';
import { SearchBarContext } from '../context/SearchBarContext';
import { RecipesContext } from '../context/RecipesContext';
import { DetailsContext } from '../context/DetailsContext';

const INITIAL_AUTH = {
  user: '', // E-mail do usuário conectado,
  tokens: {
    mealsToken: '', // Token de acesso a API de comidas
    cocktailsToken: '', // Token de acesso a API de drinks
  },
  page: '', // Página atual (comida ou bebidas)
};

const INITIAL_SEARCH = {
  isOpen: false, // Flag para indicar se a searchBar está visível ou não
  term: '', // Valor do input de texto da searchBar
  option: '', // Valor do radio btn selecionado (Ingrediente, nome ou Primeira letra)
};

const INITIAL_RECIPES = {
  meals: {
    categories: [], // Lista de categorias recuperadas pela API
    list: [], // Lista de comidas recuperadas pela API
    inProgress: {}, // Objeto onde cada chave é o id da receita em andamento e o valor correspondente é o array com os ingredientes já marcados
  },
  cocktails: {
    categories: [], // Lista de categorias recuperadas pela API
    list: [], // Lista de comidas recuperadas pela API
    inProgress: {}, // Objeto onde cada chave é o id da receita em andamento e o valor correspondente é o array com os ingredientes já marcados
  },
  finishedRecipes: [],
  favoriteRecipes: [],
};

const INITIAL_DETAILS = {
  item: {
    isFavorite: false,
    status: 'não iniciada',
  },
  recommendations: [],
  ingredients: [],
};

const renderWithRouterAndContext = (
  component,
  {
    authProps = INITIAL_AUTH,
    searchProps = INITIAL_SEARCH,
    recipesProps = INITIAL_RECIPES,
    detailsProps = INITIAL_DETAILS,
    initialEntries = ['/'],
    ...renderOptions
  } = {},
) => {
  const history = createMemoryHistory({
    initialEntries,
  });

  return {
    ...render(
      <AuthContext.Provider value={ authProps }>
        <SearchBarContext.Provider value={ searchProps }>
          <RecipesContext.Provider value={ recipesProps }>
            <DetailsContext.Provider value={ detailsProps }>
              <Router history={ history }>
                {component}
              </Router>
            </DetailsContext.Provider>
          </RecipesContext.Provider>
        </SearchBarContext.Provider>
      </AuthContext.Provider>,
      renderOptions,
    ),
    history,
  };
};

export default renderWithRouterAndContext;
