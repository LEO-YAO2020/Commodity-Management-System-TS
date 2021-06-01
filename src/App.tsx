import React, { Component } from 'react'
import store from './redux/store'
export interface Props {}


export interface State {
  count: number,
  chooseNum:number
}

class App extends Component<Props, State> {
  state = {
    count: 0,
    chooseNum:1
  }

  render() {
    let { count,chooseNum } = this.state
    store.subscribe(()=>{
      this.setState(store.getState());
    });
    return (
      <div>
        <h3>count :{store.getState().count}</h3>
        <select
          defaultValue='1'
          onChange={(value) => {
            this.setState({
              chooseNum: +value.target.value
            })
          }}
        >
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
        &nbsp;
        <button
          onClick={() => {
            store.dispatch({
              type:'increment',
              payload:{number: chooseNum*1}
            })
            //this.setState({ count: count + chooseNum*1 })
          }}
        >
          +
        </button>
        &nbsp;
        <button
          onClick={() => {
            store.dispatch({
              type:'decrement',
              payload:{number:chooseNum*1}
            })
          }}
        >
          -
        </button>
        &nbsp;
        <button
          onClick={() => {
            if (store.getState().count % 2 === 1) {
              store.dispatch({
                type:'addOdd',
                payload:{number: 1}
              })
              //this.setState({ count: count + 1 })
            }
          }}
        >
          Increment if odd
        </button>
        &nbsp;
        <button
          onClick={() => {
            setTimeout(() => {
              store.dispatch({
                type:'addOdd',
                payload:{number: chooseNum*1}
              })
              //this.setState({ count: count + chooseNum*1 })
            }, 1000);
            
          }}
        >
          Increment async
        </button>
        &nbsp;
      </div>
    )
  }
}

export default App
