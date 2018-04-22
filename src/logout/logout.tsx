import * as React from 'react'
import { ClipLoader } from 'react-spinners'
import { Redirect } from 'react-router-dom'

export type State = {
  redirect: boolean
}

export type Props = {
  app: any
}

class Logout extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      redirect: false,
    }
  }

  componentWillMount() {
    const app = this.props.app
    app.firebase_
      .auth()
      .signOut()
      .then(user => {
        this.setState({ redirect: true })
      })
  }

  render() {
    return this.state.redirect === true ? (
      <Redirect to="/" />
    ) : (
      <div className="login ">
        <h3>Logging Out</h3>
        <ClipLoader color={'white'} loading={true} />
      </div>
    )
  }
}

export default Logout
