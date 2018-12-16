import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      drizzleState: null
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  componentDidMount() {
    const {drizzle} = this.props
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState()
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({loading: false, drizzleState})
        console.log(drizzleState)
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
        />
      </div>
    )
  }
}

export default App
