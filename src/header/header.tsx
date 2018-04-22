import * as React from 'react';
import { Link } from 'react-router-dom';
import SocialBuffer from 'react-icons/lib/io/calculator';
import AccountCircle from 'react-icons/lib/md/account-circle';
import AccountBox from 'react-icons/lib/md/account-box';

export type State = {};

export type Props = {
  isAuthenticated: boolean
  userEmail?: string
};

class Header extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div className="container">
        <header>
          <div className="logo">Coin Profit</div>
          <nav className="menuList">
            {!this.props.isAuthenticated ? (
              <div>
                <Link to={'/login'}>
                   <AccountCircle className="header-icon" />
                  <a className="advert">Login</a>{' '}
                </Link>
              </div>
            ) : (
              <div id="email-greeting" className="email-greeting">
                <span> Hello, {this.props.userEmail} </span>
                <Link aria-label="logout" to={'/logout'}>
                <AccountBox className="header-icon" />
                    <a>Logout</a>
                </Link>
              </div>
            )}
           <div>
            <Link to={'/home'}>
            <SocialBuffer style={{marginRight: 0 + "px"}} className="header-icon" />
              <a href="#"> Calculate </a>
            </Link>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
