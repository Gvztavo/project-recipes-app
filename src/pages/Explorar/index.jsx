import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Explorar() {
  return (
    <main>
      <Header pageTitle="Explorar" showSearchIcon={ false } />
      <main className="explorer-container">
        <Link to="/explorar/comidas" data-testid="explore-food">Explorar Comidas</Link>
        <Link to="/explorar/bebidas" data-testid="explore-drinks">Explorar Bebidas</Link>
      </main>
      <Footer />
    </main>
  );
}

export default Explorar;
