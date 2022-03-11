import React from 'react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import App from '../../App';
import renderWithRouterAndContext from '../../utils/renderWithRouterAndContext';

describe('testes do NotFound 404', () => {
  test('testa se ao colocarnum URL invalida, cai na page NotFound 404', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/uashuahuha');
    const errorText = screen.getByText(/not found/i);
    expect(errorText).toBeInTheDocument();
  });
});
