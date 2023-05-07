import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, database } from "../components/lib/firebase/firebase";
import type { OrderDTO } from "../components/Dtos";

const ordersCollection = collection(database, "orders");

export const ordersHandlers = {
    addOrder: async (order: OrderDTO) => {
        console.log("order in Function", order);
        const cartItemsCollecton = collection(database, "cart_items");
        try {
            const cartItems = await query(cartItemsCollecton, where("userId", "==", auth.currentUser?.uid), where("deletedAt", "==", null));
            const cartItemsSnapshot = await getDocs(cartItems);
            const cartItemsData = cartItemsSnapshot.docs.map((doc) => ({
                id: doc.id,
                userId: doc.data().userid,
                name: doc.data().name,
                detail: doc.data().detail,
                item_image: doc.data().item_image,
                item_price: doc.data().item_price,
                total_price: doc.data().total_price,
                quantity: doc.data().quantity,
                createdAt: doc.data().createdAt,
                updatedAt: doc.data().updatedAt,
                deletedAt: doc.data().deletedAt,
            }));
 
            await addDoc(ordersCollection, {...order});
            console.log("Order Added Successfully");
            
            cartItemsData.forEach(cartItem => {
                const cartItemDoc = doc(database, "cart_items", cartItem.id);
                deleteDoc(cartItemDoc);
            });
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