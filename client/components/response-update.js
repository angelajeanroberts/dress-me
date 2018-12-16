import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUpdatedReply} from '../store'

class ReplyUpdate extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      productUrl: '',
      imageUrl: '',
      description: ''
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.updateReply(this.props.reply.id, this.state)
  }

  componentDidMount() {
    this.setState({
      title: this.props.reply.title,
      productUrl: this.props.reply.productUrl,
      imageUrl: this.props.reply.imageUrl ? this.props.reply.Image : '',
      description: this.props.reply.description
    })
  }

  render() {
    return (
      <form className="post-form" onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title">Request Title:</label>
          <input
            className="post-input"
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="productUrl">Link to Product:</label>
          <input
            className="post-input"
            type="text"
            name="productUrl"
            value={this.state.productUrl}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image Link:</label>
          <input
            className="post-input"
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            className="post-input"
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <button className="post-button" type="submit">Post</button>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateReply: (replyId, updates) =>
      dispatch(fetchUpdatedReply(replyId, updates))
  }
}
export default connect(null, mapDispatchToProps)(ReplyUpdate)
