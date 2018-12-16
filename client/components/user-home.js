import React from 'react'
import {connect} from 'react-redux'
import ScrollList from './scroll-list'
import {
  fetchAllInquiries,
  fetchAllReplies
} from '../store'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedButton: 'inquiries'
    }
  }

  handleClick = event => {
    this.setState({
      selectedButton: event.target.value
    })
  }

  componentDidMount() {
    this.props.fetchAllInquiries()
    this.props.fetchAllReplies()
  }

  render() {
    const user = this.props.user
    const inquiries = this.props.inquiries
    const replies = this.props.replies
    const viewList =
      this.state.selectedButton === 'inquiries'
        ? inquiries.filter(inquiry => inquiry.userId === user.id)
        : replies.filter(reply => reply.userId === user.id)
    return !user.id || inquiries.id ? (
      <div>Fetching Data...</div>
    ) : (
      <div className='window'>
        <div className='center-display'>
        <div>
          <h3 className='header'>Welcome, {user.firstName}</h3>
          <h4 className='header'>view or update your requests and responses below</h4>
        </div>
        <ScrollList type={this.state.selectedButton} list={viewList} />
        <div className='user-buttons'>
          <button className='user-button' type="button" onClick={this.handleClick} value="inquiries">
            Requests
          </button>
          <button className='user-button' type="button" onClick={this.handleClick} value="replies">
            Responses
          </button>
        </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    inquiries: state.inquiry.allInquiries,
    replies: state.reply.allReplies
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllReplies: () => dispatch(fetchAllReplies()),
    fetchAllInquiries: () => dispatch(fetchAllInquiries())
  }
}

export default connect(mapState, mapDispatch)(UserHome)
