import React from "react";
import axios from "axios";

const User = ({ user }) => {
  return (
    <div>
      <div>{user.name}</div>
      <img src={user.avatar_url} alt={user.name} />
    </div>
  );
};

class GithubSearch extends React.Component {
  state = {
    searchTerm: "",
    users: [],
    isLoading: false,
    hasError: false
  };

  getUSer = async (user) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(`https://api.github.com/users/${user}`);
      const newData = [...this.state.users, data];
      this.setState({ users: newData, isLoading: false });
    } catch (err) {
      this.setState({ hasError: true, isLoading: false });
    }
  };

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.getUSer(this.state.searchTerm);
    this.setState({ searchTerm: "" });
  };

  render() {
    const { users, isLoading, hasError, searchTerm } = this.state;
    const hasUser = !isLoading && users.length > 0;
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={searchTerm} />
        </form>
        {isLoading && <div>loading</div>}
        {hasUser &&
          users.map((user, index) => <User key={index} user={user} />)}
        {hasError && <div>There was an error</div>}
      </div>
    );
  }
}

export default GithubSearch;
