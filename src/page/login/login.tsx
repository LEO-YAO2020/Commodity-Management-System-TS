import React from 'react'

export interface LoginProps {}

export interface LoginState {}

class Login extends React.Component<LoginProps, LoginState> {
  render() {
    return (
      <div>
        <header>
          <img src={'/image/logo.png'} alt='' />
          <h1>Commodity Management System</h1>
        </header>
        <section></section>
      </div>
    )
  }
}

export default Login
