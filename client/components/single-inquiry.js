import React from 'react'
import {connect} from 'react-redux'
import {
  fetchSelectedInquiry,
  fetchDeletedInquiry,
  fetchAllReplies,
  me
} from '../store'
import {withRouter} from 'react-router'
import ReplyForm from './response-form'
import InquiryUpdate from './request-update'
import ScrollList from './scroll-list'
import {Panel} from 'react-bootstrap'
import moment from 'moment'

class SingleInquiry extends React.Component {
  constructor() {
    super()
    this.state = {
      replyForm: false,
      updateForm: false,
      replies: false
    }
  }

  handleClick = event => {
    event.target.value === 'post'
      ? this.setState({
          replyForm: this.state.replyForm ? false : true,
          replies: false,
          updateForm: false
        })
      : event.target.value === 'update'
        ? this.setState({
            updateForm: this.state.updateForm ? false : true,
            replies: false,
            replyForm: false
          })
        : event.target.value === 'delete'
          ? this.props.deleteInquiry(this.props.inquiry.id)
          : this.setState({
              replies: this.state.replies ? false : true,
              replyForm: false,
              updateForm: false
            })
  }

  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchSelectedInquiry(this.props.match.params.inquiryId)
    this.props.fetchAllReplies()
  }

  render() {
    if (this.props.inquiry === null) {
      return (
        <div className="window">
          <div className="center-display">
            <h1>This Post No Longer Exists</h1>
          </div>
        </div>
      )
    } else {
      return (
        <div className="window">
          {!this.props.inquiry.id ? (
            <div className="center-display">Fetching data...</div>
          ) : ( 
            <div className="center-display">
            {this.state.replyForm || this.state.updateForm || this.state.replies ? null : (
              <div className="single-post">
              <h1>Request Details:</h1>
              <div>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h3">
                      {this.props.inquiry.title}
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <div>Looking for: {this.props.inquiry.productType}</div>
                    <div>
                      Posted by: {this.props.inquiry.user.firstName}{' '}
                      {this.props.inquiry.user.lastName}
                    </div>
                    <div>Description: {this.props.inquiry.description}</div>
                    <div>
                      Post Date:{' '}
                      {moment(this.props.inquiry.updatedAt).format(
                        'MMM Do YYYY'
                      )}
                    </div>
                    <div>
                      Price: ${this.props.inquiry.minPrice/100} to ${this.props.inquiry.maxPrice/100}
                    </div>
                  </Panel.Body>
                </Panel>
              </div>
            </div> ) }
              <div>
                <button
                  className="user-button"
                  type="button"
                  value="replies"
                  onClick={this.handleClick}
                >
                  View Responses
                </button>
                <button
                  className="user-button"
                  type="button"
                  value="post"
                  onClick={this.handleClick}
                >
                  Post a Response
                </button>
                {this.state.replies ? (
                  <ScrollList
                    list={this.props.replies.filter(
                      reply => reply.inquiryId === this.props.inquiry.id
                    )}
                    type="replies"
                  />
                ) : null}
                {this.state.replyForm ? (
                  <ReplyForm
                    userId={this.props.inquiry.user.id}
                    inquiryId={this.props.inquiry.id}
                  />
                ) : null}
                {this.props.inquiry.user.id === this.props.userId ? (
                  <div>
                    <button
                      className="user-button"
                      type="button"
                      value="update"
                      onClick={this.handleClick}
                    >
                      Update Request
                    </button>
                    <button
                      className="user-button"
                      type="button"
                      value="delete"
                      onClick={this.handleClick}
                    >
                      Delete Request
                    </button>
                    {this.state.updateForm ? (
                      <InquiryUpdate inquiry={this.props.inquiry} />
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    inquiry: state.inquiry.selectedInquiry,
    userId: state.user.id,
    replies: state.reply.allReplies
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSelectedInquiry: inquiryId =>
      dispatch(fetchSelectedInquiry(inquiryId)),
    fetchAllReplies: () => dispatch(fetchAllReplies()),
    deleteInquiry: inquiryId => dispatch(fetchDeletedInquiry(inquiryId)),
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleInquiry))
