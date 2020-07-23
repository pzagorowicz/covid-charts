import React from 'react';
import logo from './logo.svg';
import './App.css';
import { callApi } from './callApi';

type Province = {
  id: number;
  content: string;
}

type AppState = {
  provinces: Province[],
  selectedProvince: string
}

class App extends React.Component<{}, AppState> {
  state = {
    provinces: [],
    selectedProvince: ''
  };

  componentDidMount() {
    callApi<{ provinces: Province[] }>('/api/provinces')
      .then(res => this.setState({ provinces: res.provinces }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
