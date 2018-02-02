import * as React from 'react';
import Header from '../header/header';

export type Props = {

};

class Results extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {date: new Date()};
  }
  render() {
    return (
      <section>
        <Header />
          <div className="container results">
          <div className="col-md-12">
            <h2> Your investment of 1200 euro is now  </h2>
            <h1> £5000 </h1>
          </div>
          </div>
      </section>
   
    );
  }
}

export default Results;
