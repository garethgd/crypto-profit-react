import * as React from 'react';
import { Link } from 'react-router-dom';

export type State = {};

export type Props = {
};

class History extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div className="container">
      k
      </div>
    );
  }
}

export default History;
