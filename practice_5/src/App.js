import React from "react";

const ListButtonWithList = (props) => {
  return (
    <div>
      <button onClick={() => props.handleOpen(props.orderedList.title)}>
        {props.orderedList.title}
      </button>
      {props.orderedList.isOpen && (
        <ul>
          {props.orderedList.listItems.map((listItem, key) => (
            <li key={key}>{listItem}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

class App extends React.Component {
  state = {
    orderedLists: [
      {
        title: "chips",
        listItems: ["lays", "cheetos", "chio"],
        isOpen: false
      },
      {
        title: "Animals",
        listItems: ["cheeta", "tiger", "lion"],
        isOpen: false
      },
      {
        title: "Cities",
        listItems: ["Paris", "Milano", "Menchester"],
        isOpen: false
      },
      {
        title: "Cars",
        listItems: ["Prosche", "Toyota", "Pagani"],
        isOpen: false
      }
    ]
  };

  handleOpen = (title) => {
    const newOrderedList = this.state.orderedLists.map((orderedList) => {
      if (orderedList.title === title) {
        return {
          ...orderedList,
          isOpen: !orderedList.isOpen
        };
      }
      return orderedList;
    });

    this.setState({ orderedLists: newOrderedList });
  };

  render() {
    return (
      <div style={{ width: "800px", marginTop: "100px", display: "flex", justifyContent: "space-around" }}>
        {this.state.orderedLists.map((orderedList, key) => (
          <ListButtonWithList
            handleOpen={this.handleOpen}
            orderedList={orderedList}
            key={key}
          />
        ))}
      </div>
    );
  }
}

export default App;
