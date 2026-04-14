import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
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
  useEffect(() => {
    if (admin) {
      fetchOrders();
    }
  }, []);
  return <div>Orders</div>;
};

export default Orders;
