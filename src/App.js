import React from 'react';
import { BrowserRouter as Router, Route,  Switch} from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { HomePage,
  CreatePage,
  EditPage,
  ViewAllPage
} from './pages'
import './App.css';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/crear'>
          <CreatePage />
        </Route>
        <Route path='/editar'>
          <EditPage />
        </Route>
        <Route path='/ver_todas'>
          <ViewAllPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;