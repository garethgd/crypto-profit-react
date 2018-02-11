import * as React from 'react';
import Header from '../header/header';
import FaBitcoin from 'react-icons/lib/fa/bitcoin';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import  { Moment } from 'moment';
import axios from 'axios';
import  * as moment from 'moment';
export type Props = {
 onSearch: ( price: string,  date: Moment, coinSym: string ) => void;

};

export type FormDetails = { 
  price: string,
  date: Moment,
  coinSym: string
};

export type State = {
     startDate: Moment;
     coinTypes: any[];
     coinNames: any[];
     coinSymbols: string[];
     selectedCoinType: '',
     selectedSymbol: string;
     selectedPrice: string;
};

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedSymbol: '',
      selectedCoinType: '',
      selectedPrice: '',
      coinNames: [],
      startDate: moment(),
      coinTypes: [],
      coinSymbols: [],
    };
  }

 handleChange(date: Moment){
   this.setState({
     startDate: date
   });
 }

 componentDidMount(){
   this.getCoinTypes();
 }
 
 getCoinTypes(){
   let coins: any[] = [];
   let coinNames: string[] = [];
   // let coinSyms:  string[] = []; 

  axios.get('https://www.cryptocompare.com/api/data/coinlist/')
  .then( (response) => {
   
    Object.keys(response.data.Data).forEach(function(key) {
      coins.push(response.data.Data[key]);
    });

     coins.forEach(element => {
      coinNames.push(element.CoinName);
    });

    coinNames.sort();

    this.setState({
      coinNames: coinNames,
      coinTypes: coins,
      selectedSymbol: coinNames[0]
    });
    console.log(coins);
    
  })
  .catch(function (error) {
    console.log(error);
  });

 }

 onSubmit(){
   let coins = this.state.coinTypes;
   let matchedCoin  =  coins.find(coin => {
    return coin.CoinName === this.state.selectedSymbol;
   });

   this.props.onSearch(this.state.selectedPrice, this.state.startDate, matchedCoin.Symbol);
 }

 onSymChange(e){
  this.setState({
    selectedSymbol: e.target.value
  });
}

 onPriceChange(e){
 this.setState({
   selectedPrice: e.target.value
 });
 }

  render() {
  
    return (
      <section>
        <Header />
          <div className="container home">
            <div className="col-md-6">
            <FaBitcoin className="logo" />
            <h1> Calculate all your crypto profits from your desired date and display in a graph. </h1>
            <p> Coin Profit is service that will simply tell you of your profit from any time period. </p>
         
              <span className="ion-social-bitcoin-outline" />
            </div>
            <div className="col-md-6">
             <h2> Enter Previous Purchase </h2>

             <label>Coin Type </label>
               <select value={this.state.coinNames[0]} onChange={(e) => this.onSymChange(e)} name="coin-type">
              
            { this.state.coinTypes ?  this.state.coinNames.map( (coin, index) => {
                 return (<option  key={index} > {coin} </option>);
               }) : null } 
              }
              </select>
             <label>Price </label>
               <input onChange={(e) => { this.onPriceChange(e); }} type="text" name="price" />
             <label>Date </label>
               <DatePicker
                selected={this.state.startDate}
                onChange={(date: Moment) => this.handleChange(date)}  
               />;
               <div className="submit">
             <Link to="/results"> <button onClick={() => this.onSubmit()} type="submit"> Enter </button></Link>
             </div>
            </div>
          </div>
      </section>
   
    );
  }
}

export default Home;
