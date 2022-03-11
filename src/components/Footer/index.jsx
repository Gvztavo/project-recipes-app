import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

const Footer = () => (
  <nav className="nav-footer" data-testid="footer">
    <Link to="/bebidas">
      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Página de Bebidas" />
    </Link>
    <Link to="/explorar">
      <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="Página de Bebidas" />
    </Link>
    <Link to="/comidas">
      <img data-testid="food-bottom-btn" src={ mealIcon } alt="Página de Bebidas" />
    </Link>
  </nav>
);

export default Footer;
