import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllInquiries} from '../store'
import ScrollList from './scroll-list'

class AllInquiries extends Component {
  componentDidMount() {
    this.props.fetchAllInquiries()
  }

  render() {
    return (
      <div className='window'>
        <div className='center-display'>
        <h2>click below to see an open request</h2>
        <ScrollList type="inquiries" list={this.props.inquiries} />
      </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    inquiries: state.inquiry.allInquiries
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllInquiries() {
      dispatch(fetchAllInquiries())
    }
  }
}

export default connect(mapState, mapDispatch)(AllInquiries)
