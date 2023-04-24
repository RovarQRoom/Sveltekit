import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { database } from "../components/lib/firebase/firebase";
import type { OrderDTO } from "../components/Dtos";
import { cartsHandlers } from "./cart.store";

const ordersCollection = collection(database, "orders");

export const ordersHandlers = {
    addOrder: async (order: OrderDTO) => {
        console.log("order", order);
        try {
            await addDoc(ordersCollection, {...order});

            cartsHandlers.deleteCartAfterOrder(order.userid);
            console.log("Cart Delete Successfully");
            
            console.log("Order Added Successfully");
        } catch (err) {
            console.log("error", err);
        }
    },
    getOrders: async (id:string) => {
        try {
            let orders: any = {};
            const orderDoc = await doc(database, "orders", id);
            
            orders = await getDoc(orderDoc);
            console.log("orders", orders.data());
            
            return orders.data();
        } catch (err) {
            console.log("error", err);
        }
    }
};