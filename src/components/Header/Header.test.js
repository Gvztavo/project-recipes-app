import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Header from './index';

import renderWithRouterAndContext from '../../utils/renderWithRouterAndContext';

describe('Header.jsx tests should', () => {
  it('render the profile icon', () => {
    renderWithRouterAndContext(<Header />);

    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
  });

  it('render the page title', () => {
    renderWithRouterAndContext(<Header />);

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
  });

  it('render the search bar icon', () => {
    renderWithRouterAndContext(<Header showSearchIcon />);

    const searchBarIcon = screen.getByTestId('search-top-btn');
    expect(searchBarIcon).toBeInTheDocument();
  });

  it('redirect to the profile page after clicking on the profile icon', () => {
    const { history } = renderWithRouterAndContext(<Header />);
    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);
    const { pathname } = history.location;

    expect(pathname).toBe('/perfil');
  });
});
