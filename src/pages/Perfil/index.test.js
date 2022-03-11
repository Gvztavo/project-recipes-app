import React from 'react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../../utils/renderWithRouterAndContext';
import Perfil from '.';

describe('testes da pagina de perfil', () => {
  test('se renderiza os elemenos da tela de perfil e seus comportamentos', () => {
    const { history } = renderWithRouterAndContext(<Perfil />);
    history.push('/perfil');
    const userEmail = screen.getByTestId('profile-email');
    const receitasFeitas = screen.getByTestId('profile-done-btn');
    const receitasFavoritas = screen.getByTestId('profile-favorite-btn');
    const exitButton = screen.getByTestId('profile-logout-btn');
    expect(userEmail).toBeInTheDocument();
    expect(receitasFeitas).toBeInTheDocument();
    expect(receitasFavoritas).toBeInTheDocument();
    expect(exitButton).toBeInTheDocument();
  });
  test('se ao apertar o botao "Receitas Favoritas" ele redireciona a pagina', () => {
    const { history } = renderWithRouterAndContext(<Perfil />);
    history.push('/perfil');
    const receitasFavoritas = screen.getByTestId('profile-favorite-btn');
    userEvent.click(receitasFavoritas);
    expect(window.location.pathname).toBe('/receitas-favoritas');
  });
  test('se ao apertar o botao "Receitas Feitas" ele redireciona a pagina', () => {
    const { history } = renderWithRouterAndContext(<Perfil />);
    history.push('/perfil');
    const receitasFeitas = screen.getByTestId('profile-done-btn');
    userEvent.click(receitasFeitas);
    expect(window.location.pathname).toBe('/receitas-feitas');
  });
});
