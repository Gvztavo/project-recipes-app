import React from 'react';
import { Route, Switch } from 'react-router-dom';

import EmProgresso from './pages/EmProgresso';
import Explorar from './pages/Explorar';
import ExplorarComidasOuBebidas from './pages/ExplorarComidasOuBebidas';
import ExplorarIngredientes from './pages/ExplorarIngredientes';
import ExplorarOrigem from './pages/ExplorarOrigem';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import NotFound from './pages/NotFound';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Detalhes from './pages/Detalhes';
import Login from './pages/Login-Screen/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/explorar/:type/ingredientes"
          component={ ExplorarIngredientes }
        />
        <Route exact path="/explorar/comidas/area" component={ ExplorarOrigem } />
        <Route exact path="/explorar/:type" component={ ExplorarComidasOuBebidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/comidas/:id/in-progress" component={ EmProgresso } />
        <Route exact path="/comidas/:id" component={ Detalhes } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas/:id/in-progress" component={ EmProgresso } />
        <Route exact path="/bebidas/:id" component={ Detalhes } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route exact path="/" component={ Login } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
