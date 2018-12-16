import React from 'react'
import ScrollArea from 'react-scrollbar'
import {Link} from 'react-router-dom'
import {Panel} from 'react-bootstrap'
import moment from 'moment'

class ScrollList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nameFilter: '',
      productTypeFilter: ''
    }
  }

  updateNameFilter = event => {
    this.setState({
      nameFilter: event.currentTarget.value
    })
  }

  updateProductTypeFilter = event => {
    this.setState({
      productTypeFilter: event.currentTarget.value
    })
  }

  getFilteredPosts = () => {
    const {nameFilter, productTypeFilter} = this.state
    const list = this.props.list
    const filteredForName = list.filter(post => {
      const pattern = new RegExp(nameFilter, 'i')
      if (nameFilter.length > 0) {
        if (
          !(
            pattern.test(post.user.firstName) ||
            pattern.test(post.user.lastName)
          )
        ) {
          return false
        }
      }
      return true
    })
    const filteredForProduct = filteredForName.filter(post => {
      const pattern = new RegExp(productTypeFilter, 'i')
      if (productTypeFilter.length > 0) {
        if (this.props.type === 'inquiries') {
          if (!pattern.test(post.productType)) {
            return false
          }
        } else {
          if (!pattern.test(post.inquiry.productType)) {
            return false
          }
        }
      }
      return true
    })
    return filteredForProduct
  }

  render() {
    const list = this.props.list.length ? this.getFilteredPosts() : []
    const type = this.props.type
    return (
      <div>
        <div className="search-bar">
          <div id="name-search">
            <label>Search by User Name:</label>
            <input
              type="text"
              placeholder="Type to search"
              onChange={this.updateNameFilter}
            />
          </div>
          <div id="product-search">
            <label>Search by Product Type:</label>
            <input
              type="text"
              placeholder="Type to search"
              onChange={this.updateProductTypeFilter}
            />
          </div>
        </div>
        <div className="scroll-element">
          <ScrollArea
            speed={0.8}
            className="scroll-area"
            conentClassName="conent"
            horizontal={false}
          >
            <div className="scroll-list">
              {list.map(item => (
                <Link key={item.id} to={`/${type}/${item.id}`}>
                  <Panel>
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">
                        {item.title}
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      {type === 'inquiries' && (
                        <div>Looking for: {item.productType}</div>
                      )}
                      <div>
                        Posted by: {item.user.firstName} {item.user.lastName}
                      </div>
                      <div>Description: {item.description}</div>
                      <div>
                        Post Date:{' '}
                        {moment(item.updatedAt).format('MMM Do YYYY')}
                      </div>
                      {type === 'replies' && (
                      <a href={item.productUrl}>Link to Product</a>
                      )}
                    </Panel.Body>
                  </Panel>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    )
  }
}

export default ScrollList
