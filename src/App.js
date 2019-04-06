import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    accept: false,
    message: '',

    errors: {
      username: false,
      email: false,
      password: false,
      accept: false,
    }
  }

  messages = {
    username_incorrect: 'nazwa musi być dłuższa niż 10 znaków i nie zawierać spacji!!',
    email_incorecct: 'brak @ w emailu!',
    passwors_incorrect: 'hasło musi zawierac co najmniej 8 znaków!',
    accept_incorrect: 'nie potwierdzona zgoda'
  }

  handleChange = e => {
    const name = e.target.name;
    const type = e.target.type;

    if (type === 'text' || type === 'password' || type === 'email') {
      const value = e.target.value;
      this.setState({
        [name]: value,
      })
    } else if (type === 'checkbox') {
      const checked = e.target.checked;
      this.setState({
        [name]: checked,
      })
    }

  }

  handleSubmit = e => {
    e.preventDefault();

    const validation = this.formValidation();

    if (validation.correct) {
      this.setState({
        username: '',
        email: '',
        password: '',
        accept: false,
        message: 'formularz został wysłany',

        errors: {
          username: false,
          email: false,
          password: false,
          accept: false,
        }
      })
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          password: !validation.password,
          accept: !validation.accept,
        }
      })
    }
  }

  formValidation = () => {
    let username = false;
    let email = false;
    let password = false;
    let accept = false;
    let correct = false;

    if (this.state.username.length >= 10 && this.state.username.indexOf(' ') === -1) {
      username = true;
    }
    if (this.state.email.indexOf('@') !== -1) {
      email = true;
    }
    if (this.state.password.length === 8) {
      password = true;
    }
    if (this.state.accept) {
      accept = true;
    }
    if (username && email && password && accept) {
      correct = true;
    }

    return ({
      username,
      email,
      password,
      accept,
      correct,
    })
  }


  componentDidUpdate() {
    if (this.state.message !== '') {
      setTimeout(() => {
        this.setState({
          message: '',
        })
      }, 3000);
    }
  }


  render() {
    return (<div className='App'>
      <form className='row' onSubmit={this.handleSubmit} noValidate>
        <label htmlFor="user"> Twoję imie
      <input type="text" id='user' name='username' value={this.state.username} onChange={this.handleChange} />

          {this.state.errors.username === true ? <span>  {this.messages.username_incorrect}</span> : null}
        </label>

        <label htmlFor="email"> Poczta:
      <input type="email" id='email' name='email' value={this.state.email} onChange={this.handleChange} />

          {this.state.errors.email === true ? <span>  {this.messages.email_incorecct}</span> : null}
        </label>

        <label htmlFor="password"> Hasło:
      <input type="password" id='password' name='password' value={this.state.password} onChange={this.handleChange} />

          {this.state.errors.password === true ? <span>  {this.messages.passwors_incorrect}</span> : null}
        </label>

        <label htmlFor="accept"><input type="checkbox" id='accept' name='accept' checked={this.state.accept} onChange={this.handleChange} /> Zaakceptuj regulamin
        {this.state.errors.accept === true ? <span>  {this.messages.accept_incorrect}</span> : null}
        </label>

        <button>Zapisz</button>
      </form>
      {this.state.message && <h3>{this.state.message}</h3>}
    </div>);
  }
}

export default App;
