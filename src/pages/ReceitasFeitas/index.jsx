import React, { useState, useEffect, useCallback } from 'react';

import { Badge, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRecipes } from '../../context';

import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ReceitasFeitas() {
  const [visibleRecipes, setVisibleRecipes] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

  const { finishedRecipes } = useRecipes();

  const filterAll = useCallback(() => {
    setVisibleRecipes(finishedRecipes);
  }, []);

  useEffect(() => filterAll(), [filterAll]);

  const filterByFood = () => {
    setVisibleRecipes(finishedRecipes.filter((recipe) => recipe.type === 'comida'));
  };

  const filterByDrink = () => {
    setVisibleRecipes(finishedRecipes.filter((recipe) => recipe.type === 'bebida'));
  };

  return (
    <>
      <Header pageTitle="Receitas Feitas" showSearchIcon={ false } />
      <div className="filter">
        <button
          className="buttonAll"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ filterAll }
        >
          All
        </button>

        <button
          className="buttonFoods"
          name="foods"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ filterByFood }
        >
          Foods
        </button>

        <button
          className="buttonDrinks"
          name="drinks"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterByDrink }
        >
          Drinks
        </button>
      </div>

      <div className="itensList">
        {visibleRecipes.map((recipe, index) => (
          <Card key={ index }>
            <Link
              to={ recipe.type === 'comida'
                ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}` }
            >
              <Card.Img
                variant="top"
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
              />
              <Card.Title
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </Card.Title>
            </Link>
            <Card.Body>
              <Card.Subtitle
                data-testid={ `${index}-horizontal-top-text` }
                className="mb-2 text-muted"
              >
                {recipe.alcoholicOrNot || `${recipe.area} - ${recipe.category}`}
              </Card.Subtitle>
              <Card.Text data-testid={ `${index}-horizontal-done-date` }>
                { recipe.doneDate }
              </Card.Text>
            </Card.Body>
            <button
              type="button"
              onClick={ () => {
                copy(`http://localhost:3000/${recipe.type === 'comida' ? 'comidas' : 'bebidas'}/${recipe.id}`);
                setIsCopied(true);
              } }
            >
              <img
                src={ shareIcon }
                alt="share-button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            {isCopied && <p>Link copiado!</p> }
            { recipe.tags.length && recipe.tags.map((tag, tagIndex) => (
              <Badge
                key={ tagIndex }
                data-testid={ `${index}-${recipe.tags[tagIndex]}-horizontal-tag` }
              >
                { tag }
              </Badge>
            ))}
          </Card>
        ))}
      </div>
    </>
  );
}

export default ReceitasFeitas;
