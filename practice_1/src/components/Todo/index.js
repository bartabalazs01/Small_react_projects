import React from "react";
import Item from "../Item";
import Form from "../Form";

const List = ({ list, ...rest }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.id} item={item} {...rest} />
    ))}
  </ul>
);

const Filter = (props) => (
  <input value={props.value} onChange={props.handleFilter} />
);

const SortButtons = (props) => (
  <div>
    <button onClick={props.handlePrioritySort}>Sort</button>
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

  handleToggle = (item) => {
    const newList = this.state.list.map((element) => {
      if (element.id === item.id) {
        element.completed = !element.completed;
      }
      return element;
    });
    this.setState({ list: newList });
  };

  handleRemove = (item) => {
    const newList = this.state.list.filter((element) => element.id !== item.id);
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

  handleInputSubmit = (id, value) => {
    const newList = this.state.list.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          value: value
        };
      }
      return element;
    });
    this.setState({ list: newList });
  };

  render() {
    let newList = this.state.list.filter((element) =>
      element.value.includes(this.state.value)
    );

    if (this.state.prioritySort) {
      newList = newList.sort((a, b) => {
        return a.priority - b.priority;
      });
    } else if (this.state.prioritySort === false) {
      newList = newList.sort((a, b) => {
        return b.priority - a.priority;
      });
    }

    return (
      <div className="App">
        <Form handleSubmit={this.handleSubmit} />
        <Filter handleFilter={this.handleFilter} value={this.state.value} />
        <SortButtons handlePrioritySort={this.handlePrioritySort} />
        <List
          list={newList}
          handleToggle={this.handleToggle}
          handleRemove={this.handleRemove}
          handleInputSubmit={this.handleInputSubmit}
          handlePriorityChange={this.handlePriorityChange}
        />
      </div>
    );
  }
}

export default App;
