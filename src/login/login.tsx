import * as React from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Toaster, Intent } from 'blueprint'
import Header from '../header/header'

export type State = {
  value: string
  redirect: boolean
}

export type Props = {
  isAuthenticated: boolean
  app: any
}

class Login extends React.Component<Props, State> {
  private emailInput: HTMLInputElement
  private passwordInput: HTMLInputElement
  private loginForm
  private toast

  constructor(props: Props) {
    super(props)
    this.loginForm = null
    this.authWithEmailAndPassword = this.authWithEmailAndPassword.bind(this)
    this.state = {
      redirect: false,
      value: '',
    }
  }

  authWithEmailAndPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const email = this.emailInput.value
    const password = this.passwordInput.value
    const app = this.props.app

    app
      .auth()
      .fetchProvidersForEmail(email)
      .then(providers => {
        if (providers.length === 0) {
          return app.auth().createUserWithEmailAndPassword(email, password)
        } else if (providers.indexOf('password') === -1) {
          this.loginForm.reset()
          this.toast.show({
            intent: Intent.WARNING,
            message: 'Try alternative login',
          })
        } else {
          return app.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then(user => {
        if (user && user.email) {
          this.loginForm.reset()
          this.setState({ redirect: true })
        }
      })
      .catch(error => {
        this.toast.show({ intent: Intent.Danger, message: error.message })
      })
    console.table([
      {
        email: this.loginForm,
        password: e.target,
      },
    ])
  }

  getValidationState() {
    const length = this.state.value.length
    if (length > 10) return 'success'
    else if (length > 5) return 'warning'
    else if (length > 0) return 'error'
    return null
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
  }
  render() {
    return this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <div className="login ">
        <div className="container">
          <h2> Login </h2>
          <h3>
            If you don't have an account already one will be created for you.
          </h3>

          <form
            onSubmit={event => this.authWithEmailAndPassword(event)}
            ref={form => {
              this.loginForm = form
            }}
          >
            <FormGroup
              controlId="pw-control"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                required={true}
                onChange={e => this.handleChange(e)}
                type="email"
                name="email"
                inputRef={input => (this.emailInput = input)}
              />
              <FormControl.Feedback />

              <ControlLabel style={{ marginBottom: 10 + 'px' }}>
                Password
              </ControlLabel>

              <FormControl
                required={true}
                type="password"
                name="password"
                onChange={e => this.handleChange(e)}
                inputRef={e => (this.passwordInput = e)}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <HelpBlock>Validation is based on string length.</HelpBlock>
            </FormGroup>

            <input type="submit" value={'Login'} style={{ width: '100%' }} />
          </form>
        </div>
      </div>
    )
  }
}

export default Login
