import React from "react";
import "./App.css";

const Item = (props) => (
  <li
    className={props.item.completed ? "item-completed" : ""}
    style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", padding: "10px", backgroundColor: props.item.completed ? 'lightblue' : 'white', border: "1px solid black", }}>
    <div>
      {props.item.value} - Priority: {props.item.priority}
    </div>
    <div>
      <button onClick={() => props.handleToggle(props.item.id)}>Toggle</button>
      <button onClick={() => props.handleRemove(props.item.id)}>Remove</button>
      <button onClick={() => props.handlePriorityChange(props.item.id, true)}>
        +
      </button>
      <button onClick={() => props.handlePriorityChange(props.item.id, false)}>
        -
      </button>
    </div>
  </li>
);

const List = (props) => (
  <ul style={{ listStyle: "none", padding: "0" }}>
    {props.list.map((item) => (
      <Item key={item.id} item={item} handleToggle={props.handleToggle} handleRemove={props.handleRemove} handlePriorityChange={props.handlePriorityChange}/>
    ))}
  </ul>
);

class Form extends React.Component {
  state = {
    inputValue: ""
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const value = this.state.inputValue;

    this.setState({ inputValue: "" });
    this.props.handleSubmit(value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ marginBottom: "20px" }}>
        <input type="text" placeholder="Enter something and press ENTER" style={{ width: "250px", marginRight: "10px" }} onChange={this.handleChange} value={this.state.inputValue}/>
      </form>
    );
  }
}

const Filter = (props) => (
  <input value={props.value} onChange={props.handleFilter} placeholder="Filter items..." style={{ marginBottom: "20px", padding: "5px", width: "250px", marginRight: "10px", }}/>
);

const SortButtons = (props) => (
  <div>
    <button onClick={props.handlePrioritySort} style={{ marginBottom: "20px" }}>
      SORT {props.prioritySort === true ? "Ascending" : "Descending"}
    </button>
  </div>
);

class App extends React.Component {
  state = {
    list: [],
    value: "",
    prioritySort: null
  };

  handleSubmit = (value) => {
    const item = {
      value,
      completed: false,
      id: `${Math.random()}-${Math.random()}`,
      priority: 5
    };
    const newList = [...this.state.list, item];
    this.setState({ list: newList });
  };

  handleToggle = (id) => {
    const newList = this.state.list.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          completed: !element.completed,
        };
      }
      return element;
    });
    this.setState({ list: newList });
  };

  handleRemove = (id) => {
    const newList = this.state.list.filter((element) => element.id !== id);
    this.setState({ list: newList });
  };

  handleFilter = (e) => {
    this.setState({ value: e.target.value });
  };

  handlePriorityChange = (id, isIncrease) => {
    const newList = this.state.list.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          priority: isIncrease ? element.priority + 1 : element.priority - 1
        };
      }
      return element;
    });
    this.setState({ list: newList });
  };

  handlePrioritySort = () => {
    if (this.state.prioritySort === true) {
      this.setState({ prioritySort: false });
    } else if (this.state.prioritySort === false) {
      this.setState({ prioritySort: null });
    } else if (this.state.prioritySort === null) {
      this.setState({ prioritySort: true });
    }
  };

  render() {
    let newList = this.state.list.filter((element) =>
      element.value.includes(this.state.value)
    );

    if (this.state.prioritySort) {
      newList = newList.sort((a, b) => a.priority - b.priority);
    } else if (this.state.prioritySort === false) {
      newList = newList.sort((a, b) => b.priority - a.priority);
    }

    return (
      <div style={{ margin: "50px" }}>
        <Form handleSubmit={this.handleSubmit} />
        <Filter handleFilter={this.handleFilter} value={this.state.value} />
        <SortButtons
          prioritySort={this.state.prioritySort}
          handlePrioritySort={this.handlePrioritySort}
        />
        <List
          list={newList}
          handleToggle={this.handleToggle}
          handleRemove={this.handleRemove}
          handlePriorityChange={this.handlePriorityChange}
        />
      </div>
    );
  }
}

export default App;
