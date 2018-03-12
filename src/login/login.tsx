import * as React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export type State = {
  value: string;
};

export type Props = {
  isAuthenticated: boolean;
};

class Login extends React.Component<Props, State> {
   loginForm;

    constructor(props: Props) {
        super(props);
        this.loginForm = null;
        this.state = {
          value: ''
        };
      }

    authWithEmailAndPassword(e: React.FormEvent<HTMLFormElement>){

    }

    getValidationState() {
      const length = this.state.value.length;
      if (length > 10) return 'success';
      else if (length > 5) return 'warning';
      else if (length > 0) return 'error';
      return null;
    }
  
    handleChange(e) {
      this.setState({ value: e.target.value });
    }
  render() {
    return (
      <div className="login ">
     <div className="container">
      <h2> Login </h2>
        <form 
              onSubmit={(event) => { this.authWithEmailAndPassword(event) ; }} 
              ref={(form) => {this.loginForm = form; }} 
        >
         
              <label>Email </label>
              <input required={true} onChange={(e) => { }} type="email" name="email" />

              <label>Password</label>
              <input required={true} onChange={(e) => { }} type="password" name="password" />
        </form>
        <form >
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="email"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>

        <button />
      </form>
      </div>
      </div>

    );
  }
}

export default Login;
