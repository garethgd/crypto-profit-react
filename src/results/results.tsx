import * as React from 'react';
import Header from '../header/header';

export type Props = {
  data: any;
  total: { newCP?: number, CP?: number, newSP?: number, SP?: number, lostPercent?: number }
};

class Results extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {date: new Date()};
  }
  render() {
    return (
      <section>
        <Header />
          <div className="container results">
           <div className="ads">ads </div>
          <div className="col-md-12">
            <h2> Your investment of 1200 euro is now  </h2>
            <h1> £5000 </h1>
            <h4> You've made {this.props.total.newCP}% profit</h4>
          </div>
          </div>
      </section>
   
    );
  }
}

export default Results;
