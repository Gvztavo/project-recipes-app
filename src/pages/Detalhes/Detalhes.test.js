import React from 'react';
import { screen } from '@testing-library/react';
import { Route } from 'react-router';

import Detalhes from './index';
import {
  mealRecipeMock,
  mealIngredientsMock,
  mealRecommendationsMock,
} from '../../utils/__mocks__/detailsMocks';

import render from '../../utils/renderWithRouterAndContext';

describe('Details Page should', () => {
  // Fazer mock do retorno do objeto item (jest, spyOn, mockar o fetch)
  // Ajustar estados iniciais dos contextos na função de render

  it('render the meal details page correctly', () => {
    render(
      <Route path="/comidas/:id">
        <Detalhes />
      </Route>, {
        initialEntries: ['/comidas/52900'],
        detailsProps: {
          fetchRecommendations: () => {},
          fetchRecipe: () => {},
          item: { meal: [mealRecipeMock] },
          ingredients: mealIngredientsMock,
          recommendations: mealRecommendationsMock,
        },
      },
    );

    const recipeImg = screen.getByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const shareBtn = screen.getByTestId('share-btn');
    const favBtn = screen.getByTestId('favorite-btn');
    const recipeCategory = screen.getByTestId('recipe-category');
    const recipeIngredients = screen.getAllByTestId(/ingredient/i);
    const recipeInstructions = screen.getByTestId('instructions');
    const recipeVideo = screen.getByTestId('video');
    const recipeRecommendations = screen.getAllByTestId(/recomendation/i);
    const startOrContinueBtn = screen.getByTestId('start-recipe-btn');

    expect(recipeImg).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();

    recipeIngredients.forEach((ingredient) => expect(ingredient).toBeInTheDocument());

    expect(recipeInstructions).toBeInTheDocument();
    expect(recipeVideo).toBeInTheDocument();

    recipeRecommendations
      .forEach((recommendation) => expect(recommendation).toBeInTheDocument());

    expect(startOrContinueBtn).toBeInTheDocument();
  });
});
