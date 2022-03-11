import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import App from '../../App';
import renderWithRouterAndContext from '../../utils/renderWithRouterAndContext';

describe('testes da page de login', () => {
  test('os inputs e botao da tela de login', () => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginSubmitButton = screen.getByRole('button');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginSubmitButton).toBeInTheDocument();
    userEvent.type(emailInput, 'xablau');
    expect(loginSubmitButton).toBe(disabled);
    userEvent.type(emailInput, 'raffiweed420@gmail.com');
    userEvent.type(passwordInput, '1234567');
    expect(loginSubmitButton).toBe(enabled);
    userEvent.click(loginSubmitButton);
    const mealsScreenHeaderText = screen.getByText(/comidas/i);
    expect(mealsScreenHeaderText).toBeInTheDocument();
    expect(window.location.pathname).toBe('/comidas');
  });
});
