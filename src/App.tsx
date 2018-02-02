import * as React from 'react';
import Home from './home/home';
// import Results from './results/results';
import './App.css';

export type Props = {

};

class App extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <Home />
    );
  }
}

export default App;
