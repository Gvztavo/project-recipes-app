import React from 'react';
import PropTypes from 'prop-types';

import searchIcon from '../../images/searchIcon.svg';

function SearchIcon({ onClick }) {
  return (
    <button type="button" onClick={ onClick }>
      <img src={ searchIcon } data-testid="search-top-btn" alt="search-icon" />
    </button>
  );
}

SearchIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SearchIcon;
