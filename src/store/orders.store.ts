import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, database } from "../components/lib/firebase/firebase";
import type { ItemDto, OrderDTO } from "../components/Dtos";

const ordersCollection = collection(database, "orders");

export const ordersHandlers = {
    addOrder: async (order: OrderDTO) => {
        console.log("order", order);
        try {
            await addDoc(ordersCollection, {...order});
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