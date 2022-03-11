import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// {
//   user: '', // E-mail do usuário conectado,
//   tokens: {
//     mealsToken: '', // Token de acesso a API de comidas
//     cocktailsToken: '', // Token de acesso a API de drinks
//   },
//   page: '', // Página atual (comida ou bebidas)
// }

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [page, setPage] = useState('');
  const [email, setEmail] = useState('');

  const handleMainPage = useCallback((pageSelected) => {
    if (page !== pageSelected) {
      setPage(pageSelected);
    }
  }, [page]);

  function handleEmail(hotmail) {
    setEmail(hotmail);
  }

  const context = {
    email,
    page,
    handleEmail,
    handleMainPage,
  };

  return (
    <AuthContext.Provider value={ context }>
      { children }
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export const useAuth = () => useContext(AuthContext);
