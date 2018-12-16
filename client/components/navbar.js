import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navbar">
    <div id="navbar-header">DRESS ME</div>
    <div id="navbar-footer">
      <div id="navbar-left">
        <div>Find exactly what you're looking for</div>
      </div>
      <nav id="navbar-right">
        {isLoggedIn ? (
          <div id="nav-links">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/user">My Account</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : null}
      </nav>
    </div>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
