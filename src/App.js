import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],        // შესასრულებელი დავალებების სია
      completedItems: [],   // შესრულებული დავალებების სია
      newTask: ''           // ახალი დავალება, რომელიც შეიტანება input-ში
    };
  }

  handleInputChange = (e) => {
    this.setState({ newTask: e.target.value });
  };

  addTask = () => {
    if (this.state.newTask.trim() !== '') {
      this.setState(prevState => ({
        todoItems: [...prevState.todoItems, prevState.newTask],
        newTask: ''  // input-ის გასუფთავება
      }));
    }
  };

  completeTask = (index) => {
    this.setState(prevState => {
      const completedTask = prevState.todoItems.splice(index, 1);
      return {
        todoItems: prevState.todoItems,
        completedItems: [...prevState.completedItems, ...completedTask]
      };
    });
  };

  deleteTask = (index) => {
    this.setState(prevState => {
      const completedItems = prevState.completedItems.filter((_, i) => i !== index);
      return { completedItems };
    });
  };

  restoreTask = (index) => {
    this.setState(prevState => {
      const restoredTask = prevState.completedItems.splice(index, 1);
      return {
        completedItems: prevState.completedItems,
        todoItems: [...prevState.todoItems, ...restoredTask]
      };
    });
  };

  render() {
    return (
      <div className="App">
        <h1>To-Do List</h1>

        {/* ახალი დავალების დამატება */}
        <div>
          <input 
            type="text" 
            value={this.state.newTask} 
            onChange={this.handleInputChange} 
            placeholder="შეიყვანეთ ახალი დავალება..." 
          />
          <button onClick={this.addTask}>დამატება</button>
        </div>

        {/* შესასრულებელი დავალებების სია */}
        <div className="todo-container">
          <h2>შესასრულებელი</h2>
          <ul>
            {this.state.todoItems.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => this.completeTask(index)}>დასრულება</button>
              </li>
            ))}
          </ul>
        </div>

        {/* შესრულებული დავალებების სია */}
        <div className="completed-container">
          <h2>შესრულებული</h2>
          <ul>
            {this.state.completedItems.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => this.deleteTask(index)}>წაშლა</button>
                <button onClick={() => this.restoreTask(index)}>დაბრუნება</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

