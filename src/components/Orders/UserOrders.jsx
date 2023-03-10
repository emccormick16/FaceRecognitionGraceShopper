import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserOrdersDetails from "./UserOrdersDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const UserOrders = () => {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setLoading(true);

    try {
      // JWT & authorization header to give for authorization check in the API
      const token = window.localStorage.getItem("token");
      const config = { headers: { authorization: "Bearer " + token } };

      //GET all orders associated with user
      const ordersData = await axios.get(
        `/api/orders/users/${user.id}`,
        config
      );
      setOrders(ordersData.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Past Orders</h2>
      {orders.map((order) => (
        <Card
          key={order.id}
          variant="outlined"
          style={{ margin: "10px", padding: "10px", textAlign: "center" }}
        >
          <Typography variant="h5">Summary for Order #{order.id}</Typography>
          <div>Date Ordered: {order.createdAt.split("T")[0]}</div>
          <div>Total Price: ${(order.price / 100).toFixed(2)}</div>
          <div>Delivery Status: {order.orderStatus}</div>
          <div>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Expand Order Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {order.cartItems.map((cartItem) => {
                  return (
                    <UserOrdersDetails key={cartItem.id} cartItem={cartItem} />
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UserOrders;
