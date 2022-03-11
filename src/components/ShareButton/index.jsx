import React from 'react';
import PropTypes from 'prop-types';

const copy = require('clipboard-copy');

function ShareButton({ path, id, icon, handleCopy }) {
  return (
    <button
      data-testid="share-btn"
      type="button"
      onClick={ () => {
        copy(`http://localhost:3000/${path}/${id}`);
        handleCopy(true);
      } }
    >
      <img src={ icon } alt="share-button" />
    </button>
  );
}

ShareButton.propTypes = {
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  handleCopy: PropTypes.func.isRequired,
};

export default ShareButton;
