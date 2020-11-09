import React, { createContext, useReducer } from 'react'

const AuthContext = createContext({
  user: null,
  login: userData => {},
  logout: () => {}
})

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
  const [state ,dispatch] = useReducer(authReducer, {user: null})
  
  function login(userData){
    dispatch({ type: 'LOGIN', payload: userData })
  }
  function logout(){ dispatch({ type: 'LOGOUT' }) }
  return (
    <AuthContext.Provider value={{
      user: state.user,
      login,
      logout,
      ...props
    }}/>
  )
}

export { AuthContext, AuthProvider};