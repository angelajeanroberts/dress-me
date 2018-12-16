import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_REPLIES = 'GET_REPLIES'
const GET_REPLY = 'GET_REPLY'
const POST_REPLY = 'POST_REPLY'
const UPDATE_REPLY = 'UPDATE_REPLY'
const DELETE_REPLY = 'DELETE_REPLY'

/**
 * INITIAL STATE
 */
const initialState = {
  allReplies: [],
  selectedReply: {}
}

/**
 * ACTION CREATORS
 */
const setAllReplies = replies => ({type: GET_ALL_REPLIES, replies})
const setSelectedReply = reply => ({type: GET_REPLY, reply})
const setNewReply = reply => ({type: POST_REPLY, reply})
const setUpdatedReply = reply => ({type: UPDATE_REPLY, reply})
const setWithDeletedReply = replyId => ({type: DELETE_REPLY, replyId})

export const fetchAllReplies = () => async dispatch => {
  try {
    const {data: replies} = await axios.get(`/api/replies`)
    dispatch(setAllReplies(replies))
  } catch (error) {
    console.log(error)
  }
}

export const fetchSelectedReply = replyId => async dispatch => {
  try {
    const {data: reply} = await axios.get(`/api/replies/${replyId}`)
    dispatch(setSelectedReply(reply))
  } catch (error) {
    console.log(error)
  }
}

export const fetchNewReply = reply => async dispatch => {
  try {
    const {data: newReply} = await axios.post('/api/replies', reply)
    dispatch(setNewReply(newReply))
  } catch (error) {
    console.log(error)
  }
}

export const fetchUpdatedReply = (
  replyId,
  replyUpdates
) => async dispatch => {
  try {
    const {data: updatedReply} = await axios.put(
      `/api/replies/${replyId}`,
      replyUpdates
    )
    dispatch(setUpdatedReply(updatedReply))
  } catch (error) {
    console.log(error)
  }
}

export const fetchDeletedReply = replyId => async dispatch => {
  try {
    await axios.delete(`/api/replies/${replyId}`)
    dispatch(setWithDeletedReply(replyId))
  } catch (error) {
    console.log(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_REPLIES:
      return {
        ...state,
        allReplies: action.replies
      }
    case GET_REPLY:
      return {
        ...state,
        selectedReply: action.reply
      }
    case POST_REPLY:
      return {
        ...state,
        allReplies: [...state.allReplies, action.reply]
      }
    case UPDATE_REPLY:
      return {
        ...state,
        allReplies: state.allReplies
          .filter(reply => reply.id !== action.reply.id)
          .concat(action.reply)
      }
    case DELETE_REPLY:
      return {
        ...state,
        allReplies: state.allReplies.filter(
          reply => reply.id !== action.replyId
        )
      }
    default:
      return state
  }
}
