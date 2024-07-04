import React from "react";
import "./Orders.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../../assets/assets";

const Orders = ({ url, token, setToken }) => {
  const [orders, setOrders] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState({}); // { orderId : status }

  const fetchAllOrders = async (token) => {
    const response = await axios.get(url + "/api/order/list", {
      headers: { token },
    });
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data); // Ensure status is included in the data logged here
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      fetchAllOrders(tokenFromStorage);
    }
  }, []);

  // this function use to handle the change of the status of the orderId { orderId : status} when user select the option.
  // the change value will then use with the onSubmit function

  const handleStatusChange = (e, orderId) => {
    const newStatus = e.target.value;
    setUpdatedStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: newStatus,
    }));
  };

  const fecthStatusHandler = async (orderId) => {
    const newStatus = updatedStatus[orderId];

    if (!newStatus) {
      toast.error("Please select a status before updating");
      return;
    }

    const response = await axios.post(
      url + "/api/order/status",
      {
        orderId,
        status: newStatus,
      },
      {
        headers: { token },
      }
    );

    if (response.data.success) {
      // Update the state to reflect the new status in the UI
      const updatedOrders = orders.map((order) => {
        if (order._id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      });
      setOrders(updatedOrders);
      toast.success(`Updated Status '${newStatus}'`);
    } else {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="order">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) =>
                  index === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p className="order-item-name">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              value={updatedStatus[order._id] || order.status}
              onChange={(e) => handleStatusChange(e, order._id)}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button
              onClick={() => fecthStatusHandler(order._id)}
              className="update-button"
            >
              Update Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
