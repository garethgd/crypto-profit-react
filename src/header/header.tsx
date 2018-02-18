import * as React from 'react';
import { Link } from 'react-router-dom';
import SocialBuffer from 'react-icons/lib/io/calculator';

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
         
          <nav className="menuList">
          <SocialBuffer className="header-icon" />
         <Link to={'/home'}> <a href="#"> Calculate </a> </Link>
          </nav>
         </header>
      </div>
    );
  }
}

export default Header;
