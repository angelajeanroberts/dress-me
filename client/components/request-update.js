import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUpdatedInquiry} from '../store'

class InquiryUpdate extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      productType: '',
      occasion: '',
      minPrice: 1000,
      maxPrice: 100000,
      description: ''
    }
  }
  handleChange = event => {
    if (event.target.name === 'minPrice' || event.target.name === 'maxPrice') {
      this.setState({
        [event.target.name]: +event.target.value * 100
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.updateInquiry(this.props.inquiry.id, this.state)
  }

  componentDidMount() {
    this.setState({
      title: this.props.inquiry.title,
      productType: this.props.inquiry.productType,
      occasion: this.props.inquiry.occasion,
      minPrice: this.props.inquiry.minPrice,
      maxPrice: this.props.inquiry.maxPrice,
      description: this.props.inquiry.description
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
          <label htmlFor="productType">Item Type:</label>
          <input
            className="post-input"
            type="text"
            name="productType"
            value={this.state.productType}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="occasion">Occasion:</label>
          <input
            className="post-input"
            type="text"
            name="occasion"
            value={this.state.occasion}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="minPrice">Min Price:</label>
          <input
            className="post-input"
            type="number"
            name="minPrice"
            min="1"
            value={this.state.minPrice / 100}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            className="post-input"
            type="number"
            min="1"
            name="maxPrice"
            value={this.state.maxPrice / 100}
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
    updateInquiry: (inquiryId, updates) =>
      dispatch(fetchUpdatedInquiry(inquiryId, updates))
  }
}
export default connect(null, mapDispatchToProps)(InquiryUpdate)
