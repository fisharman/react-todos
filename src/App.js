import React, { Component } from 'react';
import './App.css';
import TodoList from './containers/TodoList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Todos</h1>
        </header>
        <TodoList />
      </div>
    );
  }
}

export default App;
