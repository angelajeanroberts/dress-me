import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import axios from 'axios'
import web3 from 'web3'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      drizzleState: null,
      contractUserId: null
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
        const contract = drizzle.contracts.Main
        const contractUserId = await contract.methods['auth'].cacheSend({
          from: drizzleState.accounts[0],
          gas: 3000000
        })
        this.setState({loading: false, drizzleState, contractUserId})
        console.log('drizzleState', drizzleState)
        console.log('contractUsedId', contractUserId)
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
