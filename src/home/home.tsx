import * as React from 'react';
import Header from '../header/header';
import FaBitcoin from 'react-icons/lib/fa/bitcoin';
import DatePicker from 'react-datepicker';
import { Redirect, Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { ClipLoader } from 'react-spinners';
import  { Moment } from 'moment';
import AdSense from 'react-adsense';
import axios from 'axios';
import  * as moment from 'moment';
import SelectCurrency from 'react-select-currency';
export type Props = {
 onSearch: ( price: string,  date: Moment, coinSym: string, currencySelected: string) => void;
};

export type FormDetails = { 
  price: string,
  date: Moment,
  coinSym: string
};

export type State = {
     startDate: Moment;
     isLoading: boolean,
     coinTypes: any[];
     currencySelected: string,
     form: { priceEntered?: boolean, currencyEntered?: boolean, errorMsg: string},
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
      isLoading: true,
      currencySelected: '',
      selectedSymbol: '',
      form: {priceEntered: false, currencyEntered: false, errorMsg: ''},
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

  axios.get('https://rocky-bayou-96357.herokuapp.com/https://www.cryptocompare.com/api/data/coinlist/')
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
      isLoading: false,
      selectedSymbol: coinNames[0]
    });
    
  })
  .catch(function (error) {
  });

 }

 _buildLinkHref(){
   if (this.state.form.priceEntered && this.state.form.currencyEntered ){
       return '/results';
   }

   else{
     return '';
   }
 }

 onSubmit(){
   let coins = this.state.coinTypes;
   let matchedCoin  =  coins.find(coin => {
    return coin.CoinName === this.state.selectedSymbol;
   });

   if (this.formIsValid()){
      this.props.onSearch(this.state.selectedPrice, this.state.startDate, matchedCoin.Symbol, this.state.currencySelected);
        <Redirect push={true} to="/results"/>;
   }
 }

 formIsValid(){
  if (!this.state.form.priceEntered){
    this.setState({
      form: { errorMsg: 'You need to enter an amount'}});
      return false;
    }

    if ( !this.state.form.currencyEntered){
      this.setState({
        form: { errorMsg: 'You need to enter a currency'}});
        return false;
    }

    else{
      return true;
    }
 }
 onSymChange(e){
  this.setState({
    selectedSymbol: e.target.value
  });
}
onSelectedCurrency(e){
  this.setState({
   currencySelected: e.target.value,
   form: {currencyEntered: true, priceEntered: this.state.form.priceEntered,  errorMsg: ''}
  });

  if (e.target.value === ''){
    this.setState({
      selectedPrice: e.target.value,
      form: {currencyEntered: false, priceEntered: this.state.form.priceEntered, errorMsg: 'You need to enter a currency'}
    });
  }
}

 onPriceChange(e){
 this.setState({
   selectedPrice: e.target.value,
   form: {priceEntered: true,  currencyEntered: this.state.form.currencyEntered, errorMsg: ''}
 });

    if (e.target.value === ''){
      this.setState({
        selectedPrice: e.target.value,
        form: {priceEntered: false, currencyEntered: this.state.form.currencyEntered, errorMsg: 'You need to enter a price'}
      });
    }
 }

  render() {
    return (
      <section>
        <Header />
      {this.state.isLoading ?  
        <div className="loader">
            <ClipLoader
                    color={'white'} 
                    loading={this.state.isLoading} 
            /> 
        </div> :  
        <div className="container home">
          <h1 className="title"> Crypto Profit Calculator </h1>
            <div className="col-md-6">
            <FaBitcoin className="logo" />
            <h1> Calculate all your crypto profits from your desired date and display in a graph. </h1>
            <p> Coin Profit is service that will simply tell you of your profit from any time period. </p>
            <a className="submit" target="_blank" href="https://www.coinbase.com/join/5a1d548ec5375b02137989f8"><button> Buy coins </button></a>
        
            <AdSense.Google client='ca-pub-7774581586268507' slot='6072969822' />
              <span className="ion-social-bitcoin-outline" />
            </div>
            <div className="col-md-6">
             <h2> Enter Previous Purchase </h2>
                      
                <label>Coin Type </label>
                  <select 
                    value={this.state.selectedSymbol ? this.state.selectedSymbol : this.state.coinNames[0]} 
                    onChange={(e) => this.onSymChange(e)} 
                    name="coin-type"
                  >
                  
                { this.state.coinTypes ?  this.state.coinNames.map( (coin, index) => {
                    return (<option  key={coin} > {coin} </option>);
                  }) : null } 
                  
                  </select>

              <div className="price">
                <label>Amount of {this.state.selectedSymbol} bought.</label>
                  <input required={true} onChange={(e) => { this.onPriceChange(e); }} type="text" name="price" />
              </div>

                <div className="currency">
                  <label>Currency </label>
                    <SelectCurrency  name={''} value={this.state.currencySelected} onCurrencySelected={(e) => this.onSelectedCurrency(e)} onChange={(e) => this.onSelectedCurrency(e)}   />
                  </div>

              <label>Date </label>
               <DatePicker
                selected={this.state.startDate}
                onChange={(date: Moment) => this.handleChange(date)}  
               />;
               {this.state.form.errorMsg ? <p className="errorMsg"> {this.state.form.errorMsg}</p> : null}
            
               <div className="submit">
               <Link to={this._buildLinkHref()}> <button onClick={() => this.onSubmit()} type="submit"> Enter </button></Link>
             </div>
            </div>
          </div>}
      </section>
   
    );
  }
}

export default Home;
