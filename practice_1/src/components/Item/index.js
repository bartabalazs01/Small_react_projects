import React from "react";

class Item extends React.Component {
  state = {
    inputValue: this.props.item.value,
    isModifying: false
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { handleInputSubmit, item } = this.props;
    const value = this.state.inputValue;

    this.handleModify();
    handleInputSubmit(item.id, value);
  };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleModify = () => {
    this.setState({ isModifying: !this.state.isModifying });
  };

  render() {
    const {
      item,
      handlePriorityChange,
      handleToggle,
      handleRemove
    } = this.props;

    const { isModifying, inputValue } = this.state;

    return (
      <li className={item.completed ? "item-completed" : ""}>
        {isModifying ? (
          <form onSubmit={this.handleSubmit}>
            <input
              onBlur={this.handleSubmit}
              onChange={this.handleChange}
              value={inputValue}
            />
          </form>
        ) : (
          <span onClick={() => this.handleModify()}> {item.value} </span>
        )}
        <button onClick={() => handleToggle(item)}>Toggle</button>
        <button onClick={() => handleRemove(item)}>Remove</button>
        <button onClick={() => handlePriorityChange(item.id, true)}>+</button>
        <span>Prioroty: {item.priority}</span>
        <button onClick={() => handlePriorityChange(item.id, false)}>-</button>
      </li>
    );
  }
}

export default Item;
