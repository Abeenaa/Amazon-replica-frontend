import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/Firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./Order.module.css";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../Components/Product/ProductCard";
function Order() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.uid) {
      setOrders([]);
      return;
    }

    const ordersRef = collection(db, "users", user.uid, "orders");
    const q = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const ordersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
        console.log("Orders loaded:", ordersList);
      },
      (error) => {
        console.error("Error fetching orders:", error);
      }
    );

    // Cleanup on unmount
    return () => unsubscribe();
  }, [user?.uid]);
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.order_container}>
          <h2>Your Orders</h2>
          <div>
            {/* ordered item */}

            {orders.length === 0 ? (
              <p>No orders yet</p>
            ) : (
              <div>
                {orders.map((order) => (
                  <div key={order.id} className={classes.order_item}>
                    <hr />
                    <p>Order ID: {order.id}</p>
                    <div>
                      {
                        order?.basket?.map((order) => {
                          return (
                            <ProductCard
                              // flex={false}
                              renderAdd={false}
                              key={order.id}
                              product={order}
                            />
                          );
                        })

                        /* <p>Amount: ${(order.amount / 100).toFixed(2)}</p>
                    <p>
                      Date:{" "}
                      {new Date(order.created * 1000).toLocaleDateString()}
                    </p> */
                      }
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Order;
