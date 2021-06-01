
export type ActionType = 'increment' | 'decrement' | 'addOdd' | 'async';

export type MessageAction = {
  type: ActionType,
  payload: {number:number}
}

export type MessageState = {
  count:number
}
