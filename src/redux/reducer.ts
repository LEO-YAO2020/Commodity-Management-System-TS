import { MessageState, MessageAction } from '../lib/model/redux'

const initialState: MessageState = {
  count: 1
}

export default function countReducer(preState = initialState, action: MessageAction) {
  console.log('reducer action')
  let newState: MessageState
  switch (action.type) {
    case 'increment':
      newState = JSON.parse(JSON.stringify(preState))
      newState.count = newState.count + action.payload.number
      console.log(newState)
      return newState
    case 'decrement':
      newState = JSON.parse(JSON.stringify(preState))
      newState.count = newState.count - action.payload.number
      console.log(newState)
      return newState
    case 'addOdd':
      newState = JSON.parse(JSON.stringify(preState))
      newState.count = newState.count + action.payload.number
      console.log(newState)
      return newState
    case 'async':
      newState = JSON.parse(JSON.stringify(preState))
      newState.count = newState.count + action.payload.number
      console.log(newState)
      return newState
    default:
      return preState
  }
}
