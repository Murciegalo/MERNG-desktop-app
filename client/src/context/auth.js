import React, { createContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
  user: null,
  login: userData => {},
  logout: () => {}
}

if(localStorage.getItem('jwt')){
  const tokenDecoded = jwtDecode(localStorage.getItem('jwt'))

  if(tokenDecoded.exp * 1000 < Date.now()){
    localStorage.removeItem('jwt')
  }
  else{
    initialState.user = tokenDecoded
  }
}
const AuthContext = createContext(initialState)

function authReducer(state, action){
  const {type,payload} = action;
  switch(type){
    case 'LOGIN':
      return {
        ...state,
        user: payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default: return state
  }
}

function AuthProvider(props){
  const [state ,dispatch] = useReducer(authReducer, initialState)
  function login(userData){
    localStorage.setItem('jwt', userData.token)
    dispatch({ type: 'LOGIN', payload: userData })
  }
  function logout(){ 
    localStorage.removeItem('jwt')
    dispatch({ type: 'LOGOUT' }) 
  }
  return (
    <AuthContext.Provider value={{
      user: state.user,
      login,
      logout,
      ...props
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider};