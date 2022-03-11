import React from 'react';
import { Route } from 'react-router';
import { screen } from '@testing-library/react';

import render from '../../utils/renderWithRouterAndContext';
import ExplorarIngredientes from '.';
import { drinksIngredients, mealsIngredients } from './mockData';

describe('Página ExplorarIngredientes', () => {
  it('should render foods page correctly', () => {
    render(
      <Route path="/explorar/:type/ingredientes">
        <ExplorarIngredientes />
      </Route>, { recipesProps: {
        ingredientsList: mealsIngredients,
        fecthIngredients: () => {},
      },
      searchProps: {
        handleSearch: () => {},
      },
      initialEntries: ['/explorar/comidas/ingredientes'] },
    );

    const header = screen.getByRole('heading', { level: 1 });
    const main = screen.getByRole('main');
    const footer = screen.getByTestId('footer');

    expect(header).toBeInTheDocument();
    expect(main).toHaveClass('ingredients-container');
    expect(footer).toBeInTheDocument();

    mealsIngredients.forEach(({ strIngredient }, index) => {
      const card = screen.getByTestId(`${index}-ingredient-card`);
      const cardImg = screen.getByTestId(`${index}-card-img`);
      const cardName = screen.getByTestId(`${index}-card-name`);

      expect(card).toHaveClass('ingredient-card');
      expect(cardImg).toHaveAttribute('src', `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`);
      expect(cardName).toHaveTextContent(strIngredient);
    });
  });

  it('should render drinks page correctly', () => {
    render(
      <Route path="/explorar/:type/ingredientes">
        <ExplorarIngredientes />
      </Route>, { recipesProps: {
        ingredientsList: drinksIngredients,
        fecthIngredients: () => {},
      },
      searchProps: {
        handleSearch: () => {},
      },
      initialEntries: ['/explorar/bebidas/ingredientes'] },
    );

    const header = screen.getByRole('heading', { level: 1 });
    const main = screen.getByRole('main');
    const footer = screen.getByTestId('footer');

    expect(header).toBeInTheDocument();
    expect(main).toHaveClass('ingredients-container');
    expect(footer).toBeInTheDocument();

    drinksIngredients.forEach(({ strIngredient1 }, index) => {
      const card = screen.getByTestId(`${index}-ingredient-card`);
      const cardImg = screen.getByTestId(`${index}-card-img`);
      const cardName = screen.getByTestId(`${index}-card-name`);

      expect(card).toHaveClass('ingredient-card');
      expect(cardImg).toHaveAttribute('src', `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`);
      expect(cardName).toHaveTextContent(strIngredient1);
    });
  });

  it('should not render if the route is wrong', () => {
    const { history } = render(
      <Route path="/explorar/:type/ingredientes">
        <ExplorarIngredientes />
      </Route>, { recipesProps: {
        ingredientsList: [],
        fecthIngredients: () => {},
      },
      searchProps: {
        handleSearch: () => {},
      },
      initialEntries: ['/explorar/comidas/ingredientes'] },
    );

    const main = screen.getByRole('main');

    history.push('/explorar/url-errada/ingredientes');

    expect(main).not.toBeInTheDocument();
  });
});
