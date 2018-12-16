import React from 'react'
import {connect} from 'react-redux'
import {fetchSelectedReply, fetchDeletedReply, me} from '../store'
import {withRouter} from 'react-router'
import ReplyUpdate from './response-update'
import AcceptReply from './accept-response'
import {Panel} from 'react-bootstrap'
import moment from 'moment'

class SingleReply extends React.Component {
  constructor() {
    super()
    this.state = {
      updateForm: false,
      acceptForm: false
    }
  }

  handleClick = event => {
    event.target.value === 'accept'
      ? this.setState({
          acceptForm: this.state.acceptForm ? false : true,
          updateForm: false
        })
      : event.target.value === 'update'
        ? this.setState({
            updateForm: this.state.updateForm ? false : true,
            acceptForm: false
          })
        : this.props.deleteReply(this.props.reply.id)
  }

  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchSelectedReply(this.props.match.params.replyId)
  }

  render() {
    if (this.props.reply === null) {
      return (
        <div className="window">
          <div className="center-display">
            <h1>This Response No Longer Exists</h1>
          </div>
        </div>
      )
    } else {
      return (
        <div className="window">
          {!this.props.reply.id ? (
            <div className="center-dispaly">Fetching data...</div>
          ) : (
            <div className="center-display">
              <h1>Response Details:</h1>
              <div className="single-post">
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h3">
                      {this.props.reply.title}
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <div>
                      Posted by: {this.props.reply.user.firstName}{' '}
                      {this.props.reply.user.lastName}
                    </div>
                    <div>Description: {this.props.reply.description}</div>
                    <div>
                      Post Date:{' '}
                      {moment(this.props.reply.updatedAt).format('MMM Do YYYY')}
                    </div>
                    <a href={this.props.reply.productUrl}>Link to Product</a>
                  </Panel.Body>
                </Panel>
              </div>
              {this.props.reply.inquiry.userId === this.props.userId &&
              this.props.reply.inquiry.status === 'Open' ? (
                this.state.acceptForm ? (
                  <AcceptReply
                    reply={this.props.reply}
                    drizzle={this.props.drizzle}
                    drizzleState={this.props.drizzleState}
                  />
                ) : (
                  <div>
                    <button
                      className="user-button"
                      type="button"
                      value="accept"
                      onClick={this.handleClick}
                    >
                      Accept Response
                    </button>{' '}
                  </div>
                )
              ) : null}
              {this.props.reply.userId === this.props.userId ? (
                <div>
                  <div>
                    <button
                      className="user-button"
                      type="button"
                      value="update"
                      onClick={this.handleClick}
                    >
                      Update Response
                    </button>
                    <button
                      className="user-button"
                      type="button"
                      value="delete"
                      onClick={this.handleClick}
                    >
                      Delete Response
                    </button>
                    {this.state.updateForm ? (
                      <ReplyUpdate reply={this.props.reply} />
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    reply: state.reply.selectedReply,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSelectedReply: replyId => dispatch(fetchSelectedReply(replyId)),
    deleteReply: replyId => dispatch(fetchDeletedReply(replyId)),
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleReply))
