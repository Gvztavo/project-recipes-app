import React from 'react';
import { Link } from 'react-router-dom';

function Card(name, image, index, typeAndId) {
  return (
    <Link to={ `${typeAndId}` } key={ index } className="ingredient-card">
      <div data-testid={ `${index}-recipe-card` }>
        <img data-testid={ `${index}-card-img` } src={ image } alt={ name } />
        <div data-testid={ `${index}-card-name` }>
          {name}
        </div>
      </div>
    </Link>
  );
}

export default Card;
