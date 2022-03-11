import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndContext from '../../utils/renderWithRouterAndContext';

import Footer from './index';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

describe('Footer', () => {
  it('should render', () => {
    renderWithRouterAndContext(<Footer />);

    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('should have three hyperlinks with the correct icons', () => {
    renderWithRouterAndContext(<Footer />);

    const THREE = 3;
    const links = screen.getAllByRole('link');
    const drinksLinkIcon = screen.getByTestId('drinks-bottom-btn');
    const exploreLinkIcon = screen.getByTestId('explore-bottom-btn');
    const foodLinkIcon = screen.getByTestId('food-bottom-btn');

    expect(links).toHaveLength(THREE);
    expect(drinksLinkIcon).toHaveAttribute('src', drinkIcon);
    expect(exploreLinkIcon).toHaveAttribute('src', exploreIcon);
    expect(foodLinkIcon).toHaveAttribute('src', mealIcon);
  });
});
