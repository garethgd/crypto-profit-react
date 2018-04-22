import * as React from 'react';
import Home from './home/home';
import Results from './results/results';
import LoginPage from './login/login';
import LogoutPage from './logout/logout';
import HistoryPage from './history/history';
import  { Moment } from 'moment';
import { app } from './base';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

export type Props = {

};

export type coinResult = { 
  price: string,
  date: Moment,
  coinSym: string
};

export type State = {
 data: any,
 loading: boolean;
 error: { errorHappened: boolean, errorMsg: string } ,
 currentPrice: any,
 user: any,
 total: { newCP?: number, CP?: number, newSP?: number, SP?: number, lostPercent?: number }
 authenticated: boolean;
};

class App extends React.Component<Props, State> {
 private removeAuthListener;

  constructor(props: Props) {
    super(props);
    this.state = {
      authenticated : false,
      error: {errorHappened: false, errorMsg: ''},
      data: [],
      user: [],
      loading: true,
      currentPrice: [],
      total: { newCP: 0, CP: 0, newSP: 0, SP: 0, lostPercent: 0}
    };
  }

  getPriceandDate(price: string,  date: Moment, coinSym: string, currency: string){
    this.setState({
      loading: true
    });

    axios.get(`https://rocky-bayou-96357.herokuapp.com/https://min-api.cryptocompare.com/data/price?fsym=${coinSym}&tsyms=${currency}`)
    .then( (response) => {
     this.setState({
       currentPrice: response.data[`${currency}`]
     });

    }
  ).catch( (error) => {
    this.setState({
      error: {errorHappened: true, errorMsg: error.message}
    });
  });

    axios.get(`https://rocky-bayou-96357.herokuapp.com/https://min-api.cryptocompare.com/data/pricehistorical?fsym=${coinSym}&tsyms=${currency},USD,EUR&ts=${date.unix()}&extraParams=your_app_name`)
    .then( (response) => {
     this.setState({
      error : {errorHappened: false, errorMsg: ''},
       data: response.data[`${coinSym}`]
     }, () => {
       if ( response.data.Response !== 'Error'){
        const CP: number = this.state.data[`${currency}`];
        let newCP = (parseInt(price, undefined) * 100);
        newCP = (newCP * CP) / 100;

        const SP: number = this.state.currentPrice;
        let newSP = (parseInt(price, undefined) * 100);
        newSP = (newSP * SP) / 100;

        if (newCP < newSP){
          var gain = newSP - newCP;
          var gainPercent = (gain / CP) * 100;
          let total = {coinAmount: price, gainPercent: gainPercent, currency: currency, symbol: coinSym, newCP : newCP, CP: CP, newSP: newSP, SP: SP };

         this.setState({
           loading: false,
            total: total
          });
        }
        else{
          let loss = CP - SP;
          var lossPercent = (loss / CP) * 100;
          let totalLoss = {coinAmount: price, CP: parseInt(price, undefined), currency: currency, symbol: coinSym, newCP : newCP, lostPercent: lossPercent, newSP: newSP};

         this.setState({
            loading: false,  
            total: totalLoss
          });
         
        }
      }
      else{
      this.setState({
        loading: false,
        error : {errorHappened: true, errorMsg: response.data.Message}
       });
      }
     });
      
    })
    .catch( (error) => {
      this.setState({
        error: {errorHappened: true, errorMsg: error.message}
      });
    });
  }

  componentWillUnMount() {  
    this.removeAuthListener = app.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      }

    else {
      this.setState({
        authenticated: false
      });
    }
    });
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
          user: user
        });
      }
      else {
        this.setState({
          authenticated: false
        });
      }
    });
  }

  render() {
    console.log(app);
    console.log(this.state);
    const HomePage = () => (
          <Home 
           isAuthenticated={this.state.authenticated}
           fireBaseApp={app}
           user={this.state.user}
           onSearch={(date, price, coinSym, currency) => { this.getPriceandDate(date, price, coinSym, currency); }} 
          >Dashboard
          </Home>  
    );
    const Logout = () => (
      <LogoutPage app={app} /> 
    );

    const History = () => (
      <HistoryPage /> 
    );

    const Login = () => (
      <LoginPage isAuthenticated={false} app={app} /> 
    );

    const ResultsPage = () => (
      <Results data={this.state.data} error={this.state.error} loading={this.state.loading} total={this.state.total}>Dashboard</Results>  
  );
  
    return (
      <Router >
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <Route path="/history" component={HistoryPage} />
          <Route path="/results" component={ResultsPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
