import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_TRANSACTIONS = 'GET_ALL_TRANSACTIONS'
const GET_TRANSACTION = 'GET_TRANSACTION'
const POST_TRANSACTION = 'POST_TRANSACTION'

/**
 * INITIAL STATE
 */
const initialState = {
  allTransactions: [],
  selectedTransaction: {}
}

/**
 * ACTION CREATORS
 */
const setAllTransactions = transactions => ({type: GET_ALL_TRANSACTIONS, transactions})
const setSelectedTransaction = transaction => ({type: GET_TRANSACTION, transaction})
const setNewTransaction = transaction => ({type: POST_TRANSACTION, transaction})

export const fetchAllTransactions = () => async dispatch => {
  try {
    const {data: transactions} = await axios.get(`/api/transactions`)
    dispatch(setAllTransactions(transactions))
  } catch (error) {
    console.log(error)
  }
}

export const fetchSelectedTransaction = transactionId => async dispatch => {
  try {
    const {data: transaction} = await axios.get(`/api/replies/${transactionId}`)
    dispatch(setSelectedTransaction(transaction))
  } catch (error) {
    console.log(error)
  }
}

export const fetchNewTransaction = transaction => async dispatch => {
  try {
    const {data: newTransaction} = await axios.post('/api/transactions', transaction)
    dispatch(setNewTransaction(newTransaction))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TRANSACTIONS:
      return {
        ...state,
        allTransactions: action.transactions
      }
    case GET_TRANSACTION:
      return {
        ...state,
        selectedTransaction: action.transaction
      }
    case POST_TRANSACTION:
      return {
        ...state,
        allReplies: [...state.allTransactions, action.transaction]
      }
    default:
      return state
  }
}
