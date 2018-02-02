import * as React from 'react';

export type State = {

};

export type Props = {

};

class Header extends React.Component {

    constructor(props: Props) {
        super(props);
        this.state = {date: new Date()};
      }
      
  render() {
    return (
      <div className="container">
      <header>
          <div className="logo"> 
             Coin Profit
          </div>

          <nav className="menu">
          <a href="#"> Register </a>
          </nav>
         </header>
      </div>
    );
  }
}

export default Header;
