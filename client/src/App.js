import {BrowserRouter as Router , Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
    </Router>
  );
}

export default App;
