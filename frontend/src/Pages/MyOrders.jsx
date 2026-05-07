import React, { useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import { useContext, useState } from 'react';

const MyOrders = () => {
  const {axios} = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const fetchMyOrders=async()=>{
    try {
      const {data} = await axios.get("/api/order/my-orders");
      if(data?.success) {
        setOrders(data.orders);
      }
      
    } catch (error) {
      console.log(error);
      
    }
  };
  useEffect(() => {
    fetchMyOrders();
  }, []);
  return (
    <div className='max-w-5xl mx-auto mt-10 p-6'>
      <h2 className="text-2xl font-semibold mb-6 text-center">My Orders</h2>
      {orders.length===0?(
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ):(
        <div>
        {orders.map((order)=>(
            <div key={order._id} className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 mb-4 hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-3"></div>
            
            </div>
          ))}
    </div>
  )}
</div>);};
export default MyOrders