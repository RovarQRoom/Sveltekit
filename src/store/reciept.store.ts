import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { database } from "../components/lib/firebase/firebase";
import type { OrderDTO, RecieptDTO } from "../components/Dtos";

const recieptCollection = collection(database, "reciepts");

export const recieptHandlers = {
    addReciept: async (reciept: RecieptDTO) => {
        console.log("Reciept ", reciept);
        try {
            await addDoc(recieptCollection, {...reciept, order: JSON.parse(JSON.stringify(reciept.order))});
            
            console.log("Reciept Added Successfully");
        } catch (err) {
            console.log("error", err);
        }
    },
    getReciept: async (id:string) => {
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