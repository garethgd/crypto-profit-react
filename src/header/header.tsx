import * as React from 'react';
import { Link } from 'react-router-dom';
import SocialBuffer from 'react-icons/lib/io/calculator';

export type State = {

};

export type Props = {
  isAuthenticated: boolean;
};

class Header extends React.Component<Props> {

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
         {!this.props.isAuthenticated ?    
            <div>
                  <a> 
                  <Link to={'/login'}> <button className="advert">Login </button> </Link>
                  </a>
                  <a > 
                  <Link to={'/home'}> <button className="advert">Register </button> </Link>
                  </a> 
            </div> :
             null }
          
          <SocialBuffer className="header-icon" />
         <Link to={'/home'}> <a href="#"> Calculate </a> </Link>
          </nav>
         </header>
      </div>
    );
  }
}

export default Header;
