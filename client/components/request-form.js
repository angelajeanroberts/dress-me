import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchNewInquiry, me} from '../store'

class InquiryForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      productType: '',
      occasion: '',
      minPrice: 1000,
      maxPrice: 100000,
      description: '',
      userId: ''
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
    this.props.addNewInquiry(this.state)
    this.setState({
      title: '',
      productType: '',
      occasion: '',
      minPrice: 1000,
      maxPrice: 100000,
      description: ''
    })
  }

  componentDidMount() {
    this.props.loadInitialData()
    this.setState({
      userId: this.props.userId
    })
  }

  render() {
    return (
      <div className="window">
        <div className="center-display">
          <form className="post-form" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="title">Request Title:</label>
              <input
                className="post-input"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="e.g. Looking for a dress for a Miami wedding"
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
                placeholder="e.g. Dress"
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
                placeholder="e.g. Wedding"
              />
            </div>
            <div>
              <label htmlFor="minPrice">Min Price (USD):</label>
              <input
                className="post-input"
                type="number"
                name="minPrice"
                min="1"
                value={this.state.minPrice / 100}
                onChange={this.handleChange}
                placeholder="e.g. 100"
              />
            </div>
            <div>
              <label htmlFor="maxPrice">Max Price (USD):</label>
              <input
                className="post-input"
                type="number"
                min="1"
                name="maxPrice"
                value={this.state.maxPrice / 100}
                onChange={this.handleChange}
                placeholder="e.g. 300"
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
              <button className='post-button' type="submit">Post</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewInquiry: newInquiry => dispatch(fetchNewInquiry(newInquiry)),
    loadInitialData() {
      dispatch(me())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(InquiryForm)
