import React from 'react';
import { screen } from '@testing-library/react';

import SearchBar from './index';

import renderWithRouterAndContext from '../../utils/renderWithRouterAndContext';

describe('SearchBar.jsx tests should', () => {
  it('render the text input', () => {
    renderWithRouterAndContext(<SearchBar />);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  it('render the radio buttons', () => {
    renderWithRouterAndContext(<SearchBar />);

    const ingredientBtn = screen.getByTestId('ingredient-search-radio');
    const nameBtn = screen.getByTestId('name-search-radio');
    const firstLetterBtn = screen.getByTestId('first-letter-search-radio');

    expect(ingredientBtn).toBeInTheDocument();
    expect(nameBtn).toBeInTheDocument();
    expect(firstLetterBtn).toBeInTheDocument();
  });

  it('render the search button', () => {
    renderWithRouterAndContext(<SearchBar />);

    const searchBtn = screen.getByTestId('exec-search-btn');
    expect(searchBtn).toBeInTheDocument();
  });
});
