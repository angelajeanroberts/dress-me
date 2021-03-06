import axios from 'axios'
import history from '../history'
import web3 from 'web3'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

const defaultUser = {}

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

export const me = () => async dispatch => {
  try {
    const {data: user} = await axios.get('/auth/me')
    if (user) {
      const userData = await axios.get(`/api/users/${user.id}`)
      dispatch(getUser(userData.data))
    } else {
      dispatch(getUser(defaultUser))
    }
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, contractUserId, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password, contractUserId})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    const userData = await axios.get(`/api/users/${res.data.id}`)
    dispatch(getUser(userData.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/home')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
