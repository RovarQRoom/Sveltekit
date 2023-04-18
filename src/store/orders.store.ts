import { addDoc, collection } from "firebase/firestore";
import { auth, database } from "../components/lib/firebase/firebase";
import type { ItemDto } from "../components/Dtos";

const ordersCollection = collection(database, "orders");

export const ordersHandlers = {
    addOrder: async (item: ItemDto[]) => {
        try {
            await addDoc(ordersCollection, {userId:auth.currentUser?.uid,item});
            console.log("Order Added Successfully");
        } catch (err) {
            console.log("error", err);
        }
    }
};