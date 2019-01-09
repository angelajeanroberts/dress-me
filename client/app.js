import React from 'react'
import {Navbar} from './components'
import Routes from './routes'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      drizzleState: null,
      contractUserId: null
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  componentDidMount() {
    const {drizzle} = this.props
    console.log('drizzle', drizzle)
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState()
      if (drizzleState.drizzleStatus.initialized) {
        console.log('drizzleState', drizzleState)
        this.setState({loading: false, drizzleState})
      }
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
          contractUserId={this.state.contractUserId}
        />
      </div>
    )
  }
}

export default App
