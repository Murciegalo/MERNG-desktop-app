import React, { useContext } from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import {Container} from 'semantic-ui-react'

import MainMenu from './components/MainMenu'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'
import {AuthContext,AuthProvider} from './context/auth'

function App() {
  const {user} = useContext(AuthContext)
  console.log(user)
  return (
    <AuthProvider>
      <Router>
          <Container>
            <MainMenu />
              <Route exact path='/' component={Home} />
              <Route exact path='/login' render={
                routeParams => user ? (
                  <Redirect to='/' />
                  ) : (
                    <Login {...routeParams} />
                  )
                }
              />
              <Route exact path='/register' render={
                routeParams => user ? (
                  <Redirect to='/' />
                  ) : (
                    <Register {...routeParams}/>
                  )
                }
              />
              <Route exact path='/posts/:postId' render={
                routeParams => user ? (
                  <Redirect to='/' />
                  ) : (
                    <SinglePost {...routeParams}/>
                    )
                }
              />
          </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
