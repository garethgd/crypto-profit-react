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
 data: any
 total: { newCP?: number, CP?: number, newSP?: number, SP?: number, lostPercent?: number }
};

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      total: { newCP: 0, CP: 0, newSP: 0, SP: 0, lostPercent: 0}
    };
  }

  getPriceandDate(price: string,  date: Moment, coinSym: string){
    axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${coinSym}&tsyms=${coinSym},USD,EUR&ts=${date.unix()}&extraParams=your_app_name`)
    .then( (response) => {
      console.log(response.data);
   
     this.setState({
       data: response.data[`${coinSym}`]
     }, () => {
        const CP: number = this.state.data.EUR;
        let newCP = (1.5 * 100);
        newCP = (newCP * CP);

        const SP: number = this.state.data[`${coinSym}`];
        let newSP = (parseInt(price, undefined) * 100);
        newSP = (newSP * SP);

        if (newCP < newSP){
          var gain = newSP - newCP;
          var gainPercent = (gain / CP) * 100;
          // gainPercent = gainPercent.toFixed(2);
          console.log(gainPercent);
          let total = {newCP, CP: CP, newSP: newSP, SP: SP };

         this.setState({
            total: total
          });
        }
        else{
          let loss = CP - SP;
          var lossPercent = (loss / CP) * 100;
         //  lossPercent = lossPercent.toFixed(2);
          console.log(lossPercent);
          let totalLoss = {lostPercent: lossPercent};

         this.setState({
            total: totalLoss
          });
         
        }

     });
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
   console.log(this.state);
    const HomePage = () => (
          <Home onSearch={(date, price, coinSym) => { this.getPriceandDate(date, price, coinSym); }} >Dashboard</Home>  
    );

    const ResultsPage = () => (
      <Results data={this.state.data} total={this.state.total}>Dashboard</Results>  
  );
  
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/results" component={ResultsPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
