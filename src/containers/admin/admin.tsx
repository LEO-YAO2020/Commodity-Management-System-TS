import React, { Component, useEffect } from 'react'
import { useAppDispatch,useAppSelector } from '../../redux/reduxHooks'
import { Test1,Test2,selectValue } from '../../redux/reducers/test_reducer'

function Admin() {
  const value = useAppSelector(selectValue)
  const dispatch = useAppDispatch();

  useEffect(()=>{
    
    console.log(value);
    console.log(dispatch);
  },[])
  return <div>xxxx</div>
}


export default Admin
