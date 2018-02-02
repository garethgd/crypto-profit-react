import * as React from 'react';
import Header from '../header/header';

export type Props = {

};

class Home extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {date: new Date()};
  }
  render() {
    return (
      <section>
        <Header />
          <div className="container home">
            <div className="col-md-6">
            <span className="ion-social-bitcoin-outline">
            f
            </span>
            </div>
            <div className="col-md-6">
             <h2> Enter Previous Purchase </h2>

             <label>Coin Type </label>
               <select name="coin-type" />

             <label>Price </label>
               <input type="text" name="price" />
             <label>Date </label>
               <input type="text" name="date" />

               <button type="submit"> Enter </button>
            </div>
          </div>
      </section>
   
    );
  }
}

export default Home;
