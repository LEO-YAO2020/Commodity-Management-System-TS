import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './lib/model/reduxHook'
import { increment, decrement, incrementByAmount, selectCount, selectMovieCount } from './redux/counterSlice'
import { incrementAsync } from './redux/movieSlice'

function App() {
  const [chooseNum, setChooseNum] = useState(1)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(incrementAsync())
  }, [dispatch])
  const { count } = useAppSelector(selectCount)
  const { list } = useAppSelector(selectMovieCount)

  return (
    <div>
      <h3>count :{count}</h3>
      <select
        defaultValue='1'
        onChange={(value) => {
          setChooseNum(+value.target.value)
        }}
      >
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
      </select>
      &nbsp;
      <button
        onClick={() => {
          dispatch(increment())
          // store.dispatch({
          //   type:'increment',
          //   payload:{number: chooseNum*1}
          // })
          //this.setState({ count: count + chooseNum*1 })
        }}
      >
        +
      </button>
      &nbsp;
      <button
        onClick={() => {
          dispatch(decrement())
          // store.dispatch({
          //   type:'decrement',
          //   payload:{number:chooseNum*1}
          // })
        }}
      >
        -
      </button>
      &nbsp;
      <button
        onClick={() => {
          if (count % 2 === 1) {
            dispatch(incrementByAmount({ num: chooseNum }))
            // store.dispatch({
            //   type:'addOdd',
            //   payload:{number: 1}
            // })
            //this.setState({ count: count + 1 }
          }
        }}
      >
        Increment if odd
      </button>
      &nbsp;
      <button
        onClick={() => {
          // setTimeout(() => {
          //   store.dispatch({
          //     type:'addOdd',
          //     payload:{number: chooseNum*1}
          //   })
          //   //this.setState({ count: count + chooseNum*1 })
          // }, 1000);
        }}
      >
        Increment async
      </button>
      &nbsp;
      <ul>
        {list.map((item) => (
          <li>{item.finalPrice}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
