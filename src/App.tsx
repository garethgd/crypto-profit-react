import * as React from 'react';
import Home from './home/home';
import Results from './results/results';
import  { Moment } from 'moment';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
// import {createBrowserHistory} from 'history';

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
 currentPrice: any,
 total: { newCP?: number, CP?: number, newSP?: number, SP?: number, lostPercent?: number }
};

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
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
    });

    axios.get(`https://rocky-bayou-96357.herokuapp.com/https://min-api.cryptocompare.com/data/pricehistorical?fsym=${coinSym}&tsyms=${currency},USD,EUR&ts=${date.unix()}&extraParams=your_app_name`)
    .then( (response) => {
 
     this.setState({
       data: response.data[`${coinSym}`]
     }, () => {
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

     });
      
    })
    .catch(function (error) {
    });
  }

  render() {
    const HomePage = () => (
          <Home onSearch={(date, price, coinSym, currency) => { this.getPriceandDate(date, price, coinSym, currency); }} >Dashboard</Home>  
    );

    const ResultsPage = () => (
      <Results data={this.state.data} loading={this.state.loading} total={this.state.total}>Dashboard</Results>  
  );
  
    return (
      <Router >
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/results" component={ResultsPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
