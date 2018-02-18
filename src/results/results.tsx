import * as React from 'react';
import Header from '../header/header';
import { Doughnut } from 'react-chartjs-2';
import AdSense from 'react-adsense';
import { ClipLoader } from 'react-spinners';

export type State = {
    loading: boolean
   };

export type Props = {
  data: any;
  loading: boolean;
  total: {
       coinAmount?: string;
       gainPercent?: number,
       currency?: string, 
       symbol?: string, 
       newCP?: number, 
       CP?: number, 
       newSP?: number,
       SP?: number, 
       lostPercent?: number }
};

class Results extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { loading: true};
  }
  render() {
    const total = this.props.total;
    let data = {
        datasets: [{
              data: [`${total.newCP}`, `${total.newSP}`],
             // data: [10, 20, 30],
             
            backgroundColor: [
                '#7F022E',
                `${total.gainPercent ? '#00B20F' : '#E50453' }`,
                    
            ],
            borderWidth: 0,
          
        }],
        options: {
            legend: {
               labels: {
                  fontColor: 'white',
                  margin: 20 + 'px',
                  fontFamily: `"Roboto Mono",Helvetica,Arial,sans-serif`
               }
            }
         },
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Cost Price',
            `${total.gainPercent ? 'Profit' : 'Loss'}`,
            
        ]
    };

    let currencyTotal;
    let euroTotal;
    let USDTotal;

    if (total.CP){
     currencyTotal = (this.props.data[`${total.currency}`] * total.CP);
     euroTotal = (this.props.data[`EUR`]);
     USDTotal =  (this.props.data[`USD`]);
    }
  
    return (
      <section>
        <Header />
        {this.props.loading ?  
        <div className="loader">
            <ClipLoader
                    color={'white'} 
                    loading={this.props.loading} 
            /> 
        </div> : 
      
          <div className="container results">
          <AdSense.Google client='ca-pub-7774581586268507' slot='9791409900' />
           <h1> Calculated Profits </h1>
           <Doughnut data={data} options={data.options} height={100}/>

           <div className="col-md-12 stats">
            <div className="col-md-3">
                <div className="col-md-12 grid-item">
                <div>
                  <h1 className="red1"> {total.coinAmount} </h1>
                  <h4> {total.symbol} purchased </h4>
                  </div>
                </div>
            </div>
              {total.currency ! === 'eur' ?   
              <div className="col-md-3">
                  <div className="col-md-12 grid-item stats">
                  <div>
                      <h1 className="red2"> {currencyTotal} </h1>
                      <h4> {total.currency}</h4>
                      </div>
                  </div>
              </div> : null
             }    
            
              <div className="col-md-3">
                  <div className="col-md-12 grid-item">
                  <div>
                      <h1 className="red1"> {euroTotal ? euroTotal.toFixed(3) : euroTotal} </h1>
                      <h4> EURO </h4>
                      </div>
                  </div>
              </div>

              <div className="col-md-3">
                  <div className="col-md-12 grid-item">
                  <div>
                      <h1 className="red2"> {USDTotal ? USDTotal.toFixed(3) : USDTotal} </h1>
                      <h4> USD</h4>
                      </div>
                  </div>
              </div>
            </div>

            <h2> Today your {total.symbol} is worth:  </h2>
              <div className="col-md-12">
              {total.gainPercent && total.newSP ?
              <div>
                  <div className="col-md-12 grid-item">
                    <div className="col-md-6">
                        <h1 className="red3"> {total.newSP.toFixed(3)}  </h1>
                        <h4> {total.currency}</h4>
                    </div>
                   
                    <div className="col-md-6">
                    {total.gainPercent ! === Number.POSITIVE_INFINITY ? 
                    <h1 className="red5"> {total.gainPercent.toFixed(2)}% </h1>
                      :  <h1 className="red5"> Could not calculate profit </h1>
                       }
                         <h4>profit made</h4>
                    </div> 
                  </div> 

              </div> : null}

            <div className="col-md-12 stats">
              {total.lostPercent && total.newSP ? 
              <div>     
              <div className="col-md-12 grid-item">
               <div className="col-md-6">
                        <h1 className="red3"> {total.newSP.toFixed(2)}  </h1>
                        <h4> {total.currency}</h4>
                    </div>

                  <div  className="col-md-6">
                      <h1 className="red2">{total.lostPercent.toPrecision(5)}%</h1>
                      <h4> Profit Lost </h4>
                  </div>
                </div>
              </div> : null}
            </div>
         </div>
              </div> }
      </section>
   
    );
  }
}

export default Results;
