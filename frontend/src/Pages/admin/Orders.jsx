import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from 'react-hot-toast';
const Orders = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/orders");
      if (data.success) {
        setOrders(data.Orders);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleStatusChange=async(orderId, newStatus)=>{
    try {
      setLoading(true);
      const {data} = await axios.put(`/api/order/update-status/${orderId}`,{
        status: newStatus,
      });
      if(data.success){
        toast.success(data.message);
        fetchOrders();
      } else {
        toast.error(data.success);
      }
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    if (admin) {
      fetchOrders();
    }
  }, []);
  return <div>
    <div className="py-24 px-3 sm:px-6">
      <h1 className="text-3xl font-bold text-center my-3">All Orders</h1>
      <div className="border border-gray-400 max-auto p-3 rounded-lg">
        {/* Header */}
        <div className="hidden md:grid grid-cols-5 font-semibold text-gray-700 mt-3">
          <div>Name</div>
          <div>Address</div>
          <div>Total Amount</div>
          <div>Payment method</div>
          <div>Status</div>

        </div>
        {/* Items */}
        <ul className="space-y-4">
          {orders.map((item)=>(
            <li key={item._id} className="border rounded-lg p-3 md:p-2">
              <div className="flex flex-col md:grid md:grid-cols-5 md:items-center gap-2 md:gap-0">
                <p className="font-medium text-center md:text-left">
                  {item?.user.name}</p>
                  <p className="font-medium text-center md:text-left">
                  {item?.address}</p>
                  <p className="text-gray-600 hidden md:block">
                  $ {item?.totalAmount}</p>
                  <p className="text-gray-600 hidden md:block">
                  $ {item?.paymentMethod}</p>
                  <div className="flex justify-center md:justify-start items-center gap-2 md:gap-5 mt-2 md:mt-0">
                    <select name="status" value={item.status} onChange={(e) => handleStatusChange(item._id, e.target.value)} disabled={loading} className="border rounded-md px-3 py-2" id="">
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
              </div>

              {/* Render Menu Item */}
              <div className="mt-3">
                {item.items.map((menu,index) =>(
                  <div key={index} className="flex items-center gap-3 bg-gray-50 border rounded-lg p-2 my-2">
                    <img src={menu?.menuItem?.image} alt="img" className="w-16 h-16 rounded object-cover" />
                    <div>
                      <p className="font-semibold">{menu?.menuItem?.name}</p>
                       <p className="text-sm text-gray-600">QTY:{menu?.quantity}</p>
                        <p className="text-sm text-gray-600">$:{menu?.menuItem?.price}</p>
                    </div>
                  </div>
                ))}
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>

  </div>;
};

export default Orders;
