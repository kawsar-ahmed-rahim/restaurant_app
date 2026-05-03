import React from 'react'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'
const Cart = () => {
  const Cart = () => {
    const {cart,totalPrice,navigate} = useContext(AppContext);
    if(!cart|| !cart.items || cart.items.length===0){
      return (
        <div className='flex flex-col items-center justify-center h-64'><h2 className='text-2xl font-semibold text-gray-700'>
          Your cart is empty</h2></div>
      )
    }
  }
  return (
    <div>Cart</div>
  )
}

export default Cart