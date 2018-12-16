import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchUpdatedReply,
  fetchUpdatedInquiry,
  fetchNewTransaction
} from '../store'
import axios from 'axios'
import web3 from 'web3'

class AcceptReply extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      tip: 0,
      account: '',
      tipSet: false,
      stackId: null,
      tyPage: false
    }
  }

  handleChange = event => {
    if (event.target.name === 'tip') {
      this.setState({
        [event.target.name]: +event.target.value * 100
      })
    } else {
      this.setState({[event.target.name]: event.target.value})
    }
  }

  setTip = async (account, value) => {
    const {drizzle, drizzleState} = this.props
    const contract = drizzle.contracts.PayTip
    const stackId = await contract.methods['setTip'].cacheSend(account, {
      from: drizzleState.accounts[0],
      value: value,
      gas: 3000000
    })
    this.setState({
      stackId
    })
  }

  handleSubmitSetTip = async event => {
    event.preventDefault()
    const exchangeRate = await axios.get(
      'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD'
    )
    const ether = (this.state.tip / 100 / exchangeRate.data.USD).toString()
    const wei = web3.utils.toWei(ether, 'ether')
    this.setTip(this.state.account, wei)
    this.setState({
      tipSet: true
    })
  }

  handleSubmitNoTip = event => {
    event.preventDefault()
    const replyUpdates = {
      tip: this.state.tip,
      status: 'Accepted'
    }
    const inquiryUpdates = {
      status: 'Closed'
    }
    this.props.updateReply(this.props.reply.id, replyUpdates)
    this.props.updateInquiry(this.props.reply.inquiryId, inquiryUpdates)
    this.setState({
      tip: 0,
      account: '',
      tipSet: false,
      stackId: null,
      tyPage: true
    })
  }

  handleDeletePayment = async event => {
    event.preventDefault()
    const {drizzle, drizzleState} = this.props
    const contract = drizzle.contracts.PayTip
    await contract.methods['undoPayment'].cacheSend({
      from: drizzleState.accounts[0],
      gas: 3000000
    })
    this.setState({
      tip: 0,
      account: '',
      tipSet: false,
      stackId: null,
      tyPage: false
    })
  }

  handleSubmitConfirmPayment = async event => {
    event.preventDefault()
    const {drizzle, drizzleState} = this.props
    const contract = drizzle.contracts.PayTip
    await contract.methods['finishPayment'].cacheSend({
      from: drizzleState.accounts[0],
      gas: 3000000
    })
    const replyUpdates = {
      tip: this.state.tip,
      status: 'Accepted'
    }
    const inquiryUpdates = {
      status: 'Closed'
    }
    const debitTransaction = {
      type: 'Debit',
      amount: this.state.tip,
      description: 'Tip for fulfilling request',
      replyId: this.props.reply.id,
      inquiryId: this.props.reply.inquiryId,
      userId: this.props.reply.userId
    }
    const creditTransaction = {
      type: 'Credit',
      amount: this.state.tip,
      description: 'Tip for fulfilling request',
      replyId: this.props.reply.id,
      inquiryId: this.props.reply.inquiryId,
      userId: this.props.reply.inquiry.userId
    }
    this.props.updateReply(this.props.reply.id, replyUpdates)
    this.props.updateInquiry(this.props.reply.inquiryId, inquiryUpdates)
    this.props.fetchNewTransaction(debitTransaction)
    this.props.fetchNewTransaction(creditTransaction)
    this.setState({
      tip: 0,
      account: '',
      tipSet: false,
      stackId: null,
      tyPage: true
    })
  }

  render() {
    const {drizzle, drizzleState} = this.props
    console.log('drizzle', drizzle)
    console.log('drizzleState', drizzleState)
    console.log('stackId', this.state.stackId)
    return this.state.tyPage ? (
      <h2>Response accepted and request closed!</h2>
    ) : !this.state.tipSet ? (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="tip">Tip Amount:</label>
            <input
              type="number"
              name="tip"
              min="0"
              value={this.state.tip / 100}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="account">Account:</label>
            <input
              type="text"
              name="account"
              value={this.state.account}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button
              className="submit-button"
              type="submit"
              onClick={this.handleSubmitSetTip}
            >
              Confirm Tip Amount
            </button>
            <button
              className="submit-button"
              type="submit"
              onClick={this.handleSubmitNoTip}
            >
              No Tip This Time!
            </button>
          </div>
        </form>
      </div>
    ) : (
      <div>
        <button
          className="submit-button"
          type="submit"
          onClick={this.handleSubmitConfirmPayment}
        >
          Confirm Payment
        </button>
        {/* <button className='submit-button' type="submit" onClick={this.handleDeletePayment}>
          Undo Payment
        </button> */}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateReply: (replyId, updates) =>
      dispatch(fetchUpdatedReply(replyId, updates)),
    updateInquiry: (requestId, updates) =>
      dispatch(fetchUpdatedInquiry(requestId, updates)),
    fetchNewTransaction: transaction =>
      dispatch(fetchNewTransaction(transaction))
  }
}
export default connect(null, mapDispatchToProps)(AcceptReply)
