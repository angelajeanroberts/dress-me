import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {me} from '../store'

class HomePage extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return isLoggedIn ? (
      <div className='window'>
      <div className='center-display'>
        <h2>what are you looking to do?</h2>
        <div className='home-options'>
        <Link to="/post">
          <button className='home-button' type="button">Post A Request</button>
        </Link>
        <Link to="/inquiries">
          <button className='home-button' type="button">Search Open Requests</button>
        </Link>
        </div>
      </div>
      </div>
    ) : (
      <div className='window'>
      <div className='center-display'>
        <h2>log in or sign up to enter</h2>
        <div className='home-options'>
        <Link to="/login">
          <button className='home-button' type="button">Log In</button>
        </Link>
        <Link to="/signup">
          <button className='home-button' type="button">Sign Up</button>
        </Link>
        </div>
      </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(HomePage)
