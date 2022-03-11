import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

function StartOrContinueButton({ onClick, buttonDescription }) {
  return (
    <Button
      size="lg"
      variant={ buttonDescription === 'Continuar Receita' ? 'primary' : 'success' }
      className="recipe-status-btn"
      data-testid="start-recipe-btn"
      type="button"
      onClick={ onClick }
    >
      {buttonDescription}
    </Button>
  );
}

StartOrContinueButton.defaultProps = {
  onClick: null,
};

StartOrContinueButton.propTypes = {
  onClick: PropTypes.func,
  buttonDescription: PropTypes.string.isRequired,
};

export default StartOrContinueButton;
