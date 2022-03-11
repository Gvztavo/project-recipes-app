import React from 'react';
import { Route } from 'react-router';
import { screen, fireEvent } from '@testing-library/react';

import render from '../../utils/renderWithRouterAndContext';
import ExplorarComidasOuBebidas from '.';

const SURPRISE_TESTID = 'explore-surprise';

describe('Pagina ExplorarComidasOuBebidas', () => {
  it('should render foods page correctly', () => {
    render(
      <Route path="/explorar/:type">
        <ExplorarComidasOuBebidas />
      </Route>, { initialEntries: ['/explorar/comidas'] },
    );

    const header = screen.getByRole('heading', { level: 1 });
    const main = screen.getByRole('main');
    const byIngredients = screen.getByTestId('explore-by-ingredient');
    const byArea = screen.getByTestId('explore-by-area');
    const surprise = screen.getByTestId(SURPRISE_TESTID);
    const footer = screen.getByTestId('footer');

    expect(header).toBeInTheDocument();
    expect(main).toHaveClass('explore-type-container');
    expect(byIngredients).toHaveTextContent('Por Ingredientes');
    expect(byArea).toHaveTextContent('Por Local de Origem');
    expect(surprise).toHaveTextContent('Me Surpreenda!');
    expect(footer).toBeInTheDocument();
  });

  it('should render drinks page correctly', () => {
    render(
      <Route path="/explorar/:type">
        <ExplorarComidasOuBebidas />
      </Route>, { initialEntries: ['/explorar/bebidas'] },
    );

    const header = screen.getByRole('heading', { level: 1 });
    const main = screen.getByRole('main');
    const byIngredients = screen.getByTestId('explore-by-ingredient');
    const surprise = screen.getByTestId(SURPRISE_TESTID);
    const footer = screen.getByTestId('footer');

    expect(header).toBeInTheDocument();
    expect(screen.queryByTestId('explore-by-area')).not.toBeInTheDocument();
    expect(main).toHaveClass('explore-type-container');
    expect(byIngredients).toHaveTextContent('Por Ingredientes');
    expect(surprise).toHaveTextContent('Me Surpreenda!');
    expect(footer).toBeInTheDocument();
  });

  it('should show the text Loading... when click Me Surpreenda!', async () => {
    const THREE_SECONDS = 3000;
    render(
      <Route path="/explorar/:type">
        <ExplorarComidasOuBebidas />
      </Route>, {
        recipesProps: {
          getRandomRecipe: () => new Promise((resolve) => setTimeout(() => {
            resolve();
          }, THREE_SECONDS)),
        },
        initialEntries: ['/explorar/bebidas'],
      },
    );

    const surprise = screen.getByTestId(SURPRISE_TESTID);

    fireEvent.click(surprise);

    const loading = await screen.findByText('Loading...');

    expect(loading).toBeInTheDocument();
  });

  it('should not render if the route is wrong', () => {
    const { history } = render(
      <Route path="/explorar/:type">
        <ExplorarComidasOuBebidas />
      </Route>, { initialEntries: ['/explorar/comidas'] },
    );

    const main = screen.getByRole('main');

    history.push('/explorar/url-errada');

    expect(main).not.toBeInTheDocument();
  });
});
