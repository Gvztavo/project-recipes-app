import React from 'react';
import { screen } from '@testing-library/react';

import Explorar from '.';
import renderwithRouterAndContext from '../../utils/renderWithRouterAndContext';

describe('Página Explorar', () => {
  it('should render Header', () => {
    renderwithRouterAndContext(<Explorar />);

    const header = screen.getByRole('heading', { level: 1 });

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Explorar');
  });

  it('should render Footer', () => {
    renderwithRouterAndContext(<Explorar />);

    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('nav-footer');
  });

  it('should render two links with correct text', () => {
    renderwithRouterAndContext(<Explorar />);

    const foodLink = screen.getByTestId('explore-food');
    const drinksLink = screen.getByTestId('explore-drinks');

    expect(foodLink).toHaveTextContent('Explorar Comidas');
    expect(drinksLink).toHaveTextContent('Explorar Bebidas');
  });
});
